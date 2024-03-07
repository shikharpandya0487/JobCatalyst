const User=require('../models/User.js')


const profile=async(req,res)=>{
    const userId=req.params.id
    if(!userId)
    {
        console.log("Error in UserData controller ");
    }  
    const user=await User.findById(userId);
    if(!user)
    {
        return res.status(404).json({ezzrror:"User Not found"})
        console.log("user not found");
    }

    //if found then collect the data 
    // email , username and contact 


    res.status(200).json({
        username:user.username,
        email:user.email,
        contact:user.email
    })
}

module.exports=profile