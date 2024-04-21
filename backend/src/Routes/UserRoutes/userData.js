const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/Users/userDataController.js');
const authmiddleware = require("../../middlewares/checkAuth/authMiddleware.js");
const userController=require('../../controllers/Users/SearchUserController.js');
const {addLinkController,deleteLinkController,acceessLinkController} = require('../../controllers/Users/linkController.js');
const { addSkillController, editingSkillController, deleteSkillController, accessSkillsController } = require('../../controllers/Users/skillController.js');
 
router.get('/profile/:id', profileController);

router.route("/").get(authmiddleware,userController)
router.route("/access-link").get(authmiddleware,acceessLinkController)
router.route("/add-link/:linkName").post(authmiddleware,addLinkController)
router.route("/delete-link/:linkName").post(authmiddleware,deleteLinkController)
router.route("/add-skill").post(authmiddleware,addSkillController)
router.route("/edit-skill/:id").put(authmiddleware,editingSkillController)
router.route("/delete-skill/:id").delete(authmiddleware,deleteSkillController)
router.route("/get-skills").get(authmiddleware,accessSkillsController)

module.exports = router;
