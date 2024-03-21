import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
const AddPost = () => {
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
                console.log(err);
            });
    };

    return (
      <div>
        <Navbar/>
        <div className="flex justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-md md:rounded-lg">
                <h2 className="pt-2 pb-10 text-3xl md:text-5xl text-black text-center">Add Post</h2>
                <form onSubmit={handleApi} className="flex flex-col space-y-6">
                    <div className="mb-2 ">
                        <label htmlFor="companyName" className="text-black font-medium text-xl">Company Name:</label>
                        <input type="text" id="companyName" className="input-field bg-gray-300 p-2 rounded-2xl px-4 ml-2" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobTitle" className="text-black font-medium text-xl">Title:</label>
                        <input type="text" id="jobTitle" className="input-field bg-gray-300 p-2 rounded-2xl px-4 ml-6" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobPosition" className="text-black font-medium text-xl">Position:</label>
                        <input type="text" id="jobPosition" className="input-field bg-gray-300 p-2 rounded-2xl px-4 ml-2" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobLocation" className="text-black font-medium text-xl">Location:</label>
                        <input type="text" id="jobLocation" className="input-field bg-gray-300 p-2 rounded-2xl px-4 ml-2" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobType" className="text-black font-medium text-xl">Job Type:</label>
                        <input type="text" id="jobType" className="input-field bg-gray-300 p-2 rounded-2xl px-4 ml-2" value={jobtype} onChange={(e) => setJobtype(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobSalary" className="text-black font-medium text-xl">Salary:</label>
                        <input type="text" id="jobSalary" className="input-field bg-gray-300 p-2 rounded-2xl px-4 ml-2" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobDescription" className="text-black font-medium text-xl">Description:</label>
                        <input type="text" id="jobDescription" className="input-field bg-gray-300 p-2 rounded-2xl ml-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobTag" className="text-black font-medium text-xl">Tag:</label>
                        <input type="text" id="jobTag" className="input-field bg-gray-300 p-2 rounded-2xl ml-2" value={tag} onChange={(e) => setTag(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="jobFile" className="text-black font-medium text-xl">File:</label>
                        <input type="file" id="jobFile" className="input-field bg-gray-300 p-2 rounded-2xl ml-2" onChange={(e) => setVideo(e.target.files[0])} />
                    </div>
                    <button className="px-6 py-2 w-200px mt-4 text-lg text-white bg-blue-500 rounded-lg" onClick={handleApi}>Add</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default AddPost;
