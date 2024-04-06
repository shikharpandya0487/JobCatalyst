const mongoose=require("mongoose");
const jobRecordSchema=new mongoose.Schema({
    Company:{
        type: String,
        required:true,
    },
    Postion:{
        type:String,
        required:true,
    },
    StartDate: {
        type:String,
        required:true,
    },
    EndDate:{
        type:String,
        required:true,
    }
})
module.exports = mongoose.model("JobRecord", jobRecordSchema);
