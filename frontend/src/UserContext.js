import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ChatContext = createContext();

const ChatProvider=({ children }) =>{

  const [user,setUser]=useState()
  const [selectedChat,setSelectedChat]=useState()
   const [notification,setNotification]=useState([])
   const [chats,setChats]=useState([])
  
  const navigate=useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);
  
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, user]);
  

  return (
    <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,notification,setNotification,chats,setChats}}>
      {children}
    </ChatContext.Provider>
  );
}

export const ChatState=()=>{
  return useContext(ChatContext)
}
export default ChatProvider
