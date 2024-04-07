const mongoose = require("mongoose");

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
    default: "https://icons8.com/icon/20749/male-user"
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
  isAdmin: {
    type: Boolean, 
    required: true,
    default: false
  },
  location: {
    type: String
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
  }
}, { timestamps: true });




const User = mongoose.model("User", userSchema);


module.exports = User;
