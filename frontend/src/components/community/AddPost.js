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
    const [viedo,setViedo] = useState([]);
    const handleApi = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("file",viedo); 
        formData.append("company",company);
        formData.append("title",title);
        formData.append("position",position);
        formData.append("location",location);
        formData.append("jobtype",jobtype);
        formData.append("salary",salary);
        formData.append("description",description);
        formData.append("tag",tag);

        const headers = {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer '+ localStorage.getItem('token'),
        };
        const url='http://localhost:5000/api/post/create-post';
        axios({
          method: 'post', 
          url: url,
          data:formData,
          headers: headers,
        })
        .then((res) =>{
          console.log(res.data);
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
            <input type="file" placeholder='file' onChange={(e)=>{setViedo(e.target.files[0])}}/>
            <button>add</button>
        </form>
        
      </div>
    </div>
  )
}

export default AddPost
