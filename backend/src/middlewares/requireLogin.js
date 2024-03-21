const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET_KEY;;
const User = require("../models/User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must have logged in 1" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token,jwtSecret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must have logged in 2" })
        }
        const id  = payload.id
        User.findById(id).then(userData => {
            req.user = userData;
            next()   
        })
    })

}