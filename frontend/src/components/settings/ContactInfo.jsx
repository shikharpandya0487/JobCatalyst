import { Container, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../Context/ThemeContext";
import axios from "axios";
import { ChatState } from "../../UserContext";

const ContactInfo = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({});
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [discord, setDiscord] = useState("");
  const [editModeGithub, setEditModeGithub] = useState(false); 
  const [editModeLinkedin, setEditModeLinkedin] = useState(false); 
  const [editModeDiscord, setEditModeDiscord] = useState(false);
  const [gitId,setGitId]=useState("")
  const [linkedInId,setlinkInId]=useState("")
  const [googleDriveId,setGoogleDriveId]=useState("")
  const [linkName,setLinkName]=useState({
    name:"",
    url:"",
    id:""
  })
  const [deleteName,setDeleteName]=useState("")
  const { user,userId} = ChatState();
 console.log("contact info log ",user);
  const handleSave = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(linkName.name)
      const response = await axios.post(
        `http://localhost:5000/api/user/add-link/${linkName.name}`,
        {
          name: `${linkName.name}`,
          url: `${linkName.url}`,
        },
        config
      );

      console.log("Response from backend:", response.data);
      const k=response.data.id
      if(linkName.name==="github")
      {
        setGithub(linkName.url)
        setGitId(k)
        setEditModeGithub(false);
      }
      else if(linkName.name==="linkedIn")
      {
        setLinkedin(linkName.url)
        setlinkInId(k)
        setEditModeLinkedin(false)
      }
      else
      {
        setDiscord(linkName.url)
        setGoogleDriveId(k)
        setEditModeDiscord(false)
      }
        
    
    } catch (error) {
      console.log("Error while saving link:", error);
    }
  };

  const handleDelete=async ()=>{
    try {
      console.log("Deleting a link from ",user)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(deleteName)
     
      const response =await axios.post(`http://localhost:5000/api/user/delete-link/${deleteName}`,config)
    
 
      if(!response)
      {
        console.log("error")
      }
      
      console.log("data from backend",response)

      if(linkName.name==="github")
      {
        setGithub("")
        setEditModeGithub(true);
      }
      else if(linkName.name==="linkedIn")
      {
        setLinkedin("")
        setEditModeLinkedin(true)
      }
      else
      {
        setDiscord("")
        setEditModeDiscord(true)
      }
     
      
    } catch (error) {
      console.log("Error while deleting the  link:", error);
    }
  }

  const handleDeleteClick = (name) => {
    setDeleteName(name);
    handleDelete();
  };
  

  const handleEditGithub = (e) => {
    setLinkName({name:"github",url:e.target.value});
    setEditModeGithub(true);
  };

  const handleEditLinkedin = (e) => {
    setLinkName({name:"linkedIn",url:e.target.value})
    setEditModeLinkedin(true);
  };

  const handleEditDiscord = (e) => {
    setLinkName({name:"googleDrive",url:e.target.value})
    setEditModeDiscord(true);
  };

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
    setLinkName({name:"github",url:e.target.value});
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
    setLinkName({name:"linkedIn",url:e.target.value})
  };

  const handleDiscordChange = (e) => {
    setDiscord(e.target.value);
    setLinkName({name:"googleDrive",url:e.target.value})
  };

  useEffect(
    ()=>{
      const accessLinks=async()=>{
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
      
          const response=await axios.get("http://localhost:5000/api/user/access-link",config)
          // console.log(response)
          const links=response.data.links 
          console.log(links)
          setGithub(links.github.url)
          setLinkedin(links.linkedIn.url)
          setDiscord(links.googleDrive.url)
          
        } catch (error) {
          console.log(error)
        }
      }
      accessLinks()
    },[user]
  )

  return (
    <div
      style={{
        margin: "auto",
        padding: "20px",
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
      className="w-full"
    >
      <h2 style={{ marginBottom: "20px" }}>My Useful Links</h2>
      <div className="flex flex-col gap-2 w-full">
        <Container
          className="bg-gray-100 p-4 rounded shadow flex flex-col gap-3 justify-center items-start"
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
            border: theme === "dark" ? " 1px solid #fff" : "",
          }}
        >
          <h4 className="mb-2 font-semibold pb-4 italic md:not-italic text-xl">
            Links
          </h4>
          <FormControl className="flex  justify-between items-center gap-2">
            <FormLabel>Github:</FormLabel>
            <Input
              value={github}
              onChange={handleGithubChange}
              placeholder="Enter Github link"
              disabled={!editModeGithub}
            />
            {!editModeGithub ? (
              <Button onClick={handleEditGithub}>Edit</Button>
            ) : (
              <Button onClick={handleSave}>Save</Button>
            )}
           <Button onClick={() => handleDeleteClick("github")}>Delete</Button>

          </FormControl>
          <FormControl className="flex  justify-between items-center gap-2">
            <FormLabel>LinkedIn:</FormLabel>
            <Input
              value={linkedin}
              onChange={handleLinkedinChange}
              placeholder="Enter LinkedIn link"
              disabled={!editModeLinkedin}
            />
            {!editModeLinkedin ? (
              <Button onClick={handleEditLinkedin}>Edit</Button>
            ) : (
              <Button onClick={handleSave}>Save</Button>
            )}
            <Button onClick={() => handleDeleteClick("linkedIn")}>Delete</Button>
          </FormControl>
          <FormControl className="flex  justify-between items-center gap-2">
            <FormLabel>Google Drive:</FormLabel>
            <Input
              value={discord}
              onChange={handleDiscordChange}
              placeholder="Enter googleDrive link"
              disabled={!editModeDiscord}
              isRequired
            />
            {!editModeDiscord ? (
              <Button onClick={handleEditDiscord}>Edit</Button>
            ) : (
              <Button onClick={handleSave}>Save</Button>
            )}
            <Button onClick={(e) => handleDeleteClick("googleDrive")}>Delete</Button>
          </FormControl>
        </Container>
      </div>
    </div>
  );
};

export default ContactInfo;
