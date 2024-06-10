import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    companyName: '',
  });
  const { isAdmin } = props;
  const toast = useToast();

  const navigate = useNavigate();
  const { email, password, companyName } = userInfo;

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Console from loginForm ", userInfo);
      const response = await axios.post('http://localhost:5000/api/auth/login', userInfo);
      console.log(response);
      if (response.data.success) {
        // Handle successful login
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('LoggedIn', true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast({
          title: 'Logged in successfully.',
          description: "You have been logged in.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });

        navigate('/community');
      } else {
        // Handle unsuccessful login
        toast({
          title: 'Login failed',
          description: response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'An error occurred',
        description: 'An error occurred while logging in. Please try again later.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
    setUserInfo({});
    props.onHide();
  };

  return (
    <Modal isOpen={props.show} onClose={props.onHide} size="lg" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="formEmail" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="formPassword" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </FormControl>
          {isAdmin && (
            <FormControl id="formCompanyName" isRequired mt={4}>
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your company name"
                name="companyName"
                value={companyName}
                onChange={handleChange}
              />
            </FormControl>
          )}
          <Button type="submit" mt={4} colorScheme="blue" onClick={handleSubmit}>
            Log In
          </Button>
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">Forgot Password</p>
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginForm;
