const dotenv=require('dotenv')
dotenv.config()
const bcrypt=require('bcrypt')
const jwtSecret = process.env.JWT_SECRET;
const User=require('../models/user.models')
const jwt = require("jsonwebtoken");

const loginUser=async (req,res) => {
    const {username, password} = req.body;
    console.log(username,password);
    try {
        const foundUser = await User.findOne({username});
        if (foundUser) {
            console.log("Calling the new route \n",foundUser);
          const passOk = bcrypt.compareSync(password, foundUser.password);
          if (passOk) {
            jwt.sign({userId:foundUser._id,username}, jwtSecret, {}, (err, token) => 
            {
              res.cookie('token', token, {sameSite:'none', secure:true}).json({
                id: foundUser._id,
                token
              });      
             
            });
          }
        }
    } catch (error) {
        console.log("error while login",error);
    }
  }

  module.exports=loginUser