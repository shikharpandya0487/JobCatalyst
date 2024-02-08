import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const JobBasics = () => {
  const handleCreate = () => {
    console.log("Create button clicked");
  };
  return (
    
  <form className="flex flex-col bg-white rounded-md md:rounded-[78px]">
      <Navbar/>
    <section className="flex flex-col self-center mt-10 md:mt-5 w-full max-w-[1559px] md:max-w-full">
      <div className="md:flex-1 flex flex-col px-5 max-w-full justify-center items-center ">
          <h2 className="justify-center items-center pt-2 pb-10 text-3xl md:text-5xl text-black ">
           Job Basics
          </h2>
      </div>
      <div className="flex flex-col flex-1 px-5 max-w-full">
            <label htmlFor="JobTitle" className="text-black font-medium text-2xl">Job Title:</label>
            <select
              id="jobTitle"
              className="mt-3 md:mt-3 bg-gray-100 h-[40px] rounded-3xl border-black border-2 max-w-full"
            >
             <option value="option1"></option>
             <option value="option2"></option>
             <option value="option3"></option>
            
            </select>
      </div>
      <hr className="border-t-2 border-gray-700 w-full  ml-2 mr-4 mt-4"/>
      <div className="flex flex-col flex-1 px-5 max-w-full">
      <h2 className="justify-center items-start pt-2 pb-6 text-xl md:text-2xl text-black ">
           Job Location
          </h2>
            <label htmlFor="companyName" className="text-black-800 font-medium text-lg">Job location type (remote / working-on-premise):</label>
            <select
              id="jobTitle"
              className="mt-3 md:mt-3 bg-gray-100 h-[40px] rounded-3xl border-black border-2 max-w-full"
            >
             <option value="option1"></option>
             <option value="option2"></option>
             <option value="option3"></option>
            
            </select>
            <label htmlFor="numEmployees" className="mt-3 text-black-800 font-medium text-lg">City</label>
            <input
              type="text"
              id="numEmployees"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-100 h-[40px] rounded-3xl border-black border-2 max-w-full"
            />
            <label htmlFor="numEmployees" className="mt-3 text-black-800 font-medium text-lg">Address</label>
            <input
              type="text"
              id="PhoneNumber"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-100 h-[40px] rounded-3xl border-black border-2 max-w-full"
            />
          </div> 
        <div className="flex justify-between">
        <Link to="/companies">
          <button
            className="justify-center items-start px-6 py-2 mt-4 ml-10 md:ml-10 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl"
            onClick={handleCreate}
          >
           Go Back
          </button>
        </Link>
        <Link to="/job-post">
          <button
            className=" order-last  px-6 py-2 mt-4 ml-10 mr-10 md:ml-10 mr-10 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl"
            onClick={handleCreate}
          >
           Continue
          </button>
        </Link>
        </div>
        
        

 
    </section>
   </form>
  )
}

export default JobBasics