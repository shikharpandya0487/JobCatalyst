const { User } = require("../../models/user/User.js");
const OTP = require("../../models/OTP/OTP.js");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); //load the configuration
const jwtSecret = process.env.JWT_SECRET_KEY;
const mailSender = require("../../utils/mailSender");


exports.home = async (req, res) => {
    try {
        res.status(200).send('Home Page');
    }
    catch (error) {
        console.log(error);
    }
}

exports.signup = async (req, res) => {
    try {
        //date fetch from request ki body
        const { username,
            email,
            password,
            confirmPassword,
            companyName,
            location,
            isAdmin,
            otp
        } = req.body


        //validate data 
        console.log("hello", req.body);
        if (isAdmin === true && (!companyName || !location)) {
            res.status(403).json({
                success: false,
                message: "Enter all credentials"
            })
        }
        if (!username || !email || !password || !otp
        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        //2 password user dalega usko match karlo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassowrd values does not match, Please try again",
            })
        }
        //check user already exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "USER IS ALREADY REGISTERED PLEASE SIGN IN TO CONTINUE",
            })
        }
        //find most recent otp for the user
        //fetch recent most value from the list of data->using sort
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("Recent Otp ", response);

        //validate otp
        if (response.length == 0) {
            //otp not found
            return res.status(400).json({
                success: false,
                message: "OTP NOT FOUND"
            })
        }
        else if (otp !== response[0].otp) {
            //otpm does not match
            return res.status(400).json({
                success: false,
                message: "INVALID OTP",
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //entry create in db
        console.log("Industry / company name ", companyName)
        console.log("Location of the Company ", location)
        const k = (companyName && location) ? true : false
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: k,
            companyName: (k == true) ? companyName : null,
            location: (k == true) ? location : null
        })
        const token = jwt.sign({ userId: user._id, username }, jwtSecret)


        console.log("Data saved", user);

        //return res
        jwt.sign({ userId: user._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.status(201).json({

                _id: user._id,
                username: user.username,
                email: user.email,
                token: token,
            });
        });

        return res.status(200).json({
            success: true,
            user,
            message: "USER IS REGISTERED SUCCESSFULLY",
            token: token
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "USER CAN NOT BE REGISTERED. PLEASE TRY AGAIN",
        })
    }


}

exports.login = async (req, res) => {
    try {
        //get data from req body

        const { email, password } = req.body;
        //validation data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "ALL FIELDS ARE REQUIRED, PLEASE TRY AGAIN",
            })
        }
        //user check if not registered
        const user = await User.findOne({ email })
        //without populate also it will work
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            })
        }
        //generate jwt token after password matching
        if (await bcrypt.compare(password, user.password)) {
            //create the tocken using sign method
            const payload = {
                username: user.username,
                email: user.email,
                id: user._id,
            }
            //create jwt tocken using sign
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and response send 
            const options = {
                expires: new Date(Date.now() + 3 * 34 + 60 * 60 * 1000), //this mean 3days after 3 cays cookies will get destroyed
                httpOnly: true,
            }
            res.status(200).json({
                success: true,
                token,
                user,
                message: "Logged in succesfully",
            })
            console.log("logged in successfully");
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failer, please try again "
        })
    }
}

exports.guest=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

exports.googleAuth = async (req, res) => {
    try {
        //find the user 
        //If present then fetch the user details 
        //If user not found then console error
        console.log(req.body)
        const selectedUser = await User.findOne({ email: req.body.email })

        if (selectedUser) {
            console.log("User found")

            const password = selectedUser?.password
            // console.log(password)

            const token = jwt.sign({ id: selectedUser._id }, process.env.JWT_SECRET_KEY)
            const finalUser = {
                ...selectedUser._doc,
                token
            }
            delete finalUser?.password
            console.log(finalUser)

            res.status(201).json(finalUser)
        }
        else {

            // form a new account for the user


            const newUser = new User({
                ...req.body,
            })

            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY)

            if (newUser) {
                console.log(savedUser)
                res.status(201).json({
                    ...savedUser._doc,
                    token
                })

            }
            else {
                res.status(502).json({
                    message: "Error while creating account"
                })
            }

            console.log("Google auth ", savedUser)
            //if the user doesn't exist generate the user details which are necessary and save it 

        }


    } catch (error) {
        console.log(error);

    }
}

exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await User.findOne({ email });
        // to be used in case of signup

        // If user found with provided email
        if (checkUserPresent) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            });
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const result = await OTP.findOne({ otp: otp });
        // console.log("Result is Generate OTP Func");
        // console.log("OTP", otp);
        console.log("Result", result);
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP CREATED");
        console.log("OTP Body", otpBody);
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Retrieve user details
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log(req.body);
        const  oldPassword =  req.body.password;
        const newPassword = req.body.newPassword;
        const confirmNewPassword  = req.body.confirmPassword;

        // Validate input
        console.log("oldPassword:", oldPassword);
        console.log("new:", newPassword);
        console.log("con:", confirmNewPassword);

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        console.log("userDetails.password:", userDetails.password);
        
        // Check if old password matches
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "The old password is incorrect" });
        }

        // Check if new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New password and confirm password do not match" });
        }

        // Encrypt new password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await User.findByIdAndUpdate(userId, { password: encryptedPassword });

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({ success: false, message: "Error occurred while updating password", error: error.message });
    }
};
