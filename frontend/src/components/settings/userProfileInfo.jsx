import React, { useState, useEffect } from "react";
import { useTheme } from '../../Context/ThemeContext'; 

import axios from 'axios'
import { Button, Container, Input } from "@chakra-ui/react";
import InputDetails from './Helper-Modals/InputDetails.js'
import SkillItem from "./Helper-Modals/SkillItem.js";
import EducationItem from "./Helper-Modals/EducationItem.js";

const UserProfileInfo = () => {
  const {theme} = useTheme();
  
  const userId=localStorage.getItem('userId')
  console.log(userId)
  const profileDataApi = `http://localhost:5000/api/user/profile/${userId}`;

 



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

  
  const[userData,setUserData]=useState(true);

  const [UserInformation,setUserInformation]=useState({
    education:[],
    skills:[]
  })

  const handleDeleteSkill = (index) => {
      setUserInformation((prevInfo) => {
          const updatedSkills = [...prevInfo.skills];
          updatedSkills.splice(index, 1);
          return { ...prevInfo, skills: updatedSkills };
      });
  };

  const handleEditSkill = (index, newName, newProficiency) => {
      setUserInformation((prevInfo) => {
          const updatedSkills = [...prevInfo.skills];
          updatedSkills[index] = { name: newName, proficiency: newProficiency };
          return { ...prevInfo, skills: updatedSkills };
      });
  };

  const handleDeleteEducationItem = (index) => {
    setUserInformation((prevInfo) => {
      const updatedEducation = [...prevInfo.education];
      updatedEducation.splice(index, 1);
      return { ...prevInfo, education: updatedEducation };
    });
  };

  const handleEditEducationItem = (index, newData) => {
    setUserInformation((prevInfo) => {
      const updatedEducation = [...prevInfo.education];
      updatedEducation[index] = newData;
      return { ...prevInfo, education: updatedEducation };
    });
  };

  

  useEffect(()=>{
    axios.get(profileDataApi)
    .then((response)=>{
      const {username,email,contact}=response.data 
      setprofile({username,email,contact})
    })
  },[userId,profileDataApi])


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
            <span className="font-light">Name:</span> {profile.username}
          </p>
          <p>
            <span className="font-light ">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-light ">Contact info:</span> {profile.contact}
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

        <div className="bg-gray-100 p-4 rounded shadow flex flex-col w-full gap-4"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
          border:theme== "dark" ? ' 1px solid #fff': '',
        }}
        >
        <div className="w-full"><h5 className="font-semibold mt-1 italic md:not-italic">Education</h5></div>
        <div className="w-full min-h-fit p-2 flex flex-col justify-center items-start gap-2">
        { UserInformation.education.length>0 && UserInformation.education.map((education, index) => (
              <EducationItem
                key={index}
                data={education}
                index={index}
                deleteEducationItem={handleDeleteEducationItem}
                editEducationItem={handleEditEducationItem}
              />
            ))}
          </div>
          <div className="w-full">
              <InputDetails
              title="Add Your Educational Details"
              btnAdd="Add Doc"
              PlaceHolder="Enter your educational Info"
              label="Information could Be School / College / etc"
              purpose="education"
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
