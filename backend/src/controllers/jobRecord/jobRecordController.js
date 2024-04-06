const JobRecord=require("../../models/JobRecord/JobRecord")

exports.showAllJobRecord = async (req, res) => {
	try {
		const allJobs = await JobRecord.find(
			{}
		);
		res.status(200).json({
			success: true,
			data: allJobs,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.createJobRecord = async (req, res) => {
	try {
		// Get all required fields from request body
		const {
            Company,
            Postion,
            StartDate,
            EndDate,
		} = req.body;

		// Check if any of the required fields are missing
		if (
			!Company ||
			!Postion ||
			!StartDate ||
			!EndDate
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}

		// Create a new job Record with the given details
		const newJobRecord = await JobRecord.create({
			Company,
			Postion,
			StartDate,
			EndDate
		});
		res.status(200).json({
			success: true,
            data:newJobRecord,
			message: "Job Post Record Created Successfully",
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

exports.deleteJobRecord = async (req, res) => {
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
        const deletedJob = await JobRecord.findByIdAndDelete(postId);

        // Check if the job post exists
        if (!deletedJob) {
            return res.status(404).json({
                success: false,
                message: "Job Record not found",
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