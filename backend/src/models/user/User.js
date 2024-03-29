const mongoose = require("mongoose");
// const bcrypt=require("bcryptjs");
// const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    skills:{
        type:[{
            name:{
                type:String,
            },
            proficiency:{
                type:String,
                enum:["Beginner","Intermediate","Advanced"],
                default:'Beginner'
            }            
        }]
    },
    education:{
       type:[{
            name:{
                type:String,
            },
    }]
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    links:{
        type:[{
                name:{
                    type:String 
                },
                url:{
                    type:String
                }
            }]
     },
    documents:[
        {
            name:{
                type:String 
            },
            url:{
                type:String
            }
        }
    ],
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},
{ timestamps: true });

module.exports = mongoose.model("User", userSchema);