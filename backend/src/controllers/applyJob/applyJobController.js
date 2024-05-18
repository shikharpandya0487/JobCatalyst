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
            success:true
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
        const cv = req.file ? req.file.path : undefined;

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

        const jobApplication = await JobApplications.create({
            name,
            email,
            description,
            contactNumber,
            file: cv,
            status: false,
            address,
            jobId: jobPost._id,
            title,
            postedby
        });

        const newUser = await User.findByIdAndUpdate(
            user._id,
            { $push: { jobApplications: jobApplication } },
            { new: true }
        );

        if (!newUser) {
            return res.status(500).json({ message: "Can't update the field, ensure correct data fields" });
        }

        res.status(200).json({
            jobapplication: jobApplication,
            updatedUser: newUser,
            message: "User uploaded job successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error while applying", error });
    }
}

// for the employer 
const acceptJob=async (req,res)=>{
    try {
        const user=req.user 
        const applicationId=req.body 
        const admin=user.isAdmin 
        
        if(admin===false)
        {
            res.status(404).json({message:"Only employer can accept the applications "})
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id, "jobApplications._id": applicationId },
            { $set: { "jobApplications.$.status": true } },
            { new: true }
        );

        await updatedUser.save()
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User or job application not found" });
        }

       
        const updatedJobApplication = updatedUser.jobApplications.find(application => application._id.toString() === applicationId);
        
        if (user.username.toString() !== updatedJobApplication.name.toString()) {
            return res.status(403).json({ message: "You are not authorized to cancel this job application" });
        }
        
        res.status(200).json({ message: "Job application accepted successfully", updatedJobApplication,updatedUser });

    } catch (error) {
        res.status(404).json({
            error 
        })
    }
}

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

        user.jobApplications.status=false;
        user.jobApplications.rejection=true 
        
        await JobApplication.save()

        

        res.status(200).json({
            updatedJobApplication:JobApplication,
            message:"Updation done successfully"
        })
        
    } catch (error) {
         console.error("Error while rejecting job application:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// for the user 
const cancelJobReq = async (req, res) => {
    try {
        const user = req.user;
        const jobId = req.params.jobId;
        console.log("Checking ",user.username)

        if (user.isAdmin) {
            return res.status(404).json({ message: "A user applicant can only cancel their own job application" });
        }

        const jobApplication = await JobApplications.findById(jobId);
        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

        // Check if the current user is authorized to cancel this job application
        if (user.username.toString() !== jobApplication.name.toString()) {
            return res.status(403).json({ message: "You are not authorized to cancel this job application" });
        }

        // Delete the job application
        const deletedJobApplication = await JobApplications.findByIdAndDelete(jobId);
        if (!deletedJobApplication) {
            return res.status(400).json({ message: "Error deleting job application" });
        }

        // Update user's jobApplications array by removing the canceled job application
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { jobApplications: jobId } }, // Remove the canceled job application from the array
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).json({ message: "Error updating user's job applications" });
        }
        console.log("Cancelling job",updatedUser);

        return res.status(200).json({ message: "Successfully canceled the job application" });
    } catch (error) {
        console.error("Error while canceling job application:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



 module.exports={applyForJob,getAppliedJobs,acceptJob,rejectJob,cancelJobReq}