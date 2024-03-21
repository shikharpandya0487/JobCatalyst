import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
   axios.get('/profile-msg')
      .then(response => {
        console.log("profile response",response);
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('LoggedIn',true)
        // console.log(localStorage.getItem('LoggedIn'))
        setId(response.data.userData.id);
        setUsername(response.data.userData.username);
        
      })
      .catch(error => {
        console.log("Error fetching user data: from profile-msg", error);
      })
      .finally(() => {
        setLoading(false);
        console.log(id,username)
      });
 
  }, []);
  

  if (loading) {
    //  a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
