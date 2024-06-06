const express=require("express")
const router=express.Router()
const authmiddleware=require('../../middlewares/checkAuth/authMiddleware.js')
const SearchPeopleFromCommunity = require("../../controllers/SearchPeople/SearchPeopleFromCommunity.js")


router.get("/search",authmiddleware,SearchPeopleFromCommunity)


module.exports=router 