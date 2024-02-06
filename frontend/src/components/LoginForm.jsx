import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storetockenInLS } = useAuth(); //using contextapi to store the jwt token in local storage

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value, //jo bhi value hogi uske according save ho jayegi
    });
  };

  const handleSubmit = async (e) => {
    //form default behaviour->refresh the page
    e.preventDefault(); //preventing the default behavior which is reloading the page
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("LOGIN SUCCESS");
        storetockenInLS(res_data.tocken); // Fix typo in variable name "tocken" to "token"
        console.log("Res from server", res_data);
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
      console.log(response);
    } catch (error) {
      console.log("Login", error);
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
              value={user.email}
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
              value={user.password}
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
