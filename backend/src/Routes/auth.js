const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcrypt');

const USER = mongoose.model("USER");


router.get('/', (req, res) => {
    res.send("hello")
})


router.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    if ( !email || !username || !password) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    USER.findOne({ $or: [{ email: email }, { username: username }] })
        .then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exist with that email or userName" })
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new USER({
                username,
                email,
                password: hashedPassword
            })

            user.save()
                .then(user => { res.json({ message: "Registered successfully" }) })
                .catch(err => { console.log(err) })
        })
    })

})


router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" })
    }
    USER.findOne({ email: email })
    .then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" })
        }
        console.log(savedUser)
        bcrypt.compare(password, savedUser.password)
        .then((match) => {
            if (match) {
                return res.status(200).json({ message: "Signed in Successfully" })
            } else {
                return res.status(422).json({ error: "Invalid password" })
            }
        })
        .catch(err => console.log(err))
    })
})

module.exports = router;

