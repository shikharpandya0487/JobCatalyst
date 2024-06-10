import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
  CircularProgress,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const JobRecord = () => {
  const [jobRecords, setJobRecords] = useState([]);
  const [savedRecords, setSavedRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const [flag, setFlag] = useState(true);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchJobRecords = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/profile/jobrecords/getAllJobRecord"
        );
        console.log("Fetched Response", response.data);
        setSavedRecords(response.data.data);
        toast({
          title: "Job records loaded.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        toast({
          title: "Error loading job records.",
          description: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    };
    fetchJobRecords();
  }, [toast, setSavedRecords]);

  const addJobRecord = () => {
    if (flag) {
      setJobRecords([
        ...jobRecords,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ]);
      setFlag(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRecords = [...jobRecords];
    updatedRecords[index][name] = value;
    setJobRecords(updatedRecords);
  };

  const saveRecord = async (index) => {
    const recordToSave = jobRecords[index];
    console.log(recordToSave);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/profile/jobrecords/createJobRecord",
        recordToSave
      );
      console.log("save Response", response);
      setSavedRecords([...savedRecords, response.data.data]);
      setJobRecords(jobRecords.filter((_, i) => i !== index));
      toast({
        title: "Job record saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      toast({
        title: "Error saving job record.",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
    setFlag(true);
  };

  const deleteRecord = async (postId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/profile/jobrecords/deleteJobRecord",
        { postId }
      );
      console.log("Response Delete", response);
      setSavedRecords(savedRecords.filter((record) => record._id !== postId));
      toast({
        title: "Job record deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      toast({
        title: "Error deleting job record.",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
    setFlag(true);
  };

  return (
    <Box w="900px" m="auto" p="20px" bg="#fff" color="#333">
      <Text mb="20px" fontSize="xl" fontWeight="bold">
        Job Record
      </Text>
      <Box>
        {flag ? (
          <Button
            mb="20px"
            fontSize="lg"
            fontWeight="medium"
            colorScheme="blue"
            onClick={addJobRecord}
          >
            Add Record
          </Button>
        ) : (
          <Box>Wait till you save/close the add record form</Box>
        )}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Add Record Confirmation
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to add a new record? Your unsaved changes
                will be lost.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={addJobRecord} ml={3}>
                  Add Record
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      {isLoading && <CircularProgress isIndeterminate color="blue.500" />}
      {error && <Text>Error: {error}</Text>}
      {jobRecords.map((record, index) => (
        <Box
          key={index}
          bg="#fff"
          color="#333"
          border="1px solid"
          borderColor="#333"
          rounded="md"
          p="4"
          mb="4"
        >
          <Text mb="4" fontStyle="italic">
            Work Experience {index + 1}
          </Text>
          <Box w="full" p="1">
            <Text as="strong" fontWeight="bold">
              Company:
            </Text>
            <Input
              type="text"
              name="company"
              value={record.company}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white text-black rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </Box>
          <Box w="full" p="1">
            <Text as="strong" fontWeight="bold">
              Position:
            </Text>
            <Input
              type="text"
              name="position"
              value={record.position}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white text-black rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </Box>
          <Box w="full" p="1">
            <Text as="strong" fontWeight="bold">
              Start Date:
            </Text>
            <Input
              type="text"
              name="startDate"
              value={record.startDate}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white text-black rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </Box>
          <Box w="full" p="1">
            <Text as="strong" fontWeight="bold">
              End Date:
            </Text>
            <Input
              type="text"
              name="endDate"
              value={record.endDate}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white text-black rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </Box>
          <Box w="full" p="1">
            <Text as="strong" fontWeight="bold">
              Description:
            </Text>
            <Textarea
              name="description"
              value={record.description}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white  text-black rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </Box>
          <Button onClick={() => saveRecord(index)} colorScheme="green" mt="2">
            Save Record
          </Button>
        </Box>
      ))}
      {savedRecords.map((record, index) => (
        <Box
          key={index}
          bg="#fff"
          color="#333"
          border="1px solid"
          borderColor="#333"
          rounded="md"
          p="4"
          mb="4"
        >
          <Text mb="2" fontStyle="italic">
            Work Experience {index + 1}
          </Text>
          <Text>
            <strong>Company:</strong> {record.company}
          </Text>
          <Text>
            <strong>Position:</strong> {record.position}
          </Text>
          <Text>
            <strong>Start Date:</strong> {record.startDate}
          </Text>
          <Text>
            <strong>End Date:</strong> {record.endDate}
          </Text>
          <Text>
            <strong>Description:</strong> {record.description}
          </Text>
          <Button onClick={() => deleteRecord(record._id)} colorScheme="red" mt="2">
            Delete Record
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default JobRecord;
