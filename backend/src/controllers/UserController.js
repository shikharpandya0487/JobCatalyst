const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET_KEY;
const User = require("../models/User");


const signup =  async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!email || !username || !password) {
            return res.status(422).json({ error: "Please fill in all the fields" });
        }
        
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(422).json({ error: "User already exists with that email or username" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.json({ message: "Registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(422).json({ error: "Please provide email and password" });
        }

        const savedUser = await User.findOne({ email });

        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" });
        }
        const match = await bcrypt.compare(password, savedUser.password);
        if (match) {
            const token = jwt.sign({_id : savedUser.id},jwtSecret);
            const {_id} = savedUser;
            return res.status(200).json({token :token , user : _id, message: "Signed in successfully" });
        } else {
            return res.status(422).json({ error: "Invalid password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const changePass = async(req,res)=>{
    const {currentPassword,newPassword} = req.body;
    const userr = req.user;
    const userpassword = req.user.password; 
    try { 
        const match = await bcrypt.compare(currentPassword,userpassword );
        if(match)
        {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            userr.password = hashedPassword;
            await userr.save();
            return res.status(201).json("password change succesfully")
        }
        else {
            return res.status(401).json("password does not match")
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

    
module.exports = {signup,login,changePass} 