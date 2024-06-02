import React, { useState, useEffect } from "react";
import { useTheme } from '../../Context/ThemeContext'; 
import axios from 'axios';
import { Input, Spinner, Center } from "@chakra-ui/react";
import InputDetails from './Helper-Modals/InputDetails.js';
import SkillItem from "./Helper-Modals/SkillItem.js";
import { ChatState } from "../../UserContext.js";

const UserProfileInfo = () => {
  const { theme } = useTheme();
  const userId = localStorage.getItem('userId');
  const profileDataApi = `http://localhost:5000/api/user/profile/${userId}`;
  const { user } = ChatState();
  console.log("printing user from skills",user.token)

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    contact: "",
  });

  const [userInformation, setUserInformation] = useState({
    skills: []
  });

  const [skillsLoading, setSkillsLoading] = useState(true);
  const [addingSkill, setAddingSkill] = useState(false);

  const handleDeleteSkill = async (id, index) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.delete(`http://localhost:5000/api/user/delete-skill/${id}`, config);
      const skills = response.data.skills.map(skill => ({
        ...skill,
        skillId: skill._id
      }));
      user.skills = skills;

      setUserInformation((prevInfo) => ({
        ...prevInfo, skills: skills
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSkill = async (id, index, newName, newProficiency) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const editSkill = {
        name: newName,
        proficiency: newProficiency
      };
      const response = await axios.put(`http://localhost:5000/api/user/edit-skill/${id}`, { skill: editSkill }, config);

      if (!response) {
        console.log("resolve the editing of skill");
      }

      const skills = response.data.skills;

      setUserInformation(() => ({
        skills: [...skills]
      }));
    } catch (error) {
      console.log("Error in the editing of skill", error);
    }
  };

  useEffect(() => {
    axios.get(profileDataApi)
      .then((response) => {
        const { username, email, contact } = response.data;
        setProfile({ username, email, contact });
      })
      .catch(error => console.log(error));
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    const accessSkills = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/user/get-skills`, config);
        const skills = response.data.skills.map(skill => ({
          ...skill,
          skillId: skill._id
        }));
        user.skills = skills;
        setUserInformation(() => ({
          skills: [...user.skills]
        }));
      } catch (error) {
        
        console.log("Error while accessing the skills", error);
      } finally {
        setSkillsLoading(false);
      }
    };

    accessSkills();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);


  const handleFileChange=()=>{

  }

  
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
            border: theme === "dark" ? '1px solid #fff' : '',
          }}>
          <h5 className="mb-2 font-semibold pb-4 italic md:not-italic">User Information</h5>
          <p>
            <span className="font-semibold">Name:</span> {profile.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-semibold">Contact info:</span> {profile.contact}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow flex flex-col w-full gap-4"
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
            border: theme === "dark" ? '1px solid #fff' : '',
          }}>
          <div className="w-full">
            <h5 className="font-semibold mt-1 italic md:not-italic">Skills</h5>
          </div>
          <div className="w-full min-h-fit p-2 flex flex-col justify-center items-start gap-2">
            {skillsLoading ? (
              <Center w="full" h="full">
                <Spinner size="xl" />
              </Center>
            ) : (
              userInformation.skills.length > 0 && userInformation.skills.map((skill, index) => (
                <SkillItem
                  className="w-full p-1"
                  key={index}
                  skill={skill}
                  index={index}
                  id={skill.skillId}
                  deleteSkill={handleDeleteSkill}
                  editSkill={handleEditSkill}
                />
              ))
            )}
          </div>

          <div className="w-full min-h-fit">
            <InputDetails
              title="Add Your Skills"
              btnAdd="Add Doc"
              PlaceHolder="Enter your Skills Info"
              label="Skills could Be Technical etc"
              purpose="skills"
              UserInformation={userInformation}
              setUserInformation={setUserInformation}
              setAddingSkill={setAddingSkill} // Pass the setAddingSkill function
            />
            {addingSkill && (
              <Center w="full" h="full" mt={4}>
                <Spinner size="lg" />
              </Center>
            )}
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
