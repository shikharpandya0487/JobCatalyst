import React, { useEffect, useState } from 'react';
import { Box, Flex, Input, Button, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import ListUser from '../../components/ListUsers/ListUser';
import { ChatState } from '../../UserContext';

const SearchPeople = () => {
  const { user } = ChatState();
  const { isOpen: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure();
  const { isOpen: isMailModalOpen, onOpen: onMailModalOpen, onClose: onMailModalClose } = useDisclosure();

  const [formData, setFormData] = useState({
    username: "",
    profession: "",
    skill: "",
    location: "",
  });

  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [mailData, setMailData] = useState({
    content: "",
    jobprofile: "",
    subject: "",
  });
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMailChange = (e) => {
    const { name, value } = e.target;
    setMailData((prevMailData) => ({
      ...prevMailData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`https://jobcatalyst.onrender.com/api/people/search`, {
        params: formData,
        ...config,
      });
      setSearchResult(response.data.users);
    } catch (error) {
      console.log(error);
      setSelectedUser({});
    }
  };

  const handleSearch = (user) => {
    setSelectedUser(user);
    onUserModalOpen();
  };

  const handleMail = async() => {
    onMailModalOpen();
   
  };

  const handleClose=()=>{
    setMailData({
      content: "",
      jobprofile: "",
      subject: "",
    })
    onMailModalClose();
  }

  const sendMail = async () => {
    console.log('Mail Data:', mailData);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const sender = {
        receiver: selectedUser._id,
        email:selectedUser.email,
        ...mailData,
      };
      console.log("sender ",sender)
      const response = await axios.post(`https://jobcatalyst.onrender.com/api/people/mail`, sender, config);
      console.log('Response', response);

      toast({
        title: 'Email sent.',
        description: "The email has been sent successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error sending email.',
        description: "There was an error sending the email.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    
    }
    setMailData({
      content: "",
      jobprofile: "",
      subject: "",
    })
    onMailModalClose();
   
  };

  return (
    <>
      <Navbar />
      <Flex direction="column" justify="start" align="center" gap="2" h="100vh" w="w-screen">
        <Box border="1px" borderColor="black" p="2" w="full" justify="center">
          <Flex w="full" gap="1" align="center">
            <Heading as="label" htmlFor="search" w="1/2">
              Search people
            </Heading>
            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="name">
                Name
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Flex>

            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="profession">
                Profession
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
            </Flex>

            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="skill">
                Skill
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
              />
            </Flex>

            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="location">
                Location
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Flex>

            <Button
              p="2"
              bg="gray.800"
              color="lightBlue"
              fontWeight="semibold"
              borderRadius="lg"
              _hover={{ color: 'white', backgroundColor: "red" }}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Flex>
        </Box>
        {searchResult.length > 0 && searchResult.map((user) => (
          <ListUser key={user._id} user={user} handleFunction={() => handleSearch(user)} />
        ))}

        {/* Modal for displaying user details */}
        <Modal isOpen={isUserModalOpen} onClose={onUserModalClose} w="w-full">
          <ModalOverlay />
          <ModalContent maxW="600px">
            <ModalHeader>User Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='w-full'>
              {/* Display user details here */}
              <Text className='font-semibold flex justify-between'><Box >Name:</Box><Box className='w-full flex justify-center items-center'>{selectedUser.username}</Box> </Text>
              <Text className='font-semibold flex justify-between'><Box >Email: </Box><Box className='w-full flex justify-center items-center'>{selectedUser.email}</Box></Text>
              <Text className='font-semibold flex flex-col gap-2'>Skills: {Array.isArray(selectedUser.skills) ? (
                  selectedUser.skills.map((skill, index) => (
                    <Box key={index} className='flex flex-col justify-start items-start gap-1 font-normal w-full'>
                      <Box className='w-full flex justify-between items-center p-1'>
                        <Box className='font-semibold'>
                          Skill Name: 
                        </Box>
                        <Box className='w-full flex justify-center items-center'>
                           {skill.name}
                        </Box>
                      </Box>
                      <Box className='w-full flex justify-between items-center p-1'>
                        <Box className='font-semibold'>
                        Skill Proficiency: 
                        </Box>
                        <Box className='w-full flex justify-center items-center'>
                          {skill.proficiency}
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text>No skills available</Text>
                )}  
              </Text>
              <Box className='w-full flex justify-between items-center p-1'>
                <Box className='font-semibold'>
                  Location: 
                </Box>
              <Box className='w-full flex justify-center items-center'>
                 {(selectedUser.location)?selectedUser.location:<>N/A</>}
              </Box>
               
              </Box>

              <Box className='flex w-full justify-between items-center'>
                <Box className='font-semibold'>
                  Github
                </Box>
                <Box className='w-full flex justify-center items-center'>
                  {selectedUser.github?.url}
                </Box>
              </Box>

              
              <Box className='flex w-full justify-between items-center'>
                <Box className='font-semibold'>
                  LinkedIn
                </Box> 
                <Box>
                  {selectedUser.LinkedIn?.url}
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter className='flex justify-between w-full'>
              <Button colorScheme="blue" mr={3} onClick={handleMail}>
                Mail
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onUserModalClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal for composing email */}
        <Modal isOpen={isMailModalOpen} onClose={onMailModalClose}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <ModalHeader>Compose Mail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="topic">Job Profile </Text>
                <Input
                  type="text"
                  name="jobprofile"
                  value={mailData.jobprofile}
                  onChange={handleMailChange}
                />
                <Text as="label" htmlFor="subject">Subject</Text>
                <Input
                  type="text"
                  name="subject"
                  value={mailData.subject}
                  onChange={handleMailChange}
                />
                <Text as="label" htmlFor="content">Content</Text>
                <Input
                  as="textarea"
                  name="content"
                  value={mailData.content}
                  onChange={handleMailChange}
                  rows={6}
                />
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={sendMail}>
                Send
              </Button>
              <Button colorScheme="blue" mr={3} onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default SearchPeople;
