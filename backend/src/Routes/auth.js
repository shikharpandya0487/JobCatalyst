const express = require("express");
const router = express.Router();
//fetching the authController
const authcontrollers=require("../controllers/authControllers");
const authMiddleware=require("../middlewares/auth-middleware");
router.route("/").get(authcontrollers.home);

router.route("/signup").post(authcontrollers.signup)
router.route("/login").post(authcontrollers.login);
router.route("/user").get(authMiddleware,authcontrollers.user);
module.exports = router;