const express = require("express");
const router = express.Router();


const {
    login,
    signup,
    sendotp,
    changePassword,
    googleAuth,
    guest
  } = require("../../controllers/Authentication/authControllers.js")
 
  const {
    resetPasswordToken,
    resetPassword,
  } = require("../../controllers/ResetPassword.js")

router.get('/', (req, res) => {
    res.send("Hello");
});
const { auth } = require("../../middlewares/auth-middleware.js");

router.post("/login", login)
router.post("/guest",guest)
// Route for user signup
router.post("/signup", signup) 

router.post("/sendotp", sendotp)

router.post("/changepassword/:userId", changePassword)

router.post("/reset-password-token", resetPasswordToken)

router.post("/reset-password", resetPassword)
 
router.route('/google').post(googleAuth)
module.exports = router;