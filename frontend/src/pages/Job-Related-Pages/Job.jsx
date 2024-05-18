import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import data from "../../components/DummyData/Data.json";
import CompanyPost from "../../components/Company-components/CompanyPost.jsx";
// import ForCompanies from "../../components/Company-components/ForCompanies.jsx";
import {useTheme} from "../../Context/ThemeContext";
import axios from "axios";
import { ChatState } from "../../UserContext.js";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";


function Job() {
  const {theme} = useTheme();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [JobPosting,setJobPosting]=useState([])
  const [filtered,setFiltered]=useState([])
  const {user}=ChatState()
  const toast=useToast()
 

  const onChangeLocationHandler = (e) => {
    setSearchLocation(e.target.value);
  };

  const onChangeJobProfileHandler = (e) => {
    setSearchText(e.target.value);
  };

  const Search = (item, type) => {
    if (type === "location") {
      setSearchLocation(item);
    } else if (type === "jobProfile") {
      setSearchText(item);
    }
  };



  const filterSearch = () => {
    const filteredData = JobPosting.filter((item) => {
      const locationMatch = item.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
      const jobProfileMatch = item.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
        if(locationMatch.length===0)
        {
          return jobProfileMatch
        }
        if(jobProfileMatch.length===0)
        {
          return locationMatch
        }
      return locationMatch  && jobProfileMatch;
    });
    setFiltered(filteredData);
    console.log("searched data",filteredData)
  };

  

  useEffect(()=>{
    const fetchJobs=async()=>{
      try {
        console.log("user token in job section",user.token)
        const config={
          headers:{
              Authorization:`Bearer ${user.token}`
          }
      }
      const response=await axios.get("http://localhost:5000/api/jobs/getAllJobs",config)
      console.log("All jobs ",response.data.data)
      setJobPosting(response.data.data)
  
        
      } catch (error) {
        console.log("Error while fetching jobs",error)
        toast({
          title: "Error Occured!",
          description: "Failed to Load the job posts",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-center",
        });
      }
    }
    fetchJobs()
  },[])
  const data2 = [
    {
      title: "SDE INTERVIEW Experience : Apple",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: " Salary Offer: 2L/MONTH",
      description:
        "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
    {
      title: "Rejection Experience : INTERVIEW",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: "Salary Offer: 2L/MONTH",
      description:
        "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
    {
      title: "SDE INTERVIEW Experience : Apple",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: " Salary Offer: 2L/MONTH",
      description:
        "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
  ];

  return (
    <div className="min-h-screen max-w-screen"
    style={{
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#333",
    }}
    
    >
      <Navbar />
      <div className="w-screen min-h-screen ">
        {/* Search Bars */}
        <div className="h-[4em] w-full flex flex-col g-0 items-center justify-start p-2 ">
          {/* Location Search Bar */}
          <div className="flex justify-center items-center w-fit h-10 p-3 g-2 border-black border-2 rounded-md">
            <input
              type="text"
              value={searchLocation}
              onChange={onChangeLocationHandler}
              className="rounded-md border-thin mr-2"
              placeholder="Enter Location"
            />
            <input
              type="text"
              value={searchText}
              onChange={onChangeJobProfileHandler}
              className="rounded-md border-thin ml-2 mr-3"
              placeholder="Enter Job Profile"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out"
              onClick={() => filterSearch()}
            >
              Search
            </button>
          </div>

          {/* Job Profile Search Bar
          <div className='flex justify-center items-center w-1/5 h-10 p-1 g-2 border-black border-2 rounded-md'>
            <button className='w-fit p-1' onClick={() => Search(searchJobProfile)}>
              Search
            </button>
          </div> */}

          {/* Search Results Dropdown */}
         
          <div className="dropdown absolute h-fit w-1/5">
            {
              console.log("Filtered Data",filtered)
            }
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <div
                  className="dropdown-row cursor-pointer text-center"
                  key={idx}
                  onClick={() => Search(item, item.position)}
                >
                  {item.position}
                </div>
              ))
            ) : (
              null
            )}
          </div>

        </div>

   
        
        {/* Search Tags & Body */}
        <div className="flex justify-between  min-h-screen w-full p-2">
          {/* Search Tags */}
          <div className="w-2/12 h-fit flex flex-col gap-3">
            <div className="w-full h-1/2 bg-gray-400 rounded-md border-1 flex flex-wrap items-start justify-start gap-1 p-3">
              <div className="font-bold text-center w-full">Job Location</div>
              {/* Tags */}
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                value={"Delhi"}
                onClick={() => Search("Delhi", "location")}
              >
                Delhi
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                value={"Mumbai"}
                onClick={() => Search("Mumbai", "location")}
              >
                Mumbai
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                value={"Chennai"}
                onClick={() => Search("Chennai", "location")}
              >
                Chennai
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                value={"Hyderabad"}
                onClick={() => Search("Hyderabad", "location")}
              >
                Hyderabad
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                value={"Banglore"}
                onClick={() => Search("Banglore", "location")}
              >
                Banglore
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                value={"Noida"}
                onClick={() => Search("Noida", "location")}
              >
                Noida
              </button>
            </div>

            <div className="w-full h-1/2 bg-gray-400 rounded-md border-1 flex flex-wrap items-start justify-start gap-1 p-1">
              <div className="font-bold text-center w-full">Job Profile</div>
              {/* Tags */}
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                onClick={() => Search("Data Analyst", "jobProfile")}
              >
                Data Analyst
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                onClick={() => Search("Web Developer", "jobProfile")}
              >
                Web Developer
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                onClick={() => Search("SEO Specialist", "jobProfile")}
              >
                SEO Specialist
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                onClick={() => Search("Meta Creator", "jobProfile")}
              >
                Meta Creator
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                style={{
                  color: theme === "dark" ? "#333" : "#333",
                }}
                onClick={() => Search("Educator", "jobProfile")}
              >
                Educator
              </button>
            </div>
          </div>

          {/* Main Body of Content */}
          <div className="w-10/12 h-screen  flex flex-col p-2 "
           style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
          }}
          >
            <div className="grid-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
             style={{
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              color: theme === "dark" ? "#fff" : "#333",
            }}
            >              
              {
                Array.isArray(JobPosting) ? (
                 (filtered.length===0)? 
                 (
                    JobPosting.map((item, index) => (
                    <div key={index} className="mb-4">
                      <CompanyPost
                        title={item?.title}
                        company={item?.company}
                        position={item?.position}
                        location={item?.location}
                        jobType={item?.jobtype}
                        salary={item?.salary}
                        description={item?.description}
                        tags={item?.tags}
                        image={item?.image}
                        posted={item?.postedby}
                        value={index+"abc"}
                        jobpostId={item?._id}
                      />
                    </div>
                  ))
                 )
                  :(
                    filtered.map((item,idx)=>(
                      <div key={idx+1000} className="mb-4">
                      <CompanyPost
                        title={item?.title}
                        company={item?.company}
                        position={item?.position}
                        location={item?.location}
                        jobType={item?.jobtype}
                        salary={item?.salary}
                        description={item?.description}
                        tags={item?.tags}
                        image={item?.image}
                        posted={item?.postedby}
                        value={idx+"abc"}
                      />
                    </div>
                    ))
                  )
                 
                ) : (
                 
                  <Spinner />
                
                )
                      
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;