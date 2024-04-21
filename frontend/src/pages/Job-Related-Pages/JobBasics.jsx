// Import necessary dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useTheme } from '../../Context/ThemeContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChatState } from '../../UserContext';

const JobBasics = () => {
  // Retrieve necessary data from context
  const { theme } = useTheme();
  const { user, jobPost, setJobPost } = ChatState(); // Assuming ChatState returns user, jobPost, and setJobPost

  // State to manage modal open/close
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle create action
  const handle = (e,name) => {
    
    console.log(jobPost)
    setJobPost({...jobPost,[name]:e.target.value})
  };

  // Function to handle modal close
  const onClose = () => setIsOpen(false);

  return (
    <Box
      as="form"
      className="flex flex-col rounded-md md:rounded-[78px]"
      bg={theme === "dark" ? "#333" : "#fff"}
      color={theme === "dark" ? "#fff" : "#333"}
    >
      <Navbar />
      <Box className="flex flex-col self-center mt-10 md:mt-5 w-full max-w-[1559px] md:max-w-full">
        <Box className="md:flex-1 flex flex-col px-5 max-w-full justify-center items-center">
          <Text
            className="justify-center items-center pt-2 pb-10 text-3xl md:text-5xl"
            color={theme === "dark" ? "#fff" : "#333"}
          >
            Job Basics
          </Text>
        </Box>
        <Box className="flex flex-col flex-1 px-5 max-w-full">
          <FormControl>
            <FormLabel htmlFor="jobTitle" className="font-medium text-2xl">
              Job Title:
            </FormLabel>
            <Input
              type="text"
              id="jobTitle"
              mt="2"
              bg="zinc.100"
              h="40px"
              rounded="3xl"
              border="2px"
              borderColor="black"
              maxW="full"
              value={jobPost.title}
              onChange={(e)=>handle(e,"title")} // Handle change and update jobPost.title
            />
            
          </FormControl>
        </Box>
        <hr className="border-t-2 border-gray-700 w-full ml-2 mr-4 mt-4" />
        <Box className="flex flex-col flex-1 px-5 max-w-full">
          <Text
            className="justify-center items-start pt-2 pb-6 text-xl md:text-2xl"
            color={theme === "dark" ? "#fff" : "#333"}
          >
            Job Location
          </Text>
          <FormControl>
            <FormLabel htmlFor="jobLocationType" className="text-lg font-medium text-black-800">Job location type (remote / working-on-premise):</FormLabel>
            <Select
              id="jobLocationType"
              mt="3"
              bg="gray.100"
              h="40px"
              rounded="3xl"
              border="2px"
              borderColor="black"
              maxW="full"
              value={jobPost.jobtype}
              onChange={(e)=>handle(e,"jobtype")}
            >
              <option >Remote</option>
              <option >Hybrid</option>
              <option >On-Premise</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="location" mt="3" className="text-lg font-medium text-black-800">location</FormLabel>
            <Input
              type="text"
              id="location"
              mt="2"
              bg="zinc.100"
              h="40px"
              rounded="3xl"
              border="2px"
              borderColor="black"
              maxW="full"
              value={jobPost.location} // Set value to jobPost.city
              onChange={(e)=>handle(e,"location")} // Handle change and update jobPost.city
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="position" mt="3" className="text-lg font-medium text-black-800">Job Position</FormLabel>
            <Input
              type="text"
              id="address"
              mt="2"
              bg="zinc.100"
              h="40px"
              rounded="3xl"
              border="2px"
              borderColor="black"
              maxW="full"
              value={jobPost.position}
              onChange={(e)=>setJobPost({...jobPost,position:e.target.value})}
            />
          </FormControl>
        </Box>
        <Box className="flex justify-evenly w-full">
          <Button
            className="justify-center items-start px-6 py-2 mt-4 ml-10 md:ml-10 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl"
            onClick={() => setIsOpen(true)}
          >
            Go Back
          </Button>
          <Link to="/job-post">
            <Button
              className="order-last px-6 py-2 mt-4 ml-10 mr-10 md:ml-10 mr-10 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl"
              onClick={handle}
            >
              Continue
            </Button>
          </Link>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Go Back</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to go back?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Link to="/jobs">
              <Button colorScheme="red" onClick={handle}>
                Go Back
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default JobBasics;
