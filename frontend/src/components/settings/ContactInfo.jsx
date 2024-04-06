import { Container, Input, FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../Context/ThemeContext";

const ContactInfo = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({});
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [discord, setDiscord] = useState("");

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
  };

  const handleDiscordChange = (e) => {
    setDiscord(e.target.value);
  };

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
      <h2 style={{ marginBottom: "20px" }}>
        Contact Info
      </h2>
      <div className="flex flex-col gap-2 w-full">
        <Container
          className="bg-gray-100 p-4 rounded shadow"
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
            border:theme== "dark" ? ' 1px solid #fff': '',
          }}
        >
          <h5 className="mb-2 font-semibold pb-4 italic md:not-italic text-xl">
            Links
          </h5>
          <FormControl>
            <FormLabel>Github:</FormLabel>
            <Input
              value={github}
              onChange={handleGithubChange}
              placeholder="Enter Github link"
            />
          </FormControl>
          <FormControl>
            <FormLabel>LinkedIn:</FormLabel>
            <Input
              value={linkedin}
              onChange={handleLinkedinChange}
              placeholder="Enter LinkedIn link"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Google Drive:</FormLabel>
            <Input
              value={discord}
              onChange={handleDiscordChange}
              placeholder="Enter Discord link"
            />
          </FormControl>
        </Container>

        <Container
          className="bg-gray-100 p-4 rounded shadow"
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
            border:theme== "dark" ? ' 1px solid #fff': '',
          }}
        >
          <h5 className="mb-2 font-semibold pb-4 italic md:not-italic text-xl">
            Address
          </h5>
          <p>{userData.address}</p>
          <p>
            <span
              className="text-gray-800 "
              style={{ color: theme === "dark" ? "#fff" : "#333" }}
            >
              Phone No:
            </span>{" "}
            {userData.phoneno}
          </p>
        </Container>
      </div>
    </div>
  );
};

export default ContactInfo;
