import User from "../../models/user/User"

const friendReqAcceptController=async (req,res)=>{
   try {
    const user=req.user 

    const friendName=req.body.username 

    const friendUser=await User.findOne({username:friendName});

    if(!friendUser)
    {
        res.status(400).json({message:"The user does not exist"})
        throw new Error("The user does not exist")
    }

    const array=user.friends 

    if(array.includes(friendName))
    {
        res.status(400).json({
            message:"You are already the friend of the user"
        })
    }

    const r1=await User.findByIdAndUpdate({
        ...user,
        
    })



   } catch (error) {
    
   }

}

const GiveFriendRequest=async (req,res)=>{

}


export {friendReqAcceptController,GiveFriendRequest}