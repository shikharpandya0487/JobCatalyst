const express = require("express")
const router = express.Router()

const {showAllJobRecord}=require("../../controllers/jobRecord/jobRecordController");
const {createJobRecord}=require("../../controllers/jobRecord/jobRecordController");
const {deleteJobRecord}=require("../../controllers/jobRecord/jobRecordController");

router.get("/getAllJobRecord",showAllJobRecord);
router.post("/createJobRecord",createJobRecord);
router.post("/deleteJobRecord",deleteJobRecord);

module.exports=router