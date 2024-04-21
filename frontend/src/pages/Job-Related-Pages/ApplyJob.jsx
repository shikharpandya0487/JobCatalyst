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
  Textarea
} from "@chakra-ui/react";

const ApplyJob = ({setIsOpen,isOpen}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    address: '',
    description: ''
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the data to an API
    console.log(formData);
    setIsOpen(false);
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
                <Input type="tel" id="contactNo" name="contactNo" placeholder="Enter your contact number" value={formData.contactNo} onChange={handleChange} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input type="text" id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="description">Short Description</FormLabel>
                <Textarea id="description" name="description" placeholder="Enter a short description" value={formData.description} onChange={handleChange} required />
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
