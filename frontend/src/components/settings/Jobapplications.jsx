import {
    Box, Button, Flex, Spinner, Center, AlertDialog, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from 'react';
import { ChatState } from "../../UserContext";
import axios from "axios";

const Jobapplications = () => {
    const { user } = ChatState();
    const employer = user.isAdmin === true;
    const [jobapplications, setJobapplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectLoading, setRejectLoading] = useState(false); // State for reject loading
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [selectedJobId, setSelectedJobId] = useState(null) 
    
    // console.log(user)

    useEffect(() => {
        const fetchJobApp = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get("https://jobcatalyst.onrender.com/api/applyjob/getAppliedJobs", config);
                setJobapplications(response.data.jobApplications);
                console.log("Response from job Applications", response.data.jobApplications);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobApp();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.token,user.jobApplications]);

    const handleReject = (jobId) => {
        setSelectedJobId(jobId);
        onOpen();
    };
    const handleAccept=(jobId)=>{
        setSelectedJobId(jobId)
        acceptJobs()
    }
    const acceptJobs=async (res,req)=>{
     try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              };  
            
            const data={
                applicationId:selectedJobId
            }
            const response=await axios.post("https://jobcatalyst.onrender.com/api/applyjob/acceptJob",data,config)

            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const confirmReject = async () => {
        setRejectLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.delete(`https://jobcatalyst.onrender.com/api/applyjob/cancelJobApplication/${selectedJobId}`, config);
            setJobapplications((prev) => prev.filter(job => job._id !== selectedJobId));
            console.log("Response after rejecting the job", response);
        } catch (error) {
            console.error("Failed to reject the job application:", error);
        } finally {
            setRejectLoading(false);
            onClose();
        }
    };

    const handlePdf=(pdf)=>{
        window.open(`https://jobcatalyst.onrender.com/uploads/${pdf}`)
    }



    return (
        <Box className="max-h-[600px] overflow-x-auto">
            <Box className="w-full p-4 flex flex-col gap-4 justify-center">
                {
                    loading ? (
                        <Center w="full" h="full">
                            <Spinner size="xl" />
                        </Center>
                    ) : (
                        Array.isArray(jobapplications) ? jobapplications.map((item, index) => (
                            <Box key={index} w="full" p={1} className="border-1 border-slate-500 p-2 rounded-md flex flex-col">
                                <Flex w="7/12" className="flex justify-evenly gap-1" p={2}>
                                    <Box className="w-7/12 flex flex-col justify-center items-start gap-3">
                                        <div>
                                            Applied at {new Date(item.createdAt).toLocaleString()}
                                        </div>
                                        <div className="font-semibold text-sm">
                                            Title of JobPost: {item.title}
                                        </div>
                                        <div className="font-semibold text-sm">
                                           {(employer===false)?<p>JobPosted by: {(employer===false)?item.postedby:item.name}</p>:null } 
                                           
                                        </div>
                                        <div className="flex justify-center gap-3 font-semibold">
                                            {(employer)?<p>Applicant </p>:null}{(employer)?item.name:null}
                                        </div>
                                    
                                        <div>
                                            <b>Description</b>
                                            <div className="text-md font-semibold">
                                                {item.description}
                                            </div>
                                        </div>
                                    </Box>
                                    <Box className="flex justify-evenly w-5/12">
                                        {(employer===true && item.status===false) ? (
                                            <Button p={2} colorScheme="green" className="rounded" onClick={()=>handleAccept(item._id)}>
                                                Accept
                                            </Button>
                                        ) :
                                        <Button p={2} className="rounded bg-slate-300 text-black" onClick={() => handleReject(item._id)}>
                                            Reject
                                        </Button>
                                            }
                                        <Button
                                            className="bg-green-800 text-white rounded p-1"
                                            style={{ backgroundColor: item.status ? 'green' : 'red' }}
                                        >
                                            Status
                                        </Button>
                                    </Box>
                                </Flex>
                                        <Button
                                         className="bg-green-600 border-1 border-white p-1"
                                         onClick={()=>handlePdf(item.file)}
                                        >
                                            View User document
                                        </Button>
                            </Box>
                        )) : (
                            jobapplications.length === 0 ? <div className="text-red-600 text-2xl font">
                                Not Applied to any job openings
                            </div> : null
                        )
                    )
                }

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Reject Application
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure you want to reject this application? This action cannot be undone.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose} disabled={rejectLoading}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={confirmReject} ml={3} isLoading={rejectLoading}>
                                    Reject
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </Box>
    );
};

export default Jobapplications;
