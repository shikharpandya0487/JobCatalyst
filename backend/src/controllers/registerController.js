const dotenv=require('dotenv')
dotenv.config()
const bcrypt=require('bcrypt')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken"); 

const registerController=async (req,res) => {
    const {username,password} = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
      const createdUser = await User.create({
        username:username,
        password:hashedPassword,
      });
      console.log(createdUser);
      jwt.sign({userId:createdUser._id,username}, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {sameSite:'none', secure:true}).status(201).json({
          id: createdUser._id,
        });
      });
    } catch(err) {
      if (err) throw err;
      res.status(500).json('error');
    }
  }

  module.exports=registerController