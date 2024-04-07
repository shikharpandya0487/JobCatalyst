import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../services/operations/authAPI';
import { setSignupData } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName:'',
    location:''
  });
  const {isAdmin,setIsAdmin}=props

  const handleInput = (e) => {
    setUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const {companyName,location}=user

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword,companyName } = user;

    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: 'Fill in the details',
        description: 'Lack of info',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    const signupData = {
      ...user,
    };
    console.log(signupData)
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));

    // Send OTP to user for verification
    dispatch(sendOtp(user.email, navigate));

    // Reset
    setUser({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName:'',
      location:""
    });
  }

  return (
    <Modal isOpen={props.show} onClose={props.onHide} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id="formUser" isRequired>
              <FormLabel>UserName</FormLabel>
              <Input
                type="text"
                placeholder="Enter your UserName"
                name="username"
                value={user.username}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl id="formEmail" isRequired mt={4}>
              <FormLabel>{isAdmin?"Company Email":"Email"}</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl id="formPassword" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={handleInput}
              />
              <Button
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                mt={2}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </FormControl>
            <FormControl id="formconfirmPassword" isRequired mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInput}
              />
            </FormControl>
            {
            isAdmin?<FormControl id="formCompanyName" isRequired mt={4}>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your company name"
              name="companyName"
              value={companyName}
              onChange={handleInput}
            />
          </FormControl>:null
          }
          {
            isAdmin?<FormControl id="formCompanyName" isRequired mt={4}>
            <FormLabel>Company Location</FormLabel>
            <Input
              type="text"
              placeholder="Enter your company Location"
              name="location" 
              value={location}
              onChange={handleInput}
            />
          </FormControl>
          :null
          }
            <Button type="submit" mt={4} colorScheme="blue">
              Sign Up
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupForm;
