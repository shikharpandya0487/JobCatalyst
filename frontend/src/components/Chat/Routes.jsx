import React, { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./UserContext";
import Chat from "./Chat";

export default function Routes() {
  const { username, id } = useContext(UserContext);
 const indicator= localStorage.getItem('LoggedIn')
  // console.log(username,"  ",id," ",indicator);
  if (username || indicator) {
    // console.log("next page");
    return <Chat />;
  }
else{  
  console.log("Not a new page");
   return (
    <div>
      {/* Render your Login component here if needed */}
      <Register />
    </div>
  );
}  
}
