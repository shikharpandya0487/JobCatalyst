const bodyParser = require('body-parser');
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const testRouter=require('./src/Routes/UserRoutes/user.routes.js')
const authrouter=require("./src/Routes/Auth/auth.js")
const postrouter=require("./src/Routes/PostRoutes/post.js")
const resumerouter=require("./src/Routes/ResumeRoutes/resume.js") 
const userRouter=require("./src/Routes/UserRoutes/userData.js")
const chatRouter=require('./src/Routes/chatRoutes/chatRoutes.js')
const messageRoutes=require('./src/Routes/messageRoutes/messageRoutes.js')
//Importing the routers  
const connectDb = require("./src/database/Connection.js")
const cookieParser = require("cookie-parser"); 
const jobRoutes=require("../backend/src/Routes/jobRoutes/jobRoute.js");
const jobRecordRoutes=require("../backend/src/Routes/jobRecordRoutes/jobRecordRoute.js")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser()) 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json()); 
app.use("/api/auth",authrouter);    
app.use("/api/post",postrouter);  
app.use("/api/resume",resumerouter);
app.use("/api/user",userRouter)   
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRoutes)
app.use("/api/jobs",jobRoutes);
app.use("/api/profile/jobrecords",jobRecordRoutes)
app.use(cors({  
    origin:"http://localhost:3000", 
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))
 



const PORT=process.env.PORT
connectDb()



const server=app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
  });
  
  const io=require('socket.io')(
    server,
    {
        pingTimeout:50000,
        cors:{
            origin:`http://localhost:3000`
        }
    }
)

io.on("connection",(socket)=>{
  console.log("Connected to the client (socket.io) ");

  socket.on("setup",(userData)=>{
      socket.join(userData._id)
      console.log("This is the user id ",userData._id);
      socket.emit("connected")
  })

  socket.on("join-chat",(room)=>{
      console.log("User joined the room ",room)
  })

  //event listner for sending the message
  //required things
  //To whom msg is sent 
  //the message which should be sent 
  socket.on("new-msg",(newMsg)=>{
      var chat =newMsg.chat;

      if(!chat.users)
      {
         return console.log("Chat users not defined");
      }

      chat.users.forEach((user)=>{
          if(user._id===newMsg.sender._id)
          {
              return;
          }
          //socket.in means msg sent to all in the room

          socket.in(user._id).emit("Msg-recieved",newMsg)
      })



  })


  // socket for indicating user typing or not typing 
  socket.on("typing",(user)=>socket.in(user).emit("Typing"))

  socket.on("stop typing",(room)=>socket.in(room).emit("Stop typing"))

  socket.off("setup",()=>{
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
  })
})
 





     
