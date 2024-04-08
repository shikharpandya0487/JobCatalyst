import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints

  export  function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/community")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", "http://localhost:5000/api/auth/sendotp", {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function signUp(
    username,
    email,
    password,
    confirmPassword,
    companyName,
    location,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", "http://localhost:5000/api/auth/signup", {
          username,
          email,
          password,
          confirmPassword,
          companyName,
          location, 
          otp,
        }) 
        console.log(companyName,location)
        if (!response){
          toast.error("Signup Failed")
          throw new Error(response.data.message)
        }
  
        console.log("SIGNUP API RESPONSE............", response)
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify({...response.data.user,token:response.data.token}))
        localStorage.setItem("userId",JSON.stringify(response.data.user._id))
        localStorage.setItem("LoggedIn",JSON.stringify("True"))
  
        toast.success("Signup Successful")
        navigate("/community")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Wrong OTP Please Try Again!")
        navigate("/")
        dispatch(setLoading(false))
      }
     
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function getPasswordResetToken(email , setEmailSent) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", "http://localhost:5000/api/auth/reset-password-token", {email,})
  
        console.log("RESET PASSWORD TOKEN RESPONSE....", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Reset Email Sent");
        setEmailSent(true);
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Failed to send email for resetting password");
      }
      dispatch(setLoading(false));
    }
  }
  
  export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST","http://localhost:5000/api/auth/reset-password", {password, confirmPassword, token});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }
      dispatch(setLoading(false));
    }
  }