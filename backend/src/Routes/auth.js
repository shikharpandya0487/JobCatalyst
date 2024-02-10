const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/UserController.js");
const requireLogin = require("../middlewares/requireLogin.js");  

 
router.get('/', (req, res) => {
    res.send("Hello");
});

router.post("/signup",usercontroller.signup);

router.post("/login",usercontroller.login);
   
router.post("/change-password",requireLogin,usercontroller.changePass)

module.exports = router;
