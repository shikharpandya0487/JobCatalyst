import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/operations/authAPI"
import { setSignupData } from "../../slices/authSlice"
import { Input, useToast } from '@chakra-ui/react'
import { useDispatch } from "react-redux"

const SignupForm = ( props ) => {
  const dispatch = useDispatch()
  const [pic,setPic]=useState("")
  // const [picLoading,setPicloading]=useState(false)
  const [show,setShow]=useState(false)
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
});
const toast=useToast()
const navigate=useNavigate();
const { username, email, password, confirmpassword} = user


//handling the input value
const handleInput = (e) => {
  setUser((prevData) => ({
    ...prevData,
    [e.target.name]: e.target.value,
  }))
}
// handling the form submission
const handleSubmit = (e) => {
  e.preventDefault()

  if(!username||!email||!password||!confirmpassword)
  { 
      console.log(username,email,password,confirmpassword);
      toast({
          title: 'Fill in the details',
          description: "Lack of info",
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position:"bottom"
        })
       console.log("Error");
        // setPicloading(false)
        return;
  }
 
  if (password !== confirmpassword) {
    toast.error("Passwords Do Not Match")
    return;
  }

  console.log(username,email,password,pic)
  const signupData = {
    ...user,
  }

  // Setting signup data to state
  // To be used after otp verification
  dispatch(setSignupData(signupData))
  // Send OTP to user for verification
  dispatch(sendOtp(user.email, navigate))


  // Reset
  setUser({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  })
//   toast({
//     title: "Please Check your Email for OTP Verification",
//     status: "success",
//     duration: 5000,
//     isClosable: true,
//     position: "bottom",
// })


}

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='text-center'>
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-2 items-start'>
        <Form onSubmit={handleSubmit} className='w-full'>

        <Form.Group controlId="formUser" className='w-full'>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter your UserName"
              name="username"
              value={user.username}
              onChange={handleInput}
              className='text-center'
              required
            />
            </Form.Group>
          <Form.Group controlId="formEmail" className='w-full'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className='text-center'
              required
              />
          </Form.Group>
          <Form.Group controlId="formPassword" className='w-full flex flex-col items-end'>
            <Form.Label className='ml-3'>Password</Form.Label>
            <Form.Control
              type={show?"text":"password"}
              placeholder="Enter your password"
              name="password"
              value={user.password}
              onChange={handleInput}
             className='text-center w-full'
              required
            >
          
          </Form.Control>
            <Button
            variant="dark"
            className="ml-2 w-1/4"
            onClick={(e)=>setShow(!show)}
            >
            {show ? 'Hide' : 'Show'}
          </Button>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="confirmpassword"
              value={user.confirmpassword}
              onChange={handleInput}
              className='text-center'
              required
            />
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignupForm;
