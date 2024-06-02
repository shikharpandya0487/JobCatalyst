const {getSearchedPeople, getAll }= require('../../controllers/SearchPeople/SearchPeople.js')
const authmiddleware=require('../../middlewares/checkAuth/authMiddleware.js')
const express=require('express')
const router=express.Router()

router.route("/search").get(authmiddleware,getSearchedPeople)
router.route("/getAll").get(authmiddleware,getAll)
 

module.exports=router