const mongoose = require("mongoose");

const jobApplicationSchema=new mongoose.Schema({
  name:{
    type:String 
  },
  email:{ 
    type:String 
  },
  address:{
    type:String  
  },
  contactNumber:{
    type:String 
  },
  description:{
    type:String 
  },
  file:{
    type:String 
  },
  status:{
    type:Boolean,
    required:true,
    default:false 
  },
  rejected:{
    type:Boolean,
    default:false,
    required:true
  },
  jobId:{
    type:String
  },
  employerId:{
    type:String 
  },
  senderId:{
    type:String
  },
  postedby:{
    type:String
  },
  title:{
    type:String
  }
},{timestamps:true})


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
  token:{ 
    type:String
  },
  password: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  skills: {
    type: [{
      name: {
        type: String,
        unique: true
      },
      proficiency: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: 'Beginner'
      }
    }]
  },
  pic: {
    type: String,
    default:"https://icons8.com/icon/9XcGFWDvUMi7/administrator-male"
  },
  github: {
    type: {
      url: {
        type: String,
        required: true
      }
    }
  },
  linkedIn: {
    type: {
      url: {
        type: String,
        required: true
      }
    }
  },
  googleDrive: {
    type: {
      url: {
        type: String,
        required: true
      }
    }
  },
  documents: [{
    name: {
      type: String
    },
    url: {
      type: String
    }  
  }], 
  isAdmin:{
    type: Boolean, 
    required: true,
    default: false
  },
  location: {
    type: String
  },
  friends:{
    type:[String],
  },
  companyName: {
    type: String,
  },
  resumerecieved:{
    type:[
        {
            name:{
                type:String
            },
            url:{
                type:String 
            }
        }
    ]
  },
  certificates: [{
    name: String,
    url: String,
  }],
  jobApplications:[jobApplicationSchema]
}, { timestamps: true });




const User = mongoose.model("User", userSchema);
const JobApplications=mongoose.model("JobApplications",jobApplicationSchema)

module.exports = { User, JobApplications };
