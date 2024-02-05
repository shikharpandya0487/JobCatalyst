const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "hudhfpwidfhbcekdj";
const User = require("../models/User");
const requireLogin = require("../middlewares/requireLogin.js");  


router.get('/', (req, res) => {
    res.send("Hello");
});

router.post("/signup", async (req, res) => {
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
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(422).json({ error: "Please provide email and password" });
        }

        const savedUser = await User.findOne({ email });

        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" });
        }
        console.log(password);
        console.log(savedUser.password);
        const match = await bcrypt.compare(password, savedUser.password);
        console.log(match);
        if (match) {
            const token = jwt.sign({_id : savedUse = r.id},jwtSecret);
            const {_id} = savedUser;
            return res.status(200).json({token :token , user : _id, message: "Signed in successfully" });
        } else {
            return res.status(422).json({ error: "Invalid password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// router.post("/forgot-password", async (req,res) => {
//     const { email, currentPassword, newPassword }req.body;

//     const savedUser = await User.findOne({ email });

//     if (!savedUser) {
//         return res.status(422).json({ error: "Invalid email" });
//     }
//     try {
//         const match = await bcrypt.compare(currentPassword,userpassword );
//         if(match)
//         {
//             const hashedPassword = await bcrypt.hash(newPassword, 12);
//             userr.password = hashedPassword;
//             await userr.save();
//             return res.status(201).json("password change succesfully")
//         }
//         else {
//             console.log("password does not matched"); 
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
//     })

router.post("/change-password",requireLogin,async(req,res)=>{
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
            console.log("password does not matched"); 
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    })

module.exports = router;
