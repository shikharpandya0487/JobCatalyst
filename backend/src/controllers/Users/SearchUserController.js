const {User}=require('../../models/user/User.js')

// i means case sensitive
const allUsers=async (req,res)=>{
    try {
      const keyword=req.query.search 
      // console.log(keyword);
     ? {
      $or:[
        {username:{$regex:req.query.search,$options:"i"}},
        {email:{$regex:req.query.search,$options:"i"}}
      ],
    }:{}
     //ne not equal to the user logged in
    const user=await User.find(keyword).find({_id:{$ne:req.user._id}})
    // console.log(user);
    if(!user)
    {
      throw new Error("Error while getting the user")
    }
    else
    {
      return res.status(200).json(user)
    }
       
    } catch (error) {
      console.log(error);
      throw new Error("error while fetching the chats ")
    }
  }

  module.exports=allUsers