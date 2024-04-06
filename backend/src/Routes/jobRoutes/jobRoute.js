const express = require("express")
const router = express.Router()

const {showAllJobs}=require("../../controllers/Job/jobController");
const {createJob}=require("../../controllers/Job/jobController");
const {deleteJobPost}=require("../../controllers/Job/jobController");

router.get("/getAllJobs",showAllJobs);
router.post("/createJobPost",createJob);
router.post("/deleteJobPost",deleteJobPost);

module.exports=router