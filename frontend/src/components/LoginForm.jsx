import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
  }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', e);
    setEmail('')
    setPassword('')
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
          <Form.Group controlId="formEmail">
            <Form.Label>password</Form.Label>
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
  }


export default LoginForm
