const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require("../models/User");

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

        const match = await bcrypt.compare(password, savedUser.password);

        if (match) {
            return res.status(200).json({ message: "Signed in successfully" });
        } else {
            return res.status(422).json({ error: "Invalid password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
