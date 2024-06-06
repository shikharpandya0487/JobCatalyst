const mongoose=require("mongoose");
const jobRecordSchema=new mongoose.Schema({
    company:{
        type: String,
        // required:true,
    },
    position:{
        type:String,
        // required:true,
    },
    startDate: {
        type:String,
        // required:true,
    },
    endDate:{
        type:String,
        // required:true,
    },
    description:{
        type:String
    }
})
module.exports = mongoose.model("JobRecord", jobRecordSchema);
