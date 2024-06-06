const JobRecord = require("../../models/JobRecord/JobRecord");
exports.showAllJobRecord = async (req, res) => {
    try {
       
        const page = parseInt(req.query.page) || 1; 
        const pageSize = 10;

      
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

       
        const allJobs = await JobRecord.find({}).skip(startIndex).limit(pageSize);
        
     
        const totalDocs = await JobRecord.countDocuments();

      
        const totalPages = Math.ceil(totalDocs / pageSize);

        res.status(200).json({
            success: true,
            data: allJobs,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
            }
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
        const {
            company,
            position,
            startDate,
            endDate,
            description
        } = req.body;
 
		console.log(req.body)
        const newJobRecord = await JobRecord.create({
           company,
           position,
           startDate,
           endDate,
           description
        });
        console.log(newJobRecord);
        res.status(200).json({
            success: true,
            data: newJobRecord,
            message: "Job Post Record Created Successfully",
        });
    } catch (error) {
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
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const deletedJob = await JobRecord.findByIdAndDelete(postId);
        if (!deletedJob) {
            return res.status(404).json({
                success: false,
                message: "Job Record not found",
            });
        }

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
