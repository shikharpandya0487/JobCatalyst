const { response } = require("express")
const Jobs = require("../../models/Jobs/Jobs")
const { User, JobApplications } = require("../../models/user/User")


// for both employer and user 
const getAppliedJobs=async (req,res)=>{
    try {
        const user=req.user 
        const jobs=user.jobApplications

        if(!jobs)
        {
            res.status(400).json({message:"Job applications not found ",success:false})
        }

        res.status(200).json({
            jobApplications:jobs,
            success:true,
            user:user
        })


    } catch (error) {
        res.status(500).json({
            error,
            success:false,
            message:"Can't get the job applications"
        })
    }
 
} 

// for the user
const applyForJob=async (req,res)=>{
    const { name, email, contactNumber, description, address, jobpostId } = req.body;
    try {
        const user = req.user;
        const admin = user.isAdmin;
        const cv = req.file ? req.file.filename : undefined;

        console.log("Hello from apply job", contactNumber, jobpostId, admin, cv);

        if (admin) {
            return res.status(404).json({ message: "Admin can't apply for a job" });
        }

        const jobPost = await Jobs.findById(jobpostId);
        if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }

        const title=jobPost.title 
        const postedby=jobPost.postedby 
        if (!name || !email || !contactNumber || !description || !address || !cv) {
            return res.status(400).json({ message: "Enter all important details and upload a CV" });
        }
        const senderId=user._id 
        const employerId=jobPost?.employerId

        console.log(jobPost,"file ",cv)
 
        const jobApplication = await JobApplications.create({
            name,
            email,
            description,
            contactNumber,
            file: cv,
            status: false,
            address,
            employerId,
            senderId,
            jobId: jobPost._id,
            title,
            postedby
        });
        
        const newU=await User.findByIdAndUpdate(
            employerId,
            {$push:{jobApplications:jobApplication}},
            {new:true}
        )

        
        
        
        const newUser = await User.findByIdAndUpdate(
            user._id,
            { $push: { jobApplications: jobApplication } },
            { new: true }
        );

        if(!newU)
            {
              return  res.status(500).json({message:"Didn't find employer"})
            }   


        if (!newUser) {
            return res.status(500).json({ message: "Can't update the field, ensure correct data fields" });
        }

        
       const response= await newUser.save()
      const response2=await newU.save()
        
      if(!response||!response2)
        {
            res.status(400).json({message:"not able to save "})
        }
        

        res.status(200).json({
            jobapplication: jobApplication,
            updatedUser: newUser,
            updatedemployer:newU,
            message: "User uploaded job successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error while applying", error });
    }
}
const acceptJob = async (req, res) => {
    try {
        const user = req.user;
        const { applicationId } = req.body;
        const admin = user.isAdmin;

        if (!admin) {
            return res.status(403).json({ message: "Only employers can accept applications" });
        }

        const jobApplication = await JobApplications.findById(applicationId);

        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

        let senderId = null;
        user.jobApplications.forEach(job => {
            if (job._id.toString() === applicationId) {
                senderId = job.senderId;
            }
        });

        console.log("senderId:", senderId);
        if (!senderId) {
            return res.status(404).json({ message: "Sender ID not found" });
        }

        // Update the job application status for the employer
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id, "jobApplications._id": applicationId },
            { $set: { "jobApplications.$.status": true } },
            { new: true }
        );

        // Update the job application status for the sender
        const updatedUser2 = await User.findOneAndUpdate(
            { _id: senderId, "jobApplications._id": applicationId },
            { $set: { "jobApplications.$.status": true } },
            { new: true }
        );

        if (!updatedUser || !updatedUser2) {
            return res.status(404).json({ message: "User or job application not found" });
        }

        // Save the updated users (optional step if findOneAndUpdate already persists changes)
        await updatedUser.save();
        await updatedUser2.save();

        const updatedJobApplication = updatedUser.jobApplications.find(application => application._id.toString() === applicationId);
        const updatedJobApplication2 = updatedUser2.jobApplications.find(application => application._id.toString() === applicationId);

        res.status(200).json({
            message: "Job application accepted successfully",
            updatedJobApplication,
            updatedJobApplication2,
            updatedUser,
            updatedUser2
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// for the employer 
const rejectJob=async (req,res)=>{
    try {
        const user=req.user 
        const jobId=req.params.id;

        if(user.isAdmin==false)
        {
            res.status(404).json({
                message:"Employer can only reject a job application"
            })
        }

        const JobApplication=await JobApplications.findById(jobId)
        const id=JobApplication?._id

        if(!JobApplication)
        {
            res.status(404).json({
                message:"Job searched can't be found"
            })
        }
        
        if (user.username.toString() !== JobApplication.name.toString()) {
            return res.status(403).json({ message: "You are not authorized to cancel this job application" });
        }
        JobApplication.status=false;
        JobApplication.rejection=true;

        user.jobApplications.map((jobapp,idx)=>{
            if(jobapp._id===id)
                {
                    jobapp.status=false 
                    jobapp.status=true 

                    return jobapp
                }
        })
      
        
        await user.save()

        const jobapplications=user.jobApplications
        

        res.status(200).json({
            jobapplications,
            message:"Updation done successfully"
        })
        
    } catch (error) {
         console.error("Error while rejecting job application:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const cancelJobReq = async (req, res) => {
    try {
        const user = req.user;
        const jobId = req.params.jobId;
        console.log("Checking ", user.username);

        if (user.isAdmin) {
            return res.status(403).json({ message: "An admin cannot cancel a job application" });
        }

        const jobApplication = await JobApplications.findById(jobId);
        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

     

       
        const deletedJobApplication = await JobApplications.findByIdAndDelete(jobId);
        if (!deletedJobApplication) {
            return res.status(400).json({ message: "Error deleting job application" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { jobApplications: { _id: jobId } } }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).json({ message: "Error updating user's job applications" });
        }
      

        return res.status(200).json({ message: "Successfully canceled the job application", updatedUser });
    } catch (error) {
        console.error("Error while canceling job application:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { cancelJobReq };



 module.exports={applyForJob,getAppliedJobs,acceptJob,rejectJob,cancelJobReq}