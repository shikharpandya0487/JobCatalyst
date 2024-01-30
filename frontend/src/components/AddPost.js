import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPost = () => {
    const navigate = useNavigate();
    
    const [company,setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [position,setPosition] = useState("");
    const [location,setLocation] = useState("");
    const [jobtype,setJobtype] = useState("");
    const [salary ,setSalary] = useState("");
    const [description,setDescription] = useState("");
    const [tag,setTag] = useState("");


    //ADDING POST 
    const handleApi = (e) =>{
        e.preventDefault();
        const data = { company,title,position,location,jobtype,salary,description,tag };
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ localStorage.getItem('token'),
        };
        const url='http://localhost:5000/api/post/create-post';
        axios({
          method: 'post', 
          url: url,
          data:data,
          headers: headers,
        })
        .then((res) =>{
            navigate('/community');
            
        }).catch((err)=>{
             console.log(err);
        })
    }

  return (

    <div>
      <div>
        <form action="" onSubmit={handleApi}>
            <h2>Add Post</h2>
            <input type="text" placeholder='Company Name' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            <input type="text" placeholder='Title'  value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" placeholder='Position'  value={position} onChange={(e)=>{setPosition(e.target.value)}}/>
            <input type="text" placeholder='Job location'  value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
            <input type="text" placeholder='Job type'  value={jobtype} onChange={(e)=>{setJobtype(e.target.value)}}/>
            <input type="text" placeholder='Salary'  value={salary} onChange={(e)=>{setSalary(e.target.value)}}/>
            <input type="text" placeholder='Description'  value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <input type="text" placeholder='Tag' value={tag} onChange={(e)=>{setTag(e.target.value)}}/>
            <button>add</button>
        </form>
        
      </div>
    </div>
  )
}

export default AddPost
