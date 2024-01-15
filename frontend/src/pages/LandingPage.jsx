import React,{useState} from "react";
import Navbar from "../components/Navbar";

function LandingPage() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [isEmailValid,setIsEmailValid]=useState(false)
  
  const emailHandler = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(enteredEmail));
  };

  const passwordHandler=(e)=>{
     setPassword(e.target.value)
  }
  

  
  return (
    <div className="min-h-screen">
      <Navbar />
       
      <div className="w-screen min-h-screen overflow-x-hidden h-screen flex flex-col">
       {/* hero section 1  */}
          <div className="w-full h-1/2 flex lg:flex-row sm:flex-col">
             <div className="w-5/12 h-[380px] text-black text-[40px] font-normal font-['Inter'] flex justify-center items-center">
                <p className="8/12 text-center">Unlock Your Career Potential: Connecting Ambitions with Opportunities.</p>
             </div>

           <div className="w-7/12 h-[400px] bg-white rounded-md flex flex-col justify-center items-start">
               <div className="w-full h-1/2 text-center flex flex-col justify-start items-center gap-5">

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

                   <button className="w-7/12 h-[50px] bg-zinc-100 rounded-[40px] flex justify-around items-center p-2">
              <img
                className="w-[35px] h-[43px]"
                src={`${process.env.PUBLIC_URL}/Google.png`}
                alt="Google Logo"
              />
              <span className="text-2xl">Sign in with Google</span>
                   </button>
       
                   {/* Sign in by facebook  */}

                   <button className="w-7/12 h-[50px] bg-zinc-100 rounded-[40px] flex justify-around items-center p-1">
              <img
                className="w-[35px] h-[43px]"
                src={`${process.env.PUBLIC_URL}/facebook.png`}
                alt="Facebook Logo"
              />
              <span className="text-2xl">Sign in with FaceBook</span>
                   </button>
               </div>
             
       

         

             <div class="w-full h-[0px] border border-black"></div>

             <div className="h-1/2 w-full flex flex-col justify-center items-center gap-3 ">
            {/* email  */}
            <label
        htmlFor=""
        className={`flex w-7/12 h-[50px] bg-zinc-100 rounded-[40px] justify-between items-center gap-4 
        }`}
      >
        <div className="w-5/12 text-black text-xl font-normal font-['Inter']">
          Enter Email
        </div>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          className={`text-center text-black w-7/12 h-[50px] bg-zinc-100 rounded-[40px] ${
          !isEmailValid ? 'text-red-500' : '' // Add red border for invalid email
          }`}
          onChange={emailHandler}
          value={email}
        />
            </label>
   
            {/* password  */}

            <label htmlFor="" className="flex w-7/12 h-[50px] bg-zinc-100 rounded-[40px] justify-between items-center gap-4" >
              <div className="w-5/12 text-black text-xl font-normal font-['Inter']">Enter Password</div>
              <input type="password" name="password" id="password" placeholder="Enter your username" className="text-center text-black w-7/12 h-[50px] bg-zinc-100 rounded-[40px] " onChange={passwordHandler} value={password}/>
            </label>

             </div>

           </div>
          </div>

          <div class="w-full h-1/2 bg-zinc-300 flex justify-evenly overflow-x-hidden">
            {/* vector image  */}
             <div className="w-1/2 h-full p-5 flex justify-center items-center bg-green-500 ">
                {/* <img src={`${process.env.PUBLIC_URL}/Vector.png`} alt="" className="w-8/12" /> */}
             </div>

             {/* content  */}
             <div className="w-1/2 h-full p-3 flex flex-col justify-center items-center gap-5 overflow-x-hidden">
                 <div class="w-8/12 h-[236px] text-center text-black text-[50px] font-light font-['Inter']">Find out what's new at JobCatalyst</div>
                 <div class="w-8/12 h-[146px] text-center text-black text-[30px] font-normal font-['Inter']">Your career journey is serious, but should never be lonely or dull. With the new Glassdoor, work communities are right at your fingertips.</div>
             </div>
          </div>


          <div className="flex flex-col justify-evenly items-start gap-4 p-3 h-[500px]">

             <div className="flex justify-evenly items-center w-full">
            <div className="w-[200px] flex flex-col justify-center items-center">
               <div className="w-15 h-15  border rounded-full p-2">
                   {/* Your content goes here */}
                  <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
               </div>
               <div className="text-center">Hello</div>
            </div>  

            <div className="w-[200px] flex flex-col justify-center items-center">
               <div className="w-15 h-15  border rounded-full p-2">
                   {/* Your content goes here */}
                  <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
               </div>
               <div className="text-center">Hello</div>
            </div>   

            <div className="w-[200px] flex flex-col justify-center items-center">
               <div className="w-15 h-15  border rounded-full p-2">
                   {/* Your content goes here */}
                  <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
               </div>
               <div className="text-center">Hello</div>
            </div>  


            <div className="w-[200px] flex flex-col justify-center items-center">
               <div className="w-15 h-15  border rounded-full p-2">
                   {/* Your content goes here */}
                  <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
               </div>
               <div className="text-center">Hello</div>
            </div>   

              </div>

              <div className="flex justify-evenly items-center w-full">

            <div className="w-[200px] flex flex-col justify-center items-center">
               <div className="w-15 h-15  border rounded-full p-2">
                   {/* Your content goes here */}
                  <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
               </div>
               <div className="text-center">Hello</div>
            </div>    

            <div className="w-[200px] flex flex-col justify-center items-center">
               <div className="w-15 h-15  border rounded-full p-2">
                   {/* Your content goes here */}
                  <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
               </div>
               <div className="text-center">Hello</div>
            </div>  


            <div className="w-[200px] flex flex-col justify-center items-center">
               <div className="w-15 h-15  border rounded-full p-2">
                   {/* Your content goes here */}
                  <img src={`${process.env.PUBLIC_URL}/Chat.png`} alt="" />
               </div>
               <div className="text-center">Hello</div>
            </div>   

              </div>

          </div>

          <div  className="h-[500px] w-full bg-slate-600">

          </div>

          

      </div>
    </div>
  );
}

export default LandingPage;
