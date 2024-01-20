// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const  connect = require( "./src/database/Connection.js");

// connect.connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(` Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
// })



const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;


const googleUser = require("./src/models/GoogleUser")
require("./src/models/User.js")


//local database connection
const connectToMongo = require( "./src/database/Connection.js")
connectToMongo(); 


const PORT = 8000; 

//google login client id and secret 
const clientid = "183771193647-f0ba9rv1tmtld2jmcite1cpjccr2sqrc.apps.googleusercontent.com"
const clientsecret = "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"


app.use(cors({  
    origin:"http://localhost:3000", 
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))
app.use(cors())
app.use(express.json()); 

//defining routes
app.use(require('./src/Routes/auth.js'));


// setup session
app.use(session({
    secret:"YOUR SECRET KEY",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await googleUser.findOne({googleId:profile.id});

            if(!user){
                user = new googleUser({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

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


app.listen(PORT,()=>{
    console.log("app is listening to the port")
})


