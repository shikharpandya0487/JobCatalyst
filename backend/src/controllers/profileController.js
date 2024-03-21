const dotenv=require('dotenv')
dotenv.config()
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");


const profileController= (req, res) => {
    const token = req.cookies?.token;
    console.log("In profile page ");
     
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        res.status(201).json({userData,token});
        console.log(userData," -> ",token);
      }) 
    } else {  
      res.status(401).json("no token check here");
    }
}

module.exports=profileController