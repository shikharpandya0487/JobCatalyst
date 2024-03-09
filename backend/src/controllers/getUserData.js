const dotenv=require('dotenv')
dotenv.config()
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;

const getUserData= async (request)=>{
    return new Promise((res,rej)=>{
    const token = request.cookies?.token;
    console.log("From get user data ",token);
  
          if(token)
          {
            jwt.verify(token,jwtSecret,{},(err,userData)=>{
            if(err) throw err;
            res(userData)})
            console.log("lo");
          }
          else
          {
            rej("NO token")  
          }
      }) 
  
  }

  module.exports=getUserData