import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { ChatState } from '../../UserContext';
import axios from 'axios';

const ApplyJob = ({ setIsOpen, isOpen, jobpostId }) => {
  const { user } = ChatState();
  const toast = useToast();
  const employer = (user?.isAdmin === true) ? true : false;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    description: '',
    cv: null,
    jobpostId: jobpostId
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (employer === true) {
        toast({
          title: "Error Occured!",
          description: "Only Non Employers could Apply for a job",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-center",
        });
        return;
      }

      const response = await axios.post("https://jobcatalyst.onrender.com/api/applyjob/applyForJob", formDataToSend, config);
      console.log("The job application is sent successfully", response.data);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      console.log("The form data was ", formData);
      setIsOpen(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Apply for Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="contactNo">Contact Number</FormLabel>
              <Input type="tel" id="contactNumber" name="contactNumber" placeholder="Enter your contact number" value={formData.contactNumber} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input type="text" id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="description">Short Description</FormLabel>
              <Textarea id="description" name="description" placeholder="Enter a short description" value={formData.description} onChange={handleChange} required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="cv">CV</FormLabel>
              <Input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx,.jpeg,.png" onChange={handleChange} required />
            </FormControl>
            <Button type="submit" colorScheme="blue">Apply</Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApplyJob;
