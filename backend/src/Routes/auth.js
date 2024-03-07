const express = require("express");
const router = express.Router();
// const usercontroller = require("../controllers/UserController.js");
// const requireLogin = require("../middlewares/requireLogin.js");  
const {
    login,
    signup,
    sendotp,
    changePassword
  } = require("../controllers/authControllers.js")
 
  const {
    resetPasswordToken,
    resetPassword,
  } = require("../controllers/ResetPassword")

router.get('/', (req, res) => {
    res.send("Hello");
});
const { auth } = require("../middlewares/auth-middleware.js")
// router.post("/signup",usercontroller.signup);

// router.post("/login",usercontroller.login);
   
// router.post("/change-password",requireLogin,usercontroller.changePass)

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)
// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)
 
// Route for Changing the password
router.post("/changepassword", auth, changePassword)


// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)
module.exports = router;