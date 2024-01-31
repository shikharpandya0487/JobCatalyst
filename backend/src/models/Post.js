const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag:{
        type :String
    },
    position:{
        type:String ,
        require:true
    },
    salary:{
        type:String ,
        require:true        
    },
    location:{
        type:String ,
        require:true
    },
    jobtype:{
        type:String ,
        require:true
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{ timestamps: true })

const Post = mongoose.model("Post", postSchema);

module.exports = Post;