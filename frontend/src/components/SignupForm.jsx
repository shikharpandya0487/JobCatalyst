import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"

const SignupForm = ( props ) => {
  const dispatch = useDispatch()
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
});

const navigate=useNavigate();
const { username, email, password, confirmPassword } = user

// const {storetockenInLS}=useAuth();
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

  if (password !== confirmPassword) {
    toast.error("Passwords Do Not Match")
    return
  }
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
    confirmPassword: "",
  })
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
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={user.password}
              onChange={handleInput}
             className='text-center'
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={user.confirmPassword}
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
