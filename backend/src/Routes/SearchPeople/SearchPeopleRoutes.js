const {getSearchedPeople, getAll }= require('../../controllers/SearchPeople/SearchPeople.js')
const { notifypart } = require('../../controllers/notifications/notificationController.js')
const authmiddleware=require('../../middlewares/checkAuth/authMiddleware.js')
const express=require('express')
const router=express.Router()

router.route("/search").get(authmiddleware,getSearchedPeople)
router.route("/getAll").get(authmiddleware,getAll)
router.post("/mail",authmiddleware,notifypart)
 

module.exports=router