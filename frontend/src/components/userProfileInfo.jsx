import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const UserProfileInfo = () => {
  // const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   //fetch user data here
  //   //fetch call with your actual Api call
  //   fetchUserData()
  //     .then((data) => setUserData(data))
  //     .catch((error) => console.error("error ", error));
  // }, []);
  // // const [userData,setUserData]=useState(true);
  // const {user} =useAuth();
  // if(userData && user){


  // }
  // const fetchUserData = async () => {
  //   //replace with actual api endpoint
  //   const response = await fetch("api-endpoint");
  //   const data = await response.json();
  //   return data;
  // };

  const[profile,setprofile]=useState({
    username:"",
    email:"",
    contact:"",
  });
  const {user}=useAuth();
  const[userData,setUserData]=useState(true);
  if(userData && user){
    setprofile({
      username:user.username,
      email:user.email,
      contact:user.email,
    });
    setUserData(false);
  }


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
