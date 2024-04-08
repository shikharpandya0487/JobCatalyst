import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import {useTheme} from '../../Context/ThemeContext';
import axios from 'axios';
// import './GoggleLogin.css'
import "./LandingPage.css"
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth} from '../../firebase/firebaseConfig'
import {Button} from '@chakra-ui/react'



function LandingPage() {
  const {theme} = useTheme();

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isAdmin,setIsAdmin]=useState(false)

  const SubmitHandler = (e) => {
    e.preventDefault();
    setEmail('')
    setPassword('')
  }


  const emailHandler = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(enteredEmail));
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/auth/login';
    const data = { email, password };
    try {
        const response = await axios.post(url, data);
        navigate('/community');
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user);
    } catch (error) {
        console.error(error);
    }
    setEmail('');
    setPassword('');
};

    
 const handleGoogle=(e)=>{
    const provider = new GoogleAuthProvider();
   signInWithPopup(auth,provider)
   .then((result)=>{
    console.log(result)
    console.log(result?._tokenResponse?.email)
    const name=result.user.displayName.split(" ")
    const username=name[0].toLowerCase()

    axios.post("http://localhost:5000/api/auth/google",{
      username:username,
      email:result?.user?.email
    })
    .then((res)=>{
      const user=res.data
      console.log("User logged in",user)

      localStorage.setItem("userId",user._id)
      localStorage.setItem("LoggedIn",true)
      localStorage.setItem("token",user.token)
      localStorage.setItem("user",JSON.stringify(user))
      navigate("/community")
    })
    .catch((err)=>console.log(err))
   })
 }






  return (
    <>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      <div className="w-screen h-screen overflow-x-hidden flex flex-col"
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
      >
        {/* hero section 1  */}
        <div className="w-screen min-h-1/2 flex flex-row ">
          <div className="w-8/12 h-full text-black text-[36px] font-normal font-['Inter'] p-3">
            <div className="w-8/12 flex justify-center items-center text-center"
            style={{
              color: theme === "dark" ? "#fff" : "#333",
            }}

            >Unlock Your Career Potential: Connecting Ambitions with Opportunities.</div>
             <div className="rounded-md"> <img src="LandingPage.jpg" alt="" /></div>
           
          </div>

          <div className="w-5/12 h-[400px]  rounded-md flex flex-col justify-center items-start p-1  bg-blue-100"
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
          }}
          >
           


            <div className="min-h-1/2 w-full flex flex-col justify-center items-center gap-3 p-1"
            style={{
              color: theme === "dark" ? "#333" : "black",
            }}
            >
              {/* email  */}
                <label
                  htmlFor=""
                  className={`p-4 flex w-7/12 h-[50px] bg-zinc-100 rounded-[40px] justify-between items-center gap-4`}
                >
                  Email

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full bg-zinc-100 rounded-[40px] text-center gap-2 ${!isEmailValid ? 'text-red-500' : ''}`}
                  onChange={emailHandler}
                  value={email}
                />



              </label>

              <label htmlFor="password" className="flex w-7/12 p-4 h-[50px] bg-zinc-100 rounded-[40px] justify-between items-center gap-4" >
                {/* <div className=" p-2 w-5/12 text-black text-xl font-normal font-['Inter']">Enter Password</div> */}
                 Password
                <input type="password" name="password" id="password" placeholder="Enter your password" className="text-center text-black w-7/12 h-[50px] bg-zinc-100 rounded-[40px] " onChange={passwordHandler} value={password} />
              </label>

              <div className="w-7/12 flex  justify-end p-1  ">
                <button className="w-full p-2 bg-zinc-600 rounded-[40px] justify-center items-center text-white font-bold" onClick={handleSubmit}>
                  Login
                </button>
                
              </div>
              <div className="w-7/12 p-2 border-1 flex justify-evenly rounded-xl border-black">
                 <button type="button" className="login-with-google-btn w-full text-black" onClick={handleGoogle}>
                  Sign in with Google
                </button>
              </div>
              <Button className="p-3 w-7/12 text-red-700" onClick={()=>setIsAdmin((prev)=>!prev)}>
                {isAdmin ?<p > Click Here If you are not an Employer</p>:<p> Click here if you are Employer</p>}
              </Button>
             

            </div>

          </div>
        </div>

      </div>
      <div className="flex flex-col justify-evenly items-start gap-4 p-3 h-[500px]"
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
      >

        <div className="flex justify-evenly items-center h-full w-full">
           <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
      
              <img src={`${process.env.PUBLIC_URL}/Resume.png`} alt="" />
            </div>
            <div className="text-center">Upload Your Resume</div>
          </div>

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
          
              <img src={`${process.env.PUBLIC_URL}/LookJob.png`} alt="" />
            </div>
            <div className="text-center">Find and apply for jobs</div>
          </div>

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
        
              <img src={`${process.env.PUBLIC_URL}/Salary.png`} alt="" />
            </div>
            <div className="text-center">Compare Salaries</div>
          </div>


          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
             
              <img src={`${process.env.PUBLIC_URL}/Notification.png`} alt="" />
            </div>
            <div className="text-center">Get Notifications</div>
          </div>
                    

        </div>

        <div className="flex justify-evenly items-center h-full w-full">

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
             
              <img src={`${process.env.PUBLIC_URL}/Review.png`} alt="" />
            </div>
            <div className="text-center">Company Reviews</div>
          </div>

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
               
              <img src={`${process.env.PUBLIC_URL}/VideoResume.png`} alt="" />
            </div>
            <div className="text-center">Video Resume</div>
          </div>


          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-3">
           
              <img src={`${process.env.PUBLIC_URL}/Connecting.png`} alt="" />
            </div>
            <div className="text-center">People Job Marketing</div>
          </div> 

        </div>

      </div>

      <div className="w-screen bg-stone-500 h-[150px]">

      </div>
    </>
  );
}

export default LandingPage;
