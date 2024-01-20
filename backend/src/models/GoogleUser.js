const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});


const googleUser = new mongoose.model("googleuser",userSchema);
module.exports = googleUser;