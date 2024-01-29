import React,{useState,useEffect} from "react"
const ContactInfo = () => {
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
      // Simulating fetch user data
      const fetchData = async () => {
        // Replace with your actual API call
        const data = {
          id: 123,
          name: "abc",
          email: "abc23@example.com",
          github: "abc-github",
          linkedin: "abc-linkedin",
          address: "123 Main St, City",
          phoneno: "123-456-7890",
          discord: "abc-discord"
        };
        setUserData(data);
      };
  
      fetchData();
    }, []);
  
    return (
      <div style={{ width: "900px", margin: "auto", padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Contact Info</h2>
        <div className="flex flex-col gap-2">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h5 className="mb-2 font-semibold pb-4 italic md:not-italic text-xl">User Information</h5>
            <p>
              <span className="text-gray-800 ">User Id:</span> {userData.id}
            </p>
            <p>
              <span className="text-gray-800 ">Name:</span> {userData.name}
            </p>
            <p>
              <span className="text-gray-800 ">Email:</span> {userData.email}
            </p>
          </div>
  
          <div className="bg-gray-100 p-4 rounded shadow">
            <h5 className="mb-2 font-semibold pb-4 italic md:not-italic text-xl">Links</h5>
            <p>
              <span className="text-gray-800 ">Github:</span> {userData.github}
            </p>
            <p>
              <span className="text-gray-800 ">LinkedIn:</span> {userData.linkedin}
            </p>
            <p>
              <span className="text-gray-800 ">Discord:</span> {userData.discord}
            </p>
          </div>
  
          <div className="bg-gray-100 p-4 rounded shadow">
            <h5 className="mb-2 font-semibold pb-4 italic md:not-italic text-xl">Address</h5>
            <p>{userData.address}</p>
            <p>
              <span className="text-gray-800 ">Phone No:</span> {userData.phoneno}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactInfo;
  