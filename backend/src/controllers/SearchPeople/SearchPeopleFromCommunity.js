const { User } = require("../../models/user/User")

const SearchPeopleFromCommunity=async(req,res)=>{
    try {
        const user=req.user 
        const {username,id}=req.query 
 
        if(!username||!id)
            {
                res.status(404).json({message:"Username or id not present"})
            }
            console.log(username,id)
        
 
        const searchedUser=await User.findById(id)  
        console.log("searchedUser ",searchedUser.username)
        if(!searchedUser)
            {
                res.status(404).json({messages:"User Not found "})
            }

        res.status(200).json({searchedUser})
    
        
    } catch (error) {
        console.log(error)
        res.status(404).json({error})
    }
}

module.exports=SearchPeopleFromCommunity