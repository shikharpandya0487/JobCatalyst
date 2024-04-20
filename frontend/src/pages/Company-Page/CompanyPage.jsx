import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useTheme } from "../../Context/ThemeContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

function CompanyPage() {
  const { theme } = useTheme();

  const handleCreate = () => {
    console.log("Create button clicked");
  };

  const validateEmail = (value) => {
    // Basic email validation regex
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value) ? "" : "Invalid email address";
  };

  const validatePhoneNumber = (value) => {
    // Basic phone number validation regex
    const regex = /^[0-9]{10}$/;
    return regex.test(value) ? "" : "Invalid phone number";
  };

  return (
    <Box
      as="form"
      className="flex flex-col rounded-md md:rounded-[78px]"
      backgroundColor={theme === "dark" ? "#222" : "#fff8ef"}
      color={theme === "dark" ? "#fff" : "#333"}
    >
      <Navbar />
      <Box className="mx-auto max-w-[1559px] md:max-w-full p-5">
        <Box className="md:flex md:justify-between md:items-center">
          <h2 className="text-3xl md:text-5xl md:px-20 py-5">
            Create an Employer Account
          </h2>
          <img
            src="./Employee image.png"
            alt="Employee Image"
            className="max-w-[300px] h-[170px] order-last md:order-none px-5"
          />
        </Box>
        <Box className="flex flex-col md:flex-row gap-5 text-lg md:text-lg text-black md:flex-wrap mt-5">
          <FormControl>
            <FormLabel htmlFor="companyName">Your Company Name:</FormLabel>
            <Input
              type="text"
              id="companyName"
              className="mt-2 bg-gray-200  rounded-xl"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="numEmployees">
              Your Company’s number of employees:
            </FormLabel>
            <Input
              id="numEmployees"
              className="mt-2 bg-gray-200 h-[40px] rounded-xl"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="PhoneNumber">Contact Number:</FormLabel>
            <Input
              id="PhoneNumber"
              className="mt-2 bg-gray-200 h-[40px] rounded-xl"
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Enter 10 digit phone number"
              required
            />
            <FormErrorMessage>
              Please enter a valid phone number
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="fullName">Your First And Last Name:</FormLabel>
            <Input
              id="fullName"
              className="mt-2 bg-gray-200 h-[40px] rounded-xl"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="howYouKnow">
              How you came to know about us?
            </FormLabel>
            <Textarea
              id="howYouKnow"
              className="mt-2 bg-gray-200 h-[80px] rounded-xl"
            />
          </FormControl>
          <FormControl isInvalid={validateEmail("test@example")}>
            <FormLabel htmlFor="companyEmail">Company Email:</FormLabel>
            <Input
              id="companyEmail"
              className="mt-2 bg-gray-200 h-[40px] rounded-xl"
              type="email"
              placeholder="Enter your email"
              required
            />
            
          </FormControl>
        </Box>
        <Link to="/job-basics">
          <Button
            className="px-6 py-2 mt-5 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl"
            onClick={handleCreate}
          >
            Create
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default CompanyPage;
