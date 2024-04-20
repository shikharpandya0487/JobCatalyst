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

const JobBasics = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = () => {
    console.log("Create button clicked");
  };

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
            <Select
              id="jobTitle"
              mt="3"
              bg="gray.100"
              h="40px"
              rounded="3xl"
              border="2px"
              borderColor="black"
              maxW="full"
            >
              <option value="option1"></option>
              <option value="option2"></option>
              <option value="option3"></option>
            </Select>
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
            >
              <option value="option1"></option>
              <option value="option2"></option>
              <option value="option3"></option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="city" mt="3" className="text-lg font-medium text-black-800">City</FormLabel>
            <Input
              type="text"
              id="city"
              mt="2"
              bg="zinc.100"
              h="40px"
              rounded="3xl"
              border="2px"
              borderColor="black"
              maxW="full"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address" mt="3" className="text-lg font-medium text-black-800">Address</FormLabel>
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
              onClick={handleCreate}
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
              <Button colorScheme="red" onClick={handleCreate}>
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
