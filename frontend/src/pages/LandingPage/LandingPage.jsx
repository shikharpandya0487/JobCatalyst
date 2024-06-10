import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import Navbar2 from "../../components/Navbar/Navbar2.jsx";
import {useTheme} from '../../Context/ThemeContext';
import axios from 'axios';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth} from '../../firebase/firebaseConfig'
import {Button, useToast} from '@chakra-ui/react'
import '../LandingPage/LandingPage.css'
import SignupForm from "../../components/Login-Signup/SignupForm.jsx";




function LandingPage() {
  const {theme} = useTheme();

  const navigate = useNavigate();
  
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [isEmailValid, setIsEmailValid] = useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  // const [open, setOpen] = useState(false);
  const [modalShowSignup, setModalShowSignup] = useState(false);
  const userInfo={
    email:"shikharpandya007@gmail.com",
    password:"123",
    companyName:"EmptyGlasses Makes Lot of Sound"
  }

  const guestEmployer={
    email:"shah@gmail.com",
    password:"123",
    companyName:""
  }

  const toast=useToast()

  // const emailHandler = (e) => {
  //   const enteredEmail = e.target.value;
  //   setEmail(enteredEmail);

  //   // Regular expression for basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   setIsEmailValid(emailRegex.test(enteredEmail));
  // };

  // const passwordHandler = (e) => {
  //   setPassword(e.target.value)
  // }


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = 'https://jobcatalyst.onrender.com/api/auth/login';
//     const data = { email, password };
//     try {
//         const response = await axios.post(url, data);
//         navigate('/community');
//         console.log(response.data)
//         localStorage.setItem('token', response.data);
//         localStorage.setItem('userId', response.data.user);
//     } catch (error) {
//         console.error(error);
//     }
//     setEmail('');
//     setPassword('');
// };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/auth/login';
    const data = { email, password };
    try {
        const response = await axios.post(url, data);
        navigate('/community');
        console.log(response.data)
        localStorage.setItem('token', response.data);
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

 const handlesignup=()=>{
  setModalShowSignup(true)
  setIsAdmin((prev)=>!prev)
 }

 const handleGuestLogin=async (e)=>{
    try {
      e.preventDefault()
      console.log("Console from loginForm ", userInfo);
      const response = await axios.post('https://jobcatalyst.onrender.com/api/auth/login', userInfo);
      console.log(response);
      if (response.data.success) {
        // Handle successful login
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('LoggedIn', true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast({
          title: 'Logged in successfully.',
          description: "You have been logged in.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });

        navigate('/community');
      } else {
        // Handle unsuccessful login
        toast({
          title: 'Login failed',
          description: response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'An error occurred',
        description: 'An error occurred while logging in. Please try again later.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
 

}

const handleGuestEmployerLogin=async(e)=>{
  try {
    e.preventDefault()
    console.log("Console from loginForm ", guestEmployer);
    const response = await axios.post('https://jobcatalyst.onrender.com/api/auth/login', guestEmployer);
    console.log(response);
    if (response.data.success) {
      // Handle successful login
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('LoggedIn', true);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: 'Logged in successfully.',
        description: "You have been logged in.",
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      navigate('/community');
    } else {
      // Handle unsuccessful login
      toast({
        title: 'Login failed',
        description: response.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.error('Login failed:', error);
    toast({
      title: 'An error occurred',
      description: 'An error occurred while logging in. Please try again later.',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  }
}





  return (
    <>
      <Navbar2 isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

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
           


            <div className="h-3/4  w-full flex flex-col justify-center items-center gap-2 p-1"
            style={{
              color: theme === "dark" ? "#333" : "black",
            }}
            >
             

              
              <div className="w-7/12 h-fit p-2 border-1 flex justify-evenly rounded-xl border-black">
                 <button type="button" className="login-with-google-btn w-full text-black" onClick={handleGoogle}>
                  Sign in with Google
                </button>
              </div>
              <Button className="p-3 w-7/12 text-red-700 " onClick={handlesignup}>
               {isAdmin ?<p >To Sign Up Click Here If you are not an Employer</p>:<p>To Sign Up Click here if you are Employer</p>}
              </Button>
              <Button className="p-3 w-7/12 text-red-700 " onClick={handleGuestLogin}>
                Guest User Account
              </Button>
              <Button className="p-3 w-7/12 text-red-700 " onClick={handleGuestEmployerLogin}>
                Guest Employer Account
              </Button>
             

            </div>
          </div>
            <SignupForm show={modalShowSignup} onHide={() => setModalShowSignup(false)} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
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
