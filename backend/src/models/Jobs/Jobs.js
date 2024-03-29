const mongoose=require("mongoose");
const jobSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    postedby:{
        type:String,
        required:true,
    },
    postime:{
        type: Date,
		default: Date.now,
    },
    description: {
        type:String,
        required:true,
    },
    tag:{
        type:String,
        required:true,
    },
    position:{
        type:String ,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobtype:{
        type:String,
        required:true,
    }
})
module.exports = mongoose.model("Jobs", jobSchema);
