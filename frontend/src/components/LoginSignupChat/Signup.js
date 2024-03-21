import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [show,setShow]=useState(false)
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const [pic,setPic]=useState("")
    const [email, setEmail] = useState();
    const [picLoading,setPicloading]=useState(false)
    const handleClick=()=>setShow(!show)
    const navigate=useNavigate()
    const toast = useToast()
    const postDetails=(pics)=>{
        setPicloading(true)
        //check whether file is undefined 
        if(pics===undefined)
        {
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
              return;
        }

        if(pics.type==="image/jpeg"||pics.type==="image/png")
        {
            const data=new FormData()
            data.append("file",pics)
            data.append("upload_preset","mern-chat-app")
            data.append("cloud_name","dc2ztcjs0")

            fetch("https://api.cloudinary.com/v1_1/dc2ztcjs0/image/upload",{method:"post",body:data})
            .then((res)=>res.json())
            .then((data)=>{
                setPic(data.url.toString())
                console.log(data.url)
                setPicloading(false)
            })
            .catch((err)=>{
                console.log("Error while uploading the file ",err)
                setPicloading(false)
            })
        }
        else{
            toast({
                title: 'Upload failed',
                description: "ur image is not uploaded.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
              setPicloading(false)
              return;
        }
    }
    

    const submitHandler=async (e)=>{
        e.preventDefault()

        setPicloading(true);
        
        //check whether all input fields are filled or not
        if(!name||!email||!password||!confirmpassword)
        {
            toast({
                title: 'Fill in the details',
                description: "Lack of info",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
             console.log("Error");
              setPicloading(false)
              return;
        }

        if(password!==confirmpassword)
        {
            toast({
                title: 'Fill in the correct password and confirm pass',
                description: "Lack of info",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
        
              setPicloading(false)
              return;
        }

        console.log(email,name,password,pic);

        // post req
        try {
            //defining the header
            const config={
                headers:{
                    "Content-type":"application/json"
                }
            }

            const {data}=await axios.post("http://localhost:5000/api/user",{
                name,
                email,
                password,
                pic
            },
            config)
            console.log(data);

            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            localStorage.setItem("userInfo", JSON.stringify(data));
           setPicloading(false);
            navigate('/chats')

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setPicloading(false);
        }

    }

   
  return (
    <VStack spacing="10px">
      <FormControl id='Name' isRequired>
        <FormLabel>
         Name :
        </FormLabel>
        <Input
        type='text'
        placeholder='Enter the name'
        onChange={(e)=>setName(e.target.value)}
        value={name}
        />
      </FormControl>

      <FormControl id='Email' isRequired>
        <FormLabel>
         Email :
        </FormLabel>
        <Input
        type='email'
        placeholder='Enter the email'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmPassword" isRequired>
        <FormLabel>confirm Password </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Confirmed Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>
            File Upload 
        </FormLabel>
        <Input
        type="file"
        p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>

      {/* //submit button 
       */}
       <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>

       
      
    
    
    
    </VStack>
  )
}

export default Signup
