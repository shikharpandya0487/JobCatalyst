import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignupForm = ( props ) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const notifyA = (msg) => toast.success(msg);
  const notifyB = (msg) => toast.error(msg);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the respective state based on the input name
    if (name === 'username') {
      setUsername(value);
    }else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password != confirmPassword)
    {
      alert("password doesnt match");
      return ;
    }
    // Add your signup logic here, such as sending the data to your server
    const url = 'http://localhost:8000/signup';
    const data = { username, email, password };
    axios.post(url, data)
      .then((res) => {
        notifyA(res.data.message);
      }).catch((error) => {
        notifyB(error.response.data.error)
      })

    console.log('Form submitted with data:', { email, password, confirmPassword });
    setUsername('');
    setEmail('');
    setConfirmPassword('');
    setPassword('');
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

        <Form.Group controlId="formEmail" className='w-full'>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter your UserName"
              name="username"
              value={username}
              onChange={handleChange}
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
              value={email}
              onChange={handleChange}
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
              value={password}
              onChange={handleChange}
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
              value={confirmPassword}
              onChange={handleChange}
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
