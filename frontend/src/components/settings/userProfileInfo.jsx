import React, { useState, useEffect } from "react";

import axios from 'axios'

const UserProfileInfo = () => {
  
  const userId=localStorage.getItem('userId')
  console.log(userId)
  const profileDataApi = `http://localhost:5000/api/user/profile/${userId}`;

 



  const[profile,setprofile]=useState({
    username:"",
    email:"",
    contact:"",
  });
  
  const[userData,setUserData]=useState(true);

  useEffect(()=>{
    axios.get(profileDataApi)
    .then((response)=>{
      const {username,email,contact}=response.data 
      setprofile({username,email,contact})
    })
  },[userId,profileDataApi])


  return (
    <div style={{ width: "900px", margin: "auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>My Profile</h2>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
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

        <div className="bg-gray-100 p-4 rounded shadow">
          <h5 className="mb-11 font-semibold mt-1 pb-5 italic md:not-italic">Skills</h5>
          <p>
            {userData.skills}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h5 className="mb-11 font-semibold pb-5 italic md:not-italic">Education</h5>
          <p>
         {userData.study}
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserProfileInfo;
