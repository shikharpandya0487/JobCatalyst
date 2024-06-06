import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { ImCross } from "react-icons/im";
const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [jobtype, setJobtype] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [video, setVideo] = useState([]);
    console.log(video);
    useEffect(() => {
      const fetchPostData = async () => {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          };
           
          const url = `https://jobcatalyst.onrender.com/api/post/get-post/${id}`;
          const response = await axios.get(url, { headers });
          console.log(response.data);
          const postData = response.data;
          setCompany(postData.company);
          setTitle(postData.title);
          setPosition(postData.position);
          setLocation(postData.location);
          setJobtype(postData.jobtype);
          setSalary(postData.salary);
          setDescription(postData.description);
          setTag(postData.tag);
          setVideo(postData.video);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchPostData();
    }, [id]);
    

    const handleApi = async (e)=> {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", video);
        formData.append("company", company);
        formData.append("title", title);
        formData.append("position", position);
        formData.append("location", location);
        formData.append("jobtype", jobtype);
        formData.append("salary", salary);
        formData.append("description", description);
        formData.append("tag", tag);
        console.log(formData);
        try {
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            };
            const url = `https://jobcatalyst.onrender.com/api/post/edit-post/${id}`;
            const response = await axios.put(url, formData, { headers });
            console.log(response.data);
            navigate('/profile');
          } catch (err) {
            console.log("Server error");
          }
    };
    const handleCross=()=>{
      navigate("/profile");
    }

    return (
      <div className='max-w-screen mx-auto min-h-screen'>
      <Navbar/>
      <div className="flex justify-center w-[100%] gap-2 p-4 min-h-fit">
          <div className="w-1/2 p-2 bg-slate-200 rounded-ms md:rounded-lg">
          <ImCross onClick={handleCross} />
              <h2 className="pt-2 pb-10 text-3xl md:text-5xl text-black text-center">Edit Post</h2>
              {/* styling of input tags is still left  */}
              <form onSubmit={handleApi} className="flex flex-col justify-center">
                  <div className="w-full p-1">
                      <label htmlFor="companyName" className="text-black text-xl text-center font-light font-serif w-1/4" >Name:</label>
                      <input type="text" id="companyName" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" placeholder='Enter your Name' value={company} onChange={(e) => setCompany(e.target.value)} required/>
                  </div>
                  <div className="w-full p-1">
                      <label htmlFor="jobTitle" className="text-black text-xl text-center font-light font-serif w-1/4">Title:</label>
                      <input type="text" id="jobTitle" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" placeholder='Enter the title for your Post' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                  </div>
                  <div className="w-full p-1">
                      <label htmlFor="jobPosition" className="text-black text-xl text-center font-light font-serif w-1/4">Profession:</label>
                      <input type="text" id="jobPosition" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" placeholder='Enter the position' value={position} onChange={(e) => setPosition(e.target.value)} />
                  </div>
                  <div className="w-full p-1">
                      <label htmlFor="jobLocation" className="text-black text-xl text-center font-light font-serif w-1/4">Location:</label>
                      <input type="text" id="jobLocation" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" placeholder='Enter your location' value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                   {/* providing limited options to user to select the job type 
                  <div className="w-full p-1">
                      <label htmlFor="jobType" className="text-black text-xl text-center font-light font-serif w-1/4">Job Type:</label>
                      <input type="text" id="jobType" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" value={jobtype} onChange={(e) => setJobtype(e.target.value)} />
                  </div> */}


                  <div className="w-full p-1">
                      <label htmlFor="jobSalary" className="text-black text-xl text-center font-light font-serif w-1/4">Salary:</label>
                      <input type="text" id="jobSalary" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" placeholder='Enter your salary' value={salary} onChange={(e) => setSalary(e.target.value)} />
                  </div>

                  {/* This description should have an editor  */}

                  <div className="w-full p-1 flex justify-evenly items-center">
                      <label htmlFor="jobDescription" className="text-black text-xl text-center font-light font-serif w-1/4">Description:</label>
                      <textarea id="jobDescription" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>

                  <div className="w-full p-1">
                      <label htmlFor="jobTag" className="text-black text-xl text-center font-light font-serif w-1/4">Tag:</label>
                      <input type="text" id="jobTag" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" placeholder='Use #' value={tag} onChange={(e) => setTag(e.target.value)} />
                  </div>
                  <div className="w-full p-1">
                      <label htmlFor="jobFile" className="text-black text-xl text-center font-light font-serif w-1/4">File:</label>
                      <input type="file" id="jobFile" className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer" onChange={(e) => setVideo(e.target.files[0])} />
                  </div>
                  <button className="px-6 py-2 w-200px mt-4 text-lg text-white bg-blue-500 rounded-lg" onClick={handleApi}>Edit</button>
              </form>
          </div>
      </div>
      </div>
    );
};

export default EditPost;
