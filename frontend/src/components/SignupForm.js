import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const SignupForm = ( props ) => {
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
});

//context api
//now here you will be required to get the context
//first import useAuth (our custom Hook);
//get the context in an object
//AB DIRECTLY MEIN APNE FUNCTION KO USE KAR SAKHTA HOON

//BOOM BOOM CONTEXT API KI JAI HO
const navigate=useNavigate();
const {storetockenInLS}=useAuth();
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
const handleSubmit=async (e)=>{
    e.preventDefault(); //preventing the default behavior which is reloading the page
    // alert(user);

    //CONNNECTING FRONTEND WITH BACKEND
    console.log(user);
    try{
        const response=await fetch("http://localhost:5000/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        });
        //here one thing is, jb user submit pr click karta hai to data abhi bhi form pr rehta hai
        //handling that issue
        const res_data=await response.json();
        console.log("res from server",res_data);

        //if response.ok==true,then res_data will contain success data,
        //otherwise it will contain the false error message inside it


        if(response.ok){ //ok ek already existing field hai in response object(See in inspect)

            //we can also extract the response data from the input
            // const res_data=await response.json();
            //  commented this as we are fixing the error
            //res_data will contain an object which contain the tocken userid
            //store tocken in local storage
            storetockenInLS(res_data.tocken);
            // console.log("Res from server",res_data);
            //we can also store the tocken in local storage using
            // localStorage.setItem("tocken",res_data.tocken);
            //but since this code will be required on many pages, therefore convert it into a method

            setUser({
                username:"",
                email:"",
                password:""
            }) //sbko blank mark kardiya
            //we can even navigate them to other page after submitting

            toast.success("Registration Sucess");
            navigate("/community");
            //using useNavigate
            //for this first must declare a const using navigate 
            //see above for that
        }
        else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
    }
    catch(error){
        console.log("Register !!",error);
    }
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
              value={user.password}
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
