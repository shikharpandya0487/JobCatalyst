import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/react'
import MyChat from '.././MyChat.js'
import ChatBox from '../ChatDisplay/ChatBox.js'
import { ChatState } from '../../UserContext.js'
import SideBar from '../Header-SideBar/SideBar'
import Navbar from '../Navbar/Navbar.jsx'

const Chats = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const {user}=ChatState()
  console.log({user});

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
