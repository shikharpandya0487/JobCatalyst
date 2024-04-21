const express=require("express")
const router=express.Router()


const {friendReqAcceptController,GiveFriendRequest} = require("../../controllers/FriendController/friendController.js")


router.put("/accept-req/:id",friendReqAcceptController)
router.put("/send-req/:id");

export default router 


