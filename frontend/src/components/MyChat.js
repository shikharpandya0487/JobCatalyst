import React, { useEffect, useState } from 'react'
import { ChatState } from '../UserContext.js';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios'
import ChatLoading from './animation/ChatLoading'
import { AddIcon } from '@chakra-ui/icons';
// import GroupChat from './GroupChat/GroupChat.js';
import { getSender } from './HelperFunc/logicFunc';
import GroupChatModal from './GroupChat/GroupChatModal';

const MyChat = ({fetchAgain}) => {
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const toast=useToast()
        // console.log(user);
    const [loggedUser,setLoggedUser]=useState()
    console.log(chats)
  
   
    //fetching chats
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

            const {data}=await axios.get("https://jobcatalyst.onrender.com/api/chat",config)
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

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("user")));
        console.log(loggedUser);
        fetchChats();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    
  return (
    <>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        className='overflow-x-auto'
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        h="90vh"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={4}
          px={3}
          w="100%"
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          display="flex"
          justifyContent="space-between"
          alignItems="start"
        >
          My Chats
          <GroupChatModal>
            <Button
              display="flex"
              fontSize={{ base: "17px", md: "10px", lg: "18px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
        </Box>
        <Box>
          {chats ? (
            <Stack>
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat===chat?"lightBlue":"#E8E8E8"}
                  _hover={{
                    bg: "#4299E1",
                    color: "white"
                  }}
                  color={selectedChat === chat ? "red" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b className="font-semibold">{chat.latestMessage.sender?.username}: </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 30) + " ...."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
        <Box></Box>
      </Box>
    </>
  );
};

export default MyChat;
