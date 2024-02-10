import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from 'axios';
// import './GoggleLogin.css'


function LandingPage() {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)


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
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user);
    } catch (error) {
        console.error(error);
    }
    setEmail('');
    setPassword('');
};

    

  //LOGIN WITH GOOGLE
  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self")
  }

  return (
    <>
      <Navbar />

      <div className="w-screen h-screen overflow-x-hidden flex flex-col">
        {/* hero section 1  */}
        <div className="w-screen h-1/2 flex flex-row">
          <div className="w-5/12 h-[380px] text-black text-[40px] font-normal font-['Inter'] flex justify-center items-center">
            <p className="8/12 text-center">Unlock Your Career Potential: Connecting Ambitions with Opportunities.</p>
          </div>

          <div className="w-7/12 h-[400px] bg-white rounded-md flex flex-col justify-center items-start p-1">
            <div className="w-full h-1/2 text-center flex flex-col justify-start items-center gap-2">

              <div className="w-full h-[43px] text-center">
                <span
                  style={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "normal",
                    fontFamily: "Inter",
                  }}
                >
                  Create an account or sign in. By continuing, you agree to our{" "}
                </span>
                <span
                  style={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "normal",
                    fontFamily: "Inter",
                    textDecoration: "underline",
                  }}
                >
                  Terms of Use
                </span>
                <span
                  style={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "normal",
                    fontFamily: "Inter",
                  }}
                >
                  and acknowledge our{" "}
                </span>
                <span
                  style={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "normal",
                    fontFamily: "Inter",
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </span>
              </div>

              {/* Sign in by google */}

              <button className='login-with-google-btn' onClick={loginwithgoogle}>
                Sign In With Google
              </button>

              {/* Sign in by facebook  */}

              <button className="w-7/12 h-[50px] bg-zinc-100 rounded-[40px] flex justify-around items-center p-1">
                <img
                  className="w-[35px] h-[43px]"
                  src={`${process.env.PUBLIC_URL}/facebook.png`}
                  alt="Facebook Logo"
                />
                <span className="text-lg">Sign in with FaceBook</span>
              </button>
            </div>

            <div class="w-full h-0 border border-black"></div>

            <div className="h-1/2 w-full flex flex-col justify-center items-center gap-3 p-1">
              {/* email  */}
              <label
                htmlFor=""
                className={`p-2 flex w-7/12 h-[50px] bg-zinc-100 rounded-[40px] justify-between items-center gap-4 
        }`}
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

              {/* {!isEmailValid && (
                 <div className="text-red-500 text-sm w-full p-1">
                         Invalid Email
                       </div>
                     )} */}

              {/* password  */}

              <label htmlFor="password" className="flex w-7/12 p-2 h-[50px] bg-zinc-100 rounded-[40px] justify-between items-center gap-4" >
                {/* <div className=" p-2 w-5/12 text-black text-xl font-normal font-['Inter']">Enter Password</div> */}
                Enter Password
                <input type="password" name="password" id="password" placeholder="Enter your password" className="text-center text-black w-7/12 h-[50px] bg-zinc-100 rounded-[40px] " onChange={passwordHandler} value={password} />
              </label>

              <div className="w-7/12 flex  justify-end p-1  ">
                <button className="w-7/12 p-2 bg-zinc-600 rounded-[40px] justify-center items-center text-white font-bold" onClick={handleSubmit}>
                  Login
                </button>
              </div>

            </div>

          </div>
        </div>

        <div class="w-screen h-3/4 bg-zinc-300 overflow-x-hidden flex justify-between">
          {/* vector image 
             <div className="w-1/2 h-full p-5 flex justify-center items-center bg-green-500 ">
                {/* <img src={`${process.env.PUBLIC_URL}/Vector.png`} alt="" className="w-8/12" /> 
             </div>

             {/* content  
             <div className="w-1/2 h-full p-3 flex flex-col justify-center items-center gap-5 overflow-x-hidden">
                 <div class="w-8/12 h-[236px] text-center text-black text-[50px] font-light font-['Inter']">Find out what's new at JobCatalyst</div>
                 <div class="w-8/12 h-[146px] text-center text-black text-[30px] font-normal font-['Inter']">Your career journey is serious, but should never be lonely or dull. With the new Glassdoor, work communities are right at your fingertips.</div>
             </div> 
             
             */}
          <div className="w-1/2 h-full bg-red-400">

          </div>

          <div className="w-1/2 h-full flex flex-col gap-3 justify-center items-center">
            <div className="w-full h-fit p-2 text-black
                  text-[62px]
                  font-light
                  font-['Inter'] text-center">
              Find out what's new at JobCatalyst
            </div>

            <div className="w-full h-fit p-2 text-black
                 text-[32px]
                 font-normal
                 font-['Inter'] text-center">
              Your career journey is serious, but should never be lonely or dull. With the new Glassdoor, work communities are right at your fingertips.
            </div>
          </div>



        </div>





      </div>
      <div className="flex flex-col justify-evenly items-start gap-4 p-3 h-[500px]">

        <div className="flex justify-evenly items-center h-full w-full">
          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
              {/* Your content goes here */}
              <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
            </div>
            <div className="text-center">Join Your Community</div>
          </div>

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
              {/* Your content goes here */}
              <img src={`${process.env.PUBLIC_URL}/Permanent.png`} alt="" />
            </div>
            <div className="text-center">Find and apply for jobs</div>
          </div>

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
              {/* Your content goes here */}
              <img src={`${process.env.PUBLIC_URL}/Money.png`} alt="" />
            </div>
            <div className="text-center">Compare Salaries</div>
          </div>


          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
              {/* Your content goes here */}
              <img src={`${process.env.PUBLIC_URL}/Notification.png`} alt="" />
            </div>
            <div className="text-center">Get Notifications</div>
          </div>

        </div>

        <div className="flex justify-evenly items-center h-full w-full">

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
              {/* Your content goes here */}
              <img src={`${process.env.PUBLIC_URL}/Company.png`} alt="" />
            </div>
            <div className="text-center">Company Reviews</div>
          </div>

          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
              {/* Your content goes here */}
              <img src={`${process.env.PUBLIC_URL}/Circled.png`} alt="" />
            </div>
            <div className="text-center">Video Resume</div>
          </div>


          <div className="w-[200px] flex flex-col justify-center items-center">
            <div className="w-15 h-15  border rounded-full p-2">
              {/* Your content goes here */}
              <img src={`${process.env.PUBLIC_URL}/Consultation.png`} alt="" />
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
