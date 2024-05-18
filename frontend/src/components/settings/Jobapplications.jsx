import { Box, Button, Flex, Spinner, Center, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from 'react';
import { ChatState } from "../../UserContext";
import axios from "axios";

const Jobapplications = () => {
    const { user } = ChatState();
    const employer = user.isAdmin === true;
    const [jobapplications, setJobapplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        const fetchJobApp = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get("http://localhost:5000/api/applyjob/getAppliedJobs", config);
                setJobapplications(response.data.jobApplications);
                console.log("Response from job Applications", response.data.jobApplications);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobApp();
    }, [user.token]);

    const getJobTitle=async (req,res)=>{
        try {
            
        } catch (error) {
            
        }
    }

    const handleReject = (jobId) => {
        setSelectedJobId(jobId);
        onOpen();
    };

    const confirmReject = async () => {
        // Handle the reject action here, for example, making an API call to reject the job application
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(`http://localhost:5000/api/applyjob/rejectJob/${selectedJobId}`, {}, config);
            setJobapplications((prev) => prev.filter(job => job._id !== selectedJobId));
        } catch (error) {
            console.error("Failed to reject the job application:", error);
        } finally {
            onClose();
        }
    };

    return (
        <Box className="max-h-[600px] overflow-x-auto">            
            <Box className="p-4 flex flex-col gap-4 justify-center ">
                {
                loading ? (
                    <Center w="full" h="full">
                        <Spinner size="xl" />
                    </Center>
                ) : (
                    
                    Array.isArray(jobapplications) ? jobapplications.map((item, index) => (
                        <Box key={index} w="full" p={1} className="border-1 border-slate-500 p-2 rounded-md flex flex-col">
                            <Box>
                                Applied at {new Date(item.createdAt).toLocaleString()}
                            </Box>
                            <Flex w="7/12" justifyContent="flex-evenly" gap={1} p={2}>
                                <Box></Box>
                                <Box className="w-7/12">{item.description}</Box>
                                <Box className="flex justify-evenly w-5/12">
                                    {employer ? (
                                        <Button p={2} colorScheme="green" className="rounded">
                                            Accept
                                        </Button>
                                    ) : null}
                                    <Button p={2} className="rounded bg-slate-300 text-black" onClick={() => handleReject(item._id)}>
                                        Reject
                                    </Button>
                                    <Box
                                        className="bg-green-800 text-white rounded p-1"
                                        style={{ backgroundColor: item.status ? 'green' : 'red' }}
                                    >
                                        Status
                                    </Box>
                                </Box>
                            </Flex>
                        </Box>
                    )) : (
                    jobapplications.length===0?<div className="text-red-600 text-2xl font">
                Not Applied to any job openings 
            </div>:null
                    )
                )}

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
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={confirmReject} ml={3}>
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
