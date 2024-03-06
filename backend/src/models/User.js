const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
    }
},
{ timestamps: true });
// userSchema.methods.comparePassword= async function(password){
//     return bcrypt.compare(password,this.password)
// };

// userSchema.pre('save',async function(next){
//     // console.log("pre method",this); //this will give sara ka sara data jo save hone ke liye send kiya hai

//     const user=this;
//     if(!user.isModified("password")){
//         next(); //agar password change hi nhi hua hai to next middleware pr chale jao
//     }
//     try{
//         const salthRound=await bcrypt.genSalt(10);
//         const hash_password=await bcrypt.hash(user.password,salthRound);
//         user.password=hash_password;
//     }
//     catch(error){
//         next(error);
//     }
// });

// userSchema.methods.generateTocken=async function(){
//     try{
//         return jwt.sign({
//             //payload
//             userId:this._id.toString(),
//             email:this.email,
//             // isAdmin:this.isAdmin, //this mein pura schema aa jata hai
//         },
//         process.env.JWT_SECRET_KEY,
//         {
//             expiresIn:"30d",
//         }
//         );
//     }
//     catch(error){
//         console.log(error);
//     }
// }
// Export the Mongoose model

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema);