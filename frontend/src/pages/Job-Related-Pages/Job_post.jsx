import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from '../../components/Navbar/Navbar';
import { useTheme } from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

const Job_post = () => {
  const { theme } = useTheme();
  const editor = useRef(null);
  const [post, setPost] = useState({
    experience: '',
    salary: '',
    content: '',
    numberOfEmployees: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const editorDataHandler = (data) => {
    console.log(data);
    setPost({ ...post, content: data });
  };

  const fieldChanged = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setPost({ ...post, [name]: value });
  };

  const handleCreate = () => {};

  const onClose = () => setIsOpen(false);

  return (
    <Box
      className='w-screen h-screen'
      bg={theme === 'dark' ? '#333' : '#fff'}
      color={theme === 'dark' ? '#fff' : '#333'}
    >
      <Navbar />
      <Box className='mx-auto w-8/12 h-full flex flex-col items-center justify-start gap-3 p-2'>
        <div className='flex text-4xl justify-center items-center p-4 w-full font-bold'>
          Details for the Job
        </div>
        <Box className='flex justify-evenly items-center p-1 gap-1 w-full font-semibold'>
          <FormControl>
            <FormLabel htmlFor='experience'>Experience</FormLabel>
            <Select
              id='experience'
              name='experience'
              value={post.experience}
              onChange={fieldChanged}
              bg='gray.100'
              rounded='3xl'
              borderColor='black'
            >
              <option value=''>Select Experience</option>
              <option value='0-1'>0-1 years</option>
              <option value='1-3'>1-3 years</option>
              <option value='3-5'>3-5 years</option>
              <option value='5+'>5+ years</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='salary'>Salary</FormLabel>
            <Select
              id='salary'
              name='salary'
              value={post.salary}
              onChange={fieldChanged}
              bg='gray.100'
              rounded='3xl'
              borderColor='black'
            >
              <option value=''>Select Salary Range</option>
              <option value='10-20k'>10-20k</option>
              <option value='20-30k'>20-30k</option>
              <option value='30-40k'>30-40k</option>
              <option value='50k+'>50k+</option>
            </Select>
          </FormControl>
        </Box>
        <Box className='flex justify-center items-center p-1'>
          <Text>Job Description</Text>
        </Box>
        <Box className='flex flex-col h-8/12 w-full p-2'>
          <JoditEditor ref={editor} value={post.content} onChange={editorDataHandler} />
        </Box>
        <Box className='flex flex-col gap-2 p-1 w-full'>
          <FormLabel htmlFor='numberOfEmployees'>Number of Employees</FormLabel>
          <Select
            id='numberOfEmployees'
            name='numberOfEmployees'
            value={post.numberOfEmployees}
            onChange={fieldChanged}
            bg='gray.100'
            rounded='3xl'
            borderColor='black'
          >
            <option value=''>Select Number of Employees</option>
            <option value='0-20'>0-20 Employees</option>
            <option value='20-40'>20-30 Employees</option>
            <option value='40-50'>30-40 Employees</option>
            <option value='50+'>50+ Employees</option>
          </Select>
        </Box>
        <Flex justify='space-between' w='full' p='2'>
          <Button
            className='order-last w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl'
            onClick={() => setIsOpen(true)}
          >
            Go Back
          </Button>
          <Button
            className='order-last w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl'
            onClick={handleCreate}
          >
            Create
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Go Back</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to go back?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Link to='/job-basics'>
                <Button colorScheme='red' onClick={handleCreate}>
                  Go Back
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Job_post;
