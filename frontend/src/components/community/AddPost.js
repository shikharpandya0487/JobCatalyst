import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import {useTheme} from '../../Context/ThemeContext'
import { ImCross } from "react-icons/im";

const AddPost = () => {
    const {theme} = useTheme();
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

    const handleApi = (e) => {
        e.preventDefault();

        if(!company && !title && !position && !location && !salary && !description && !tag)
        {
            alert("please fill the details of post");
            return;
        }

        const formData = new FormData();
        formData.append("file", video);
        formData.append("company", company)
        formData.append("title", title);
        formData.append("position", position);
        formData.append("location", location);
        formData.append("jobtype", jobtype);
        formData.append("salary", salary);
        formData.append("description", description);
        formData.append("tag", tag);
        console.log(formData);
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        };

        const url = 'http://localhost:5000/api/post/create-post';
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: headers,
        })
            .then((res) => {
                console.log(res.data);
                navigate('/community');
            }).catch((err) => {
                console.log("Error in the add post handler",err);
            });
    };

    // const options=[
    //     {
    //         label:""
    //     }

    // ]
    const handleCross=()=>{
        navigate("/community");
      }

    return (
      <div className='max-w-screen mx-auto min-h-screen'
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
      >
        <Navbar/>
        <div className="flex justify-center w-[100%] gap-2 p-4 min-h-fit">
            <div className="w-1/2 p-2 bg-slate-200 rounded-ms md:rounded-lg">
                <ImCross onClick={handleCross} />
                <h2 className="pt-2 pb-10 text-3xl md:text-5xl text-black text-center">Add Post</h2>
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
                    <button className="px-6 py-2 w-200px mt-4 text-lg text-white bg-blue-500 rounded-lg" onClick={handleApi}>Add</button>
                </form>
            </div>
            <div className='w-1/2 p-2 bg-slate-400 rounded-lg md:rounded-md'>
                <h1>
                    Preview your Post
                </h1>

                <div className="wrapper">
                    <h1>{company}</h1>


                </div>
            </div>
        </div>
        </div>
    );
};

export default AddPost;
