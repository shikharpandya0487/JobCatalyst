const Jobs=require("../../models/Jobs/Jobs");

exports.showAllJobs = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    const totalPosts = await Jobs.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);
	
	const allJobs = await Jobs.find(
			{}
		) .skip((page - 1) * pageSize)
		.limit(pageSize);



		res.status(200).json({
			success: true,
			data: allJobs,
			totalPosts: totalPosts,
			totalPages: totalPages,
			currentPage: page
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.createJob = async (req, res) => {
	try {
		// Get all required fields from request body
		const {
            title,
            description,
            tag,
            position,
            salary,
            location,
            jobtype,
			experience,
			numberOfEmployee
		} = req.body;

		// Check if any of the required fields are missing
		if (
			!title ||
			!description ||
			!position ||
			!salary||
            !location||
            !jobtype
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		const user=req.user 
		if(!user.isAdmin)
		{
			res.status("Access not allowed")
		}
		const postedby=user.username
		const employerId=user._id
		// Create a new job post with the given details
		const newJob = await Jobs.create({
			title,
			postedby,
			description,
			employerId,
			tag,
			position,
			salary,
			location,
			jobtype,
			experience,
			numberOfEmployee
		});
		res.status(200).json({
			success: true,
            data:newJob,
			message: "Job Post Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the Job post
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create Job Post",
			error: error.message,
		});
	}
};

exports.deleteJobPost = async (req, res) => {
    try {
        const { postId } = req.body;

        // Check if postId is provided
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        // Find the job post by postId and delete it
        const deletedJob = await Jobs.findByIdAndDelete(postId);

        // Check if the job post exists
        if (!deletedJob) {
            return res.status(404).json({
                success: false,
                message: "Job Post not found",
            });
        }

        // Return success response
        res.status(200).json({
            success: true,
            message: "Job Post deleted successfully",
        });
    } catch (error) {
        console.error("Error while deleting the job post:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Job Post",
            error: error.message,
        });
    }
};

exports.showalldetail = async (req, res) => {
  try {
    const allJobs = await Jobs.find({});
    
    if (!allJobs || allJobs.length === 0) {
      return res.status(400).json({ message: "No job posts found" });
    }

    const allTitles = new Set()
	const allLocations=new Set()
	
	allJobs.forEach(job=>
		allTitles.add(job.title)
	)

	allJobs.forEach(job=>
		allLocations.add(job.location)
	)

	console.log("locations",allLocations)
	
    res.status(200).json({ titles: {allTitles},locations:allLocations});
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


