import React, { useContext, useEffect, useState,useRef } from 'react'
import Logo from '../components/Chat/Logo'
import { UserContext } from '../UserContext'
import { uniqBy } from 'lodash'
import axios from 'axios'
import Contact from '../components/Chat/Contact'
import Navbar from '../components/Navbar'



const Chat = () => {
  
  // console.log(username,id);
  const [ws,setWs]=useState('')
  const [onlinePeople,setOnlinePeople]=useState({})
  const [offline,setOffline]=useState({})
  const [contact,setContact]=useState(null) //State to check for the selected person on chat
  const [newMessage,setNewMessages]=useState('') //State to input the message
  const [messages,setMessages]=useState([]) //storing messages
  const {username,id,setId,setUsername}=useContext(UserContext)
  // const [online,setOnline]=useState(false)
  // console.log(username,id);

  //  console.log(offline);
  //To keep scrolling the page to the bottomost latest chat we have to use useRef hook 
  //This hook keeps the ref of the element and prevents it's new creation after each re-render
  const divUnderChat=useRef()
  
  const showOnlyOnline={...onlinePeople};
  // console.log(showOnlyOnline[id],id)
  delete showOnlyOnline[id]
  // console.log(showOnlyOnline);


  // function to select the contact 
  function showOnline(messageData){
    //there can be duplicates so handling the duplicates
    const people={}

   messageData && messageData.forEach((person)=>(
      people[person.id]=person.username
    ))
    // console.log(people[id])
    setOnlinePeople(people)
    // console.log(messageData);
    // console.log(people)
  }

  // console.log(onlinePeople);
  
  let messageData
  function handleMessage(e){
    // console.log(e.data);
    messageData=JSON.parse(e.data)
    // console.log(messageData);
    if('online' in messageData )
    {
      // console.log(messageData.online);
      showOnline(messageData.online)
    }
    else
    {
      // console.log({messageData});
      setMessages((prev)=>([...prev,{
        ...messageData
      }]))
    }
    
  }

  // making a function which establishes socket connection 
  function connecToWS(){
    const ws = new WebSocket('ws://localhost:5000');

   // Set WebSocket instance in state
   setWs(ws);
   // Add event listener for messages
   ws.addEventListener('message', handleMessage);
   ws.addEventListener('close',()=>connecToWS())
  }

  
  useEffect(() => {
    connecToWS();
 
  }, []);


  function handleMessageChange(e){
        setNewMessages(e.target.value);
  }

  function sendMessage(ev,file=null){
  
    // console.log(ev);
    if(ev!=null)
    {

      ev.preventDefault()
    }


    console.log("sending");
    // we have to send info of the text which is send and also about the user selected
    console.log(newMessage);
   
    //sending to webSocket server

     
  
   if(file)
   {
    console.log({file});
    console.log(file.data,file.name);
      axios.get('/user/messages/'+contact)
      .then(res=>setMessages(res.data))
      .catch((e)=>{
        console.log("error while sending the file",e);
      })
      

      console.log(messages);
   }else{
    //  passing text , id of the sender , id of the recipent ,boolean state to identify the ownership of chat msg
     setMessages((prev)=>([...prev,{
       sender:id,
       recipient:contact,
       text:newMessage,
       isOur:true,
       _id:Date.now()
     }]))
     console.log(messages);
     setNewMessages('')
    }

    ws.send(JSON.stringify({        
      recipient: contact,
      text: newMessage,
      sender:id,
      file
     })); 
    //setting the height to which the site will be scrolled

    
// The scrollIntoView method is a DOM (Document Object Model) method in JavaScript that is used to scroll a particular element into the 
//visible area of the browser window or scrollable container. It brings the element to a position where it's fully visible to the user.

  }

  //To remove the duplicates we use a library of arrays in JS -->  Lodash which returns array with all unique values 
  //unique with respect to id
  const messagesWithoutDuplicates=uniqBy(messages,'_id')
 

  // useEffect for auto scrolling
  useEffect(()=>{
    const div=divUnderChat.current 
    if(div)
    {
      div.scrollIntoView({behavior:'smooth',block:'end'})
    }
  },[messages])

  // filtering online and offline people
  useEffect(()=>{
    axios.get('/people')
    .then((res)=>{
      // console.log(res.data)
      
      const offlinePeopleArray=res.data.filter(p=>(p._id!==id)).filter((q)=>!Object.keys(onlinePeople).includes(q._id))
      // console.log({offlinePeople})

      const offlinePeople={}
      offlinePeopleArray.forEach(
        person=>{
          offlinePeople[person._id]=person
        }
      )
      setOffline(offlinePeople)
      // console.log(offlinePeople,offlinePeopleArray);
    });

  },[onlinePeople])


  // using useEffect for getting the past chats from DB on loading the page 
  useEffect(()=>{
    // console.log(contact);
    if(contact)
    {
      axios.get('/msg/messages/'+ contact)
      .then((res)=>{
        const {data}=res
        console.log(res,contact);
         setMessages(res.data) 
        
      })
      .catch((e)=>{
        console.log("Error in fetching the old messages",e);
      })
    }

  },[contact])
  
  
  function uniqueKey(){
    const key=Math.random().toString(36).substring(7);
    return key
  }
   

   

  function logout() {
    axios.post('/logout')
      .then(() => {
        ws.close(); // Close WebSocket connection
        setId(null);
        setWs(null);
        setUsername('');
        localStorage.removeItem('LoggedIn');
        localStorage.removeItem('token')
        console.log("logging out");
      })
      .catch((e) => {
        console.log("error while logging out", e);
      })
  }

  function sendFile(ev){
    console.log(ev.target.files);
    const reader = new FileReader();

   

    
    //function will run after we have read the data
    
    reader.upload=()=>{
      const fileData={
        name: ev.target.files[0].name,
        data: reader.result,
      }
      
      
      setMessages((prev)=>([...prev,{
        data:reader.result,
        file: ev.target.files[0].name,
        _id:Date.now(),
        isOur:true,
        recipient:contact,
        sender:id
      }]))
      
      sendMessage(null, fileData);
      
      
    }
    reader.readAsDataURL(ev.target.files[0]);


  }

  
  
  function keyGen()
  {
      return Math.random().toString(36).substring(7);
  }

  // console.log({offline})
  // console.log({onlinePeople});
  // console.log(showOnlyOnline)
 
  return (
    <>
    <Navbar/>
    <div className='flex h-screen ' >
       {/* mapping the object to access the items */}
      <div className="bg-white w-1/3 flex flex-col items-start  gap-2 overflow-y-scroll ">
        <div className='flex-grow w-full'>
              <Logo/>
              {
                Object.keys(showOnlyOnline).map(userId=>{
                  // console.log(onlinePeople[userId],userId)
                return <Contact 
                Key={userId}
                id={userId} 
                onClick={()=>setContact(userId)} 
                selected={userId === contact}
                username={onlinePeople[userId]} 
                online={true}
                />
                })
              }

              {
                Object.keys(offline).map(userId=>{
                
                return  <Contact 
                key={userId}
                id={userId} 
                onClick={()=>setContact(userId)} 
                selected={userId === contact}
                username={offline[userId].username} 
                online={false}
                />
                })
              
              }
        </div>
        <div className='p-2 text-center w-full'>
          <button 
          onClick={logout}
          className='text-sm text-gray-500 bg-blue-200 py-1 pb-1 px-2 border rounded-sm  '
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-2">
        <div className='flex-grow w-full'>
          {
            !contact && ( 
              <div className='flex items-center justify-center w-full h-full text-2xl'>
                
                &larr;  Select a user to view messages 
           
              </div>
            )
          }

            {
              !!contact && (
                <div className='relative h-full'>
                  <div className='overflow-y-scroll absolute top-0 bottom-2 left-0 right-0'>
                    {
                      messagesWithoutDuplicates.map((message) => (
                        <div  className={(message.sender === id ? "text-right" : "text-left")}>
                          <div className={'inline-block p-2 mt-2 mb-2 rounded-md text-sm ' + (message.sender === id ? 'bg-blue-400 text-white' : 'bg-red-400 text-white')}>
                            {message.text}
                            {message.file && (
                                <div className="">
                                  <a target="_blank" className="flex items-center gap-1 border-b" href={axios.defaults.baseURL + '/uploads/' + message.file}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                      <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                    </svg>
                                    {message.file}
                                  </a>
                                </div>
                             )}
                          </div>
                        </div>
                      ))
                    }
                    {/* {
                      messages.map((msg)=>(
                        if('data' in msg)
                        {

                        }
                      ))
                    } */}
                    <div ref={divUnderChat}></div>
                  </div>
                </div>
              )
            }


        </div>
    {/* The double ! converts the value to Boolean  */}
        {!!contact?
        (
        <form className='flex gap-2 w-full' onSubmit={sendMessage}>
            <input 
            type="text"
            value={newMessage}
            placeholder="Type your message"
            onChange={handleMessageChange}
            className='bg-while border p-2 rounded-md w-full' 
             />
            
            {/* sending message  */}
             <button type='submit' className='bg-blue-500 p-2 rounded-md text-white'>           
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
             </button>
            {/* attaching files  */}
             <label type='submit' className='bg-gray-400 p-2 rounded-md text-gray-800 cursor-pointer border-gray border-2'>
                <input type="file" name="file" id="file" placeholder='choose a file' className='hidden' onChange={sendFile}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>   
             </label>

        </form>
        ):<div></div>
        
      }
        </div> 
    </div>
    </>
  )
}

export default Chat
