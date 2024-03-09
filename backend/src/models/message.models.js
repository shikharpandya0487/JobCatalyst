const mongoose=require('mongoose')

const messaggeSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String 
    }

},{timestamps:true})

 const Message=mongoose.model("Message",messaggeSchema)
 module.exports=Message