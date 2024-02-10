//Auth-middleware is a middleware used to verify the jwt tocken
//when the jwt tocken then only user data will become acessible
const jwt=require("jsonwebtoken")
const User=require("../models/User") 

const authMiddleware=async (req,res,next)=>{
    const token=req.header("Authorization");
    if(!token){
        return res.status(401).json({message:"Unauthorized HTTP, Token not provided"});
    }
    // console.log("Token from auth middleware",token);
    //Assuming token is in the format "Beared <jwtToken>, Removing the "Bearer" prefix"

    const jwtToken=token.replace("Bearer","").trim();
    // console.log("Token from auth middle23",jwtToken);
    try{
        const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        console.log(isVerified);
        //all the data passed in payload will be retured in isVerified after the jwt token verification
        const userData=await User.findOne({email:isVerified.email})
        .select({
            password:0, //this will make sure password is not printed
        });
        // console.log("Hello",userData);
        //now you will get every data from the backend

        req.user=userData;
        req.token=token;
        req.userID=userData._id;
        next();
        //only because of this hm router file mein likhe next route pr jaa payenge
        //move on to the next middleware or route handler
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized. Invalid token"});
    }



};
module.exports=authMiddleware;