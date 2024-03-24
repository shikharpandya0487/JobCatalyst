import * as React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function CompanyPage() {
  const handleCreate = () => {
    console.log("Create button clicked");
  };

  return (
    <form className="flex flex-col bg-white rounded-md md:rounded-[78px]">
      <Navbar />
      <section className="flex flex-col self-center mt-10 md:mt-5 w-full max-w-[1559px] md:max-w-full">
        <div className="md:flex-1 flex justify-between px-5 max-w-full ">
          <h2 className="justify-center items-start pt-5 pb-10 text-3xl md:text-5xl text-black md:px-20">
            Create an Employer Account
          </h2>
          <img
            src="./Employee image.png"
            alt="Employee Image"
            className="max-w-[300px] h-[170px] order-last pt-5 px-50 mr-10"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-between text-lg md:text-lg text-black md:flex-wrap mt-5">
          <div className="flex flex-col flex-1 px-5 max-w-full">
            <label htmlFor="companyName">Your Company Name:</label>
            <input
              type="text"
              id="companyName"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-300 h-[40px] rounded-xl max-w-full"
            />
            <label htmlFor="numEmployees" className="mt-3">
              Your Company’s number of employees:
            </label>
            <input
              type="text"
              id="numEmployees"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-300 h-[40px] rounded-xl max-w-full"
            />
            <label htmlFor="PhoneNumber" className="mt-3">
              Contact Number:
            </label>
            <input
              type="text"
              id="PhoneNumber"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-300 h-[40px] rounded-xl max-w-full"
            />
          </div>
          <div className="flex flex-col flex-1 px-5 max-w-full">
            <label htmlFor="fullName">Your First And Last Name:</label>
            <input
              type="text"
              id="fullName"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-300 h-[40px] rounded-xl max-w-full"
            />
            <label htmlFor="howYouKnow" className="mt-3">
              How you came to know about us?
            </label>
            <input
              type="text"
              id="howYouKnow"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-300 h-[40px] rounded-xl max-w-full"
            />
            <label htmlFor="companyEmail" className="mt-3">
              Company Email:
            </label>
            <input
              type="text"
              id="companyEmail"
              className="shrink-0 mt-2 md:mt-3 bg-zinc-300 h-[40px] rounded-xl max-w-full"
            />
          </div>
        </div>
        <Link to="/job-basics">
          <button
            className="justify-center items-start px-6 py-2 mt-5 ml-5 md:ml-5 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl"
            onClick={handleCreate}
          >
            Create
          </button>
        </Link>
      </section>
      <div />
    </form>
  );
}

export default CompanyPage;
