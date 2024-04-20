import React, { useState, useEffect } from "react";
import { useTheme } from '../../Context/ThemeContext'; 

import axios from 'axios'
import { Button, Container, Input } from "@chakra-ui/react";
import InputDetails from './Helper-Modals/InputDetails.js'
import SkillItem from "./Helper-Modals/SkillItem.js";
import { ChatState } from "../../UserContext.js";


const UserProfileInfo = () => {
  const {theme} = useTheme();
  
  const userId=localStorage.getItem('userId')
  // console.log(userId)
  const profileDataApi = `https://jobcatalyst.onrender.com/api/user/profile/${userId}`;

  const {user}=ChatState()



  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const[profile,setprofile]=useState({
    username:"",
    email:"",
    contact:"",
  });


  const [UserInformation,setUserInformation]=useState({
    skills:[]
  })

  const handleDeleteSkill =async (id,index) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
     const response=await axios.delete(`https://jobcatalyst.onrender.com/api/user/delete-skill/${id}`,config)
     console.log(response.data.skills)

     const skills=response.data.skills.map(skill=>({
      ...skill,
      skillId:skill._id
     }))
     console.log(skills)
     user.skills=skills

      setUserInformation((prevInfo) => {
          
          return { ...prevInfo, skills: skills };
      });
      console.log("Accessing skills after deleting ",user.skills)
    } catch (error) {
      console.log(error)
    }
      
  };
  

  const handleEditSkill = async(id,index, newName, newProficiency) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const editSkill={
        name:newName,
        proficiency:newProficiency
      }
     const response=await axios.put(`https://jobcatalyst.onrender.com/api/user/edit-skill/${id}`,{
      skill:editSkill
     },config)

     if(!response)
     {
      console.log("resolve the editing of skill")
     }

     const skills=response.data.skills 
     
    console.log("Data from backend ",skills)

     setUserInformation(() => ({
          skills:[...skills]
     }));
     console.log("Accessing skills after editing ",user.skills);

    } 
    catch(error)
    {
      console.log("Error in the editing of skill",error)
    }
      
  };



  

  useEffect(() => {
    axios.get(profileDataApi)
        .then((response) => {
            const { username, email, contact, skills } = response.data;
            // const updatedSkills = skills.map(skill => ({
            //     name: skill.name,
            //     proficiency: skill.proficiency,
            //     skillId: skill.skillId
            // }));
            setprofile({ username, email, contact });
          
        })
}, [userId, profileDataApi]);
console.log(user);

useEffect(() => {
  const accessSkills=async()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
     const response=await axios.get(`https://jobcatalyst.onrender.com/api/user/get-skills`,config)
     console.log(response.data)
     const skills = response.data.skills.map(skill => ({
      ...skill,
      skillId: skill._id
    }));
    console.log(skills);
     user.skills=skills
     setUserInformation(() => ({
      skills: [...user.skills]
    }));
    console.log("Accessing skills ",user.skills)
    
    } catch (error) {
      console.log("Error while accessing the skills",error)
    }
  }

  accessSkills()
     
}, [user]);



  return (
    <div 
    style={{ 
    width: "900px",
    margin: "auto", 
    padding: "20px",
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#333",
     }}>
      <h2 style={{ marginBottom: "20px" }}>My Profile</h2>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-100 p-4 rounded shadow"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
          border:theme== "dark" ? ' 1px solid #fff': '',
        }}
        >
          <h5 className="mb-2 font-semibold pb-4 italic md:not-italic">User Information</h5>
          <p>
            <span className=" font-semibold">Name:</span> {  profile.username}
          </p>
          <p>
            <span className=" font-semibold">Email:</span> {  profile.email}
          </p>
          <p>
            <span className="font-semibold ">Contact info:</span> {  profile.contact}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow flex flex-col w-full gap-4"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
          border:theme== "dark" ? ' 1px solid #fff': '',
        }}
        >
          <div className="w-full"><h5 className="font-semibold mt-1 italic md:not-italic">Skills</h5></div>
          <div className="w-full min-h-fit p-2 flex flex-col justify-center items-start gap-2">
           {  UserInformation.skills.length>0 && UserInformation.skills.map((skill, index) => (
              <SkillItem
                  className="w-full p-1"
                   key={index} 
                   skill={skill}
                  index={index}
                   id={skill.skillId}
                   deleteSkill={handleDeleteSkill}
                 editSkill={handleEditSkill}
               />
             ))}
           </div>

          
          <div className="w-full min-h-fit">
              <InputDetails
              title="Add Your Skills"
              btnAdd="Add Doc"
              PlaceHolder="Enter your Skills Info"
              label="Skills could Be Technical etc"
              purpose="skills"
              UserInformation={UserInformation}
              setUserInformation={setUserInformation}
              />
          </div>
        </div>


        <div className="rounded-lg flex flex-col justify-center items-center bg-orange-200 p-2 w-full">
          <h3 className="font-semibold">
            Add Your Educational certificates here
          </h3>
          <div className="w-full">
              <Input
              type="file"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .pdf"
              />
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfileInfo;
