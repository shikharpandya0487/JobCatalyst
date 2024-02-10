const express = require("express");
const router = express.Router();
const {signup,login,changePass}  = require("../controllers/UserController.js");
const requireLogin = require("../middlewares/requireLogin.js");  

 
router.get('/', (req, res) => {
    res.send("Hello");
});

router.post("/signup",signup);

router.post("/login",login);

// router.post("/forgot-password", async (req,res) => {
//     const { email, currentPassword, newPassword }req.body;

//     const savedUser = await User.findOne({ email });

//     if (!savedUser) {
//         return res.status(422).json({ error: "Invalid email" });
//     }
//     try {
//         const match = await bcrypt.compare(currentPassword,userpassword );
//         if(match)
//         {
//             const hashedPassword = await bcrypt.hash(newPassword, 12);
//             userr.password = hashedPassword;
//             await userr.save();
//             return res.status(201).json("password change succesfully")
//         }
//         else {
//             console.log("password does not matched"); 
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// })

router.post("/change-password",requireLogin,changePass)

module.exports = router;
