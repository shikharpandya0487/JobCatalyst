import React, { useState, useEffect } from "react";
import { useTheme } from '../../Context/ThemeContext';
import axios from 'axios';
import { Input, Spinner, Button, Center, Box, useToast } from "@chakra-ui/react";
import InputDetails from './Helper-Modals/InputDetails.js';
import SkillItem from "./Helper-Modals/SkillItem.js";
import { ChatState } from "../../UserContext.js";

const UserProfileInfo = () => {
  const { theme } = useTheme();
  const userId = localStorage.getItem('userId');
  const profileDataApi = `https://jobcatalyst.onrender.com/api/user/profile/${userId}`;
  const { user } = ChatState();
  const toast = useToast();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    contact: "",
  });

  const [userInformation, setUserInformation] = useState({
    skills: [],
  });

  const [skillsLoading, setSkillsLoading] = useState(true);
  const [addingSkill, setAddingSkill] = useState(false);
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    cv: null,
  });
  const [certificate, setCertificate] = useState("");

  const handleDeleteSkill = async (id, index) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.delete(`https://jobcatalyst.onrender.com/api/user/delete-skill/${id}`, config);
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
      const response = await axios.put(`https://jobcatalyst.onrender.com/api/user/edit-skill/${id}`, { skill: editSkill }, config);

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
  }, [userId]);

  useEffect(() => {
    const accessSkills = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`https://jobcatalyst.onrender.com/api/user/get-skills`, config);
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
  }, [user.token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCertificate = async () => {
    if (formData.cv) {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.cv);

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + user.token,
      };

      const url = 'https://jobcatalyst.onrender.com/api/user/add-certificate';

      try {
        const response = await axios.post(url, formDataToSend, { headers });
        console.log(response);
        setUpload(!upload);
        toast({
          title: "Certificate uploaded successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error in add certificate', error);
        toast({
          title: "Error uploading certificate.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      const url = `https://jobcatalyst.onrender.com/api/user/get-certificate/${userId}`;
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + user.token,
      };

      try {
        const response = await axios.get(url, { headers });
        if (response.data.certificates && response.data.certificates.length > 0) {
          setCertificate(response.data.certificates[0].url); // Assuming there's at least one certificate
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error fetching certificate.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchCertificate();
  }, [upload]);

  const handlePdf = (pdf) => {
    window.open(`https://jobcatalyst.onrender.com/uploads/${pdf}`);
  };

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
              id="cv"
              name="cv"
              accept=".pdf,.doc,.docx,.jpeg,.png"
              onChange={handleChange}
              required
            />
            <Button onClick={handleCertificate} mt={2}>Upload</Button>
          </div>
          {certificate && (
            <Button onClick={() => handlePdf(certificate)} mt={2}>View Certificate</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
