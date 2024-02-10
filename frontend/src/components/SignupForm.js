import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const SignupForm = ( props ) => {
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
});

const navigate=useNavigate();


// const {storetockenInLS}=useAuth();
//handling the input value
const handleInput=(e)=>{
    console.log(e);
    let name=e.target.name;
    let value=e.target.value;
    setUser({
        ...user, //keeping the rest of the things as same
        [name]:value, //this name can be anything
        //it can be username, password, email,phone number
        //passing the dynamic value;
    })
}
// handling the form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  if (user.password !== user.confirmPassword) {
    alert("Passwords don't match");
    return;
  }
  const url = 'http://localhost:5000/api/auth/signup';
  const data = user;
  try {
    const response = await axios.post(url, data);
    navigate("/");
  } catch (error) {
      console.log(error.response.data.error);
  }
  setUser({});
  props.onHide();
};

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
