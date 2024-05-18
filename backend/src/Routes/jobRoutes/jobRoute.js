const express = require("express")
const router = express.Router()

const {showAllJobs, showalldetail}=require("../../controllers/Job/jobController");
const {createJob}=require("../../controllers/Job/jobController");
const {deleteJobPost}=require("../../controllers/Job/jobController");
const authmiddleware = require("../../middlewares/checkAuth/authMiddleware.js");

router.get("/getAllJobs",authmiddleware,showAllJobs);
router.post("/createJobPost",authmiddleware,createJob);
router.delete("/deleteJobPost",authmiddleware,deleteJobPost);
router.get("/getalltitles",authmiddleware,showalldetail)

module.exports=router