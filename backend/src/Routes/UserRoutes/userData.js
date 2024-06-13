const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const profileController = require('../../controllers/Users/userDataController.js');
const authmiddleware = require("../../middlewares/checkAuth/authMiddleware.js");
const userController = require('../../controllers/Users/SearchUserController.js');
const requireLogin = require("../../middlewares/requireLogin.js");
const { addLinkController, deleteLinkController, acceessLinkController } = require('../../controllers/Users/linkController.js');
const { addSkillController, editingSkillController, deleteSkillController, accessSkillsController, addCertificate, getCertificate } = require('../../controllers/Users/skillController.js');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Profile routes
router.get('/profile/:id', profileController);
router.route("/").get(authmiddleware, userController);
router.route("/access-link").get(authmiddleware, acceessLinkController);
router.route("/add-link/:linkName").post(authmiddleware, addLinkController);
router.route("/delete-link/:linkName").post(authmiddleware, deleteLinkController);

// Skills routes
router.route("/add-skill").post(authmiddleware, addSkillController);
router.route("/edit-skill/:id").put(authmiddleware, editingSkillController);
router.route("/delete-skill/:id").delete(authmiddleware, deleteSkillController);
router.route("/get-skills").get(authmiddleware, accessSkillsController);

// Certificate routes
router.post("/add-certificate", requireLogin, upload.single("file"), addCertificate);
router.get("/get-certificate/:userId", getCertificate);

module.exports = router;
