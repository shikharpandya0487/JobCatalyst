require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require('path');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const authrouter=require("../backend/src/Routes/auth.js")
const postrouter=require("../backend/src/Routes/post.js")
const resumerouter=require("../backend/src/Routes/resume.js")
const userRouter=require("./src/Routes/userData.js")

//Importing the routers  
const connectDb = require("./src/database/Connection.js");

const googleUser = require("./src/models/GoogleUser")
require("./src/models/User.js")


app.use(cors())
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


connectDb().then(()=>{
    const PORT=5000;
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
});
});   