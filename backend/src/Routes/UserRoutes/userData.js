const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/Users/userDataController.js');
// const getOldMsg=require('../controllers/getOldMsg.js')
const authmiddleware = require("../../middlewares/checkAuth/authMiddleware.js");
const userController=require('../../controllers/Users/SearchUserController.js')

router.get('/profile/:id', profileController);
// router.get('/messages/:userId',getOldMsg)
router.route("/").get(authmiddleware,userController)

module.exports = router;
