const express=require('express')
const authmiddleware = require('../../middlewares/checkAuth/authMiddleware')
const router=express.Router()
const { getAppliedJobs, applyForJob, acceptJob, rejectJob, cancelJobReq } = require('../../controllers/applyJob/applyJobController')
const multer=require('multer')
const path=require('path')
const getJobTitle = require('../../controllers/getJobTitle/getJobTitle')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads')); 
    },
    filename: function (req, file, cb) {
        console.log("print file",file)
      cb(null, `${Date.now() }-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

 
router.route("/getAppliedJobs").get(authmiddleware,getAppliedJobs)
router.post("/acceptJob",authmiddleware,acceptJob)
router.delete("/rejectJob/:id",authmiddleware,rejectJob)
router.delete("/cancelJobApplication/:jobId",authmiddleware,cancelJobReq)
router.route("/applyForJob").post(authmiddleware, upload.single('cv'), (req, res, next) => {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    next();
}, applyForJob);
router.route("/getdetail").get(authmiddleware,getJobTitle)



module.exports=router