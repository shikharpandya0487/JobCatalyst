import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { ChatState } from '../../UserContext';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const {setUser}=ChatState()

  const navigate = useNavigate();
  const { email, password } = userInfo;

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
  });
  };

  const handleSubmit = async (e) => {
    const data=userInfo

    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login",data);
      console.log(response);
      if (response.data.success) {
        // Handle successful login
        // For example, set token in local storage and navigate to another page
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('LoggedIn',true)
        localStorage.setItem("user", JSON.stringify(response.data.user));

        console.log(response.data)

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
    setUserInfo({})
    props.onHide()
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
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
