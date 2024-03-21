require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const path = require('path');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const testRouter=require('./src/Routes/user.routes.js')
const ws=require('ws')
const authrouter=require("../backend/src/Routes/auth.js")
const postrouter=require("../backend/src/Routes/post.js")
const resumerouter=require("../backend/src/Routes/resume.js")
const userRouter=require("./src/Routes/userData.js")
const fs=require('fs')
//Importing the routers  
const connectDb = require("./src/database/Connection.js")
const googleUser = require("./src/models/GoogleUser")
const cookieParser = require("cookie-parser");
const User=require("./src/models/User.js")
const jwt=require('jsonwebtoken')
const jwtSecret=process.env.JWT_SECRET_KEY 
const Message=require('./src/models/message.models.js')
app.use(cookieParser()) 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json()); 

//google login client id and secret 
const clientid = "183771193647-f0ba9rv1tmtld2jmcite1cpjccr2sqrc.apps.googleusercontent.com"
const clientsecret = "GOCS PX-zyHLvrKTJsyQGjkiy2Mb_Eq401e3"

app.use("/api/auth",authrouter);   
app.use("/api/post",postrouter);  
app.use("/api/resume",resumerouter);
app.use("/api/user",userRouter) 


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


app.use("/msg",testRouter);  


const PORT=5000;
connectDb()



const server=app.listen(5000, () => {
    console.log("Listening on port ", PORT);
  });
  

  app.get("/profile-msg", (req, res) => {
    const token = req.cookies?.token;
    console.log("In profile page ");
     
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        console.log("UserData in profile ",userData);
        if (err) throw err;
        res.status(201).json({userData,token});
        console.log(userData,token);
      }) 
    } else {  
      res.status(401).json("no token check here");
    }
  });  
  

app.get('/people',async (req,res)=>{
    // passing 1 to the object property means we are selecting only id and username of the user
    const users=await User.find({},{'_id':1,'username':1})
    // console.log(users);
    res.json(users)
  })



  const wss=new ws.WebSocketServer({server})
 
 
  wss.on('connection',(connection,req)=>{


    //mechanism to notify everyone about the live and offline customers
    // The method used to do this known as ping pong mech
    // ping sent by server --> client to check whether it' s alive
    // pong sent by client --> server to tell it's alive 
    // if t
    function notifyAllOnlinePeople()
    {
      [...wss.clients].forEach(client=>{
        client.send(JSON.stringify({
          online:[...wss.clients].map((c)=>({id:c.id,username:c.username}))
        }))
      }); 
    }
        
    //creating new property .isAlive indicating the online status
    connection.isAlive=true 
     
    //a ping after every 5sec
    connection.timer=setInterval(()=>{
      connection.ping()
      
      //If connection not recieved in 1.5 sec the client is considered disconnected 

      connection.deathTime=setTimeout(()=>{
        connection.isAlive=false
        clearInterval(connection.timer);
        connection.terminate();
        notifyAllOnlinePeople();
        // console.log("dead connection")/
      },1500)
    },5000)


    const response=req.headers.cookie
    if(response) 
    {
        const tokenCookieString=response.split(';').find(str=>str.startsWith('token='))
        //  console.log(tokenCookieString);
        const token=tokenCookieString.split('=')[1]
        if(token)  
        {
          jwt.verify(token,jwtSecret,{},(err,userData)=>{
            if(err) throw err;

            // console.log(userData);
            const {username,id}=userData
            // console.log(username,id)
            connection.id=id
            connection.username=username
          }); 
        notifyAllOnlinePeople()
          // console.log([...wss.clients].map((c)=>c.username));

        
        }      
     }
  
  
    connection.on('message',async (message)=>{
      console.log("hello");
      // console.log(message);
      // Here we need to convert the buffer data to string and then further to object for further use 
      const messageData=JSON.parse(message.toString())
      const {recipient, text, file} = messageData;
      let filename = null;
      if (file) {
        console.log('size', file.data.length);
        const parts = file.name.split('.');
        const ext = parts[parts.length - 1];
        filename = Date.now() + '.'+ext;
        const path = __dirname + '/uploads/' + filename;
        const bufferData = new Buffer(file.data.split(',')[1], 'base64');
        fs.writeFile(path, bufferData, () => {
          console.log('file saved:'+path);
        });
    }

    
    if(recipient && text)  
    {
        
              // creating the msg --> in DB
              const messageDocument=await Message.create({
                sender:connection.id,
                recipient:recipient,
                text
              });   
        //we send the text to other person
       [...wss.clients].filter((c)=>{          
          if(c.id===recipient)
          {
            return c;
          }
        }).forEach(c=>{
          c.send(JSON.stringify({
            text,                           
            sender:connection.id,
            _id:messageDocument._id,
            recipient,
            file: file ? filename : null,
          }))
        })
      }
    }); 
    notifyAllOnlinePeople()

 
})