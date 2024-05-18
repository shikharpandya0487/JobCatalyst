const { JobApplications } = require("../../models/user/User")

const getJobTitle=async(req,res)=>{
   try {
    const jobpostId=req.body

    const jobApplication=await JobApplications.findById(jobpostId)

    if(!jobApplication)
        {
            res.status(404).json({message:"Job Post not found"})
        }

        const title=jobApplication?.title
        const postedBy=jobApplication?.postedby
        const data={
            title,
            postedBy
        }

        res.status(200).json({data:data,message:"Successfully sending the title"})
   } catch (error) {
    console.log(error)
    res.status(500).json({error:error})
   }
}


module.exports=getJobTitle