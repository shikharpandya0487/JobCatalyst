import authmiddleware from "../../middlewares/checkAuth/authMiddleware.js";

const express=require("express")
const router=express.Router()


const {friendReqAcceptController,GiveFriendRequest} = require("../../controllers/FriendController/friendController.js")


router.put("/accept-req",authmiddleware,friendReqAcceptController)
router.put("/send-req",authmiddleware,GiveFriendRequest);

export default router 


