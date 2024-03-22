
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const path = require('path');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const testRouter=require('./src/Routes/UserRoutes/user.routes.js')
const authrouter=require("./src/Routes/Auth/auth.js")
const postrouter=require("./src/Routes/PostRoutes/post.js")
const resumerouter=require("./src/Routes/ResumeRoutes/resume.js")
const userRouter=require("./src/Routes/UserRoutes/userData.js")
const chatRouter=require('./src/Routes/chatRoutes/chatRoutes.js')
const messageRoutes=require('./src/Routes/messageRoutes/messageRoutes.js')
//Importing the routers  
const connectDb = require("./src/database/Connection.js")
const googleUser = require("./src/models/user/GoogleUser.js")
const cookieParser = require("cookie-parser"); 


app.use(cookieParser()) 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json()); 

//google login client id and secret 
const clientid = "183771193647-f0ba9rvtmtld2jmcite1cpjccr2sqrc.apps.googleusercontent.com"
const clientsecret = "GOCS PX-zyHLvrKTJsyQGjkiy2Mb_Eq401e3"

app.use("/api/auth",authrouter);    
app.use("/api/post",postrouter);  
app.use("/api/resume",resumerouter);
app.use("/api/user",userRouter)   
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRoutes)

app.use(cors({  
    origin:"http://localhost:3000", 
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))
 

 
// setuppassport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//     new OAuth2Strategy({
//         clientID:clientid,
//         clientSecret:clientsecret,
//         callbackURL:"/auth/google/callback",
//         scope:["profile","email"]
//     },
//     async(accessToken,refreshToken,profile,done)=>{
//         try {
//             let user = await googleUser.findOne({googleId:profile.id});

//             if(!user){
//                 user = new googleUser({
//                     googleId:profile.id,
//                     displayName:profile.displayName,
//                     email:profile.emails[0].value,
//                     image:profile.photos[0].value
//                 });

//                 await user.save();
//             }

//             return done(null,user)
//         } catch (error) {
//             return done(error,null)
//         }
//     }
//     )
// )

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/login"
}))




const PORT=5000;
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
 





     
