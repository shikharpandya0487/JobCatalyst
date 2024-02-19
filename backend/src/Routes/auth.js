const express = require("express");
const router = express.Router();
// const usercontroller = require("../controllers/UserController.js");
// const requireLogin = require("../middlewares/requireLogin.js");  
const {
    login,
    signup,
    sendotp
  } = require("../controllers/authControllers.js")
 
router.get('/', (req, res) => {
    res.send("Hello");
});

// router.post("/signup",usercontroller.signup);

// router.post("/login",usercontroller.login);
   
// router.post("/change-password",requireLogin,usercontroller.changePass)

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)
// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)
module.exports = router;
