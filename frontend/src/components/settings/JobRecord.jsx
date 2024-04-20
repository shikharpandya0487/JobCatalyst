import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../Context/ThemeContext";
import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
  CircularProgress,
} from "@chakra-ui/react";

const JobRecord = () => {
  const { theme } = useTheme();
  const [jobRecords, setJobRecords] = useState([]);
  const [savedRecords, setSavedRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobRecords();
  }, []);

  const fetchJobRecords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jobcatalyst.onrender.com/api/profile/jobrecords/getAllJobRecord"
      );
      console.log("Fetched Response",response.data)
      setSavedRecords(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const addJobRecord = () => {
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
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRecords = [...jobRecords];
    updatedRecords[index][name] = value;
    setJobRecords(updatedRecords);
  };

  const saveRecord = async (index) => {
    const recordToSave = jobRecords[index];
    console.log(recordToSave)
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://jobcatalyst.onrender.com/api/profile/jobrecords/createJobRecord",
        recordToSave
      );
      console.log("save Response",response)
       setSavedRecords([...savedRecords, response.data.data]);
      setJobRecords(jobRecords.filter((_, i) => i !== index));
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const deleteRecord = async (postId) => {
    try {
      setIsLoading(true);
      const response=await axios.post("https://jobcatalyst.onrender.com/api/profile/jobrecords/deleteJobRecord", { postId });
      console.log("Response Delete",response)
      setSavedRecords(savedRecords.filter((record) => record._id !== postId));
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box
      w="900px"
      m="auto"
      p="20px"
      bg={theme === "dark" ? "#333" : "#fff"}
      color={theme === "dark" ? "#fff" : "#333"}
    >
      <Text mb="20px" fontSize="xl" fontWeight="bold">
        Job Record
      </Text>
      <Button
        mb="20px"
        fontSize="lg"
        fontWeight="medium"
        colorScheme="blue"
        onClick={addJobRecord}
      >
        Add Record
      </Button>
      {isLoading && <CircularProgress isIndeterminate color="blue.500" />}
      {error && <Text>Error: {error}</Text>}
      {jobRecords.map((record, index) => (
        <Box
          key={index}
          bg={theme === "dark" ? "#333" : "#fff"}
          color={theme === "dark" ? "#fff" : "#333"}
          border={theme === "dark" ? "1px solid #fff" : ""}
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
          <Button
            onClick={() => saveRecord(index)}
            colorScheme="green"
            mt="2"
          >
            Save Record
          </Button>
        </Box>
      ))}
      {savedRecords.map((record, index) => (
        <Box
          key={index}
          bg={theme === "dark" ? "#333" : "#fff"}
          color={theme === "dark" ? "#fff" : "#333"}
          border={theme === "dark" ? "1px solid #fff" : ""}
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
          <Button
            onClick={() => deleteRecord(record._id)}
            colorScheme="red"
            mt="2"
          >
            Delete Record
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default JobRecord;
