const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type: String,
    },
    company:{
        type: String,
    },
    description: {
        type: String,
    },
    tag:{
        type :String
    },
    position:{
        type:String ,
    },
    salary:{
        type:String ,        
    },
    location:{
        type:String ,
    },
    jobtype:{
        type:String ,
    },
    imgPath:{
        type:String,
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    heart:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    congrats:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{ timestamps: true })

const Post = mongoose.model("Post", postSchema);

module.exports = Post;