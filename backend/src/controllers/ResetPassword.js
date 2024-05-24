const { User}=require("../models/user/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto = require("crypto");

//resetPassowrdToken
//it will generate the token for the user, which we can further use 
exports.resetPasswordToken=async(req,res)=>{
    try{
    //get email from the req body
    //check user for this email,   validation
    const email=req.body.email;
    const user=await User.findOne({email:email});
    if(!user){
        return res.json({
            sucess:false,
            message:`This Email: ${email} is not Registered With Us Enter a Valid Email `,
        })
    }

    //generate token
    const token=crypto.randomBytes(20).toString("hex");
    //update user by adding token and expiration time
    console.log(token);
    const updatedDetails=await User.findOneAndUpdate({email:email},{
        token:token,
        resetPasswordExpires:Date.now()+3600000,
    },{new:true});
    console.log("DETAILS", updatedDetails);

    //by passing the third parameter as new:true, update document will be returned
    // in the updatedDetails variable

    //create the url
    const url=`https://job-catalyst.vercel.app/update-password/${token}`
    //frontend url 

    //send mail containing the url
    await mailSender(email,"Password Reset Link",`Your Link for email verification is ${url}. Please click this url to reset your password.`);
    //send the response
    return res.json({
        success:true,
        message:"Email Sent Successfully, Please Check Your Email to Continue Further"
    })
    //link generator
    //at 3000 our frontend will be running
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong while reset password",
        })
    }
}


//resetpassword
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};