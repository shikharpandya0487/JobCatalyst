import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/react'
import MyChat from '.././MyChat.js'
import ChatBox from '../ChatDisplay/ChatBox.js'
import { ChatState } from '../../UserContext.js'
import SideBar from '../Header-SideBar/SideBar'
import Navbar from '../Navbar/Navbar.jsx'
import { useToast } from '@chakra-ui/react';

const Chats = () => {
  const [fetchAgain, setFetchAgain] = useState(true);
  const {user}=ChatState()

  const { setChats } = ChatState();
  const toast=useToast()

  useEffect(()=>{
    const fetchChats=async (req,res)=>{
      //get all chats 
      //pass the required headers before get req
      // console.log(user.token);
      try {
          const config={
              headers:{
                  Authorization:`Bearer ${user.token}`
              }
          }

          const {data}=await axios.get("http://localhost:5000/api/chat",config)
          console.log(data)
          if(!data)
          {
              res.status(404).json("error while fetching chats")
          }
          // console.log("Data of chats ",data)
          setChats(data)
      } catch (error) {
          toast({
              title: "Error Occured!",
              description: "Failed to Load the chats",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
          
      }
  }
  fetchChats()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div style={{width:'100%'}}>
      <Navbar/>
      {user && <SideBar/>} 
      <Box style={{display:"flex",padding:"10px",width:"100%",justifyContent:"space-between"}}>
        {user && <MyChat  fetchAgain={fetchAgain} />} 
        { user &&  <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />}
      </Box>

    </div>
  )
}

export default Chats
