import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = user;

  const handleChange = (e) => {
    setUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      if (response.data.success) {
        // Handle successful login
        // For example, set token in local storage and navigate to another page
        localStorage.setItem("token", response.data.token);
        navigate("/community");
      } else {
        // Handle unsuccessful login
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error
      toast.error("An error occurred while logging in. Please try again later.");
    }
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
          Log In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
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
              required
            />
          </Form.Group>
          <Button type="submit">Log In</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
