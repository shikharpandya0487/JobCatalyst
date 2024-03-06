const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");

//auth
exports.auth=async(req,res,next)=>{
    try{
        //check authentication- by verifying the json web tocke
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer "," ");
        //if torken missing, then return 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }
        //verify the token using the secret key
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode); //decode will have all the details which was passed in payload
            req.user=decode;
        }
        catch(error){
            //verification failed
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        //forward to the next middleware
        next();
 
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}


