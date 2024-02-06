import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();
export const AuthProvider=({children})=>{

    //for the logout i will be storing the tocken stored in local storage into our useState
    const[token,setTocken]=useState(localStorage.getItem("token"));
    const [user,setUser]=useState("");


   
    const storetockenInLS = (serverToken) => {
        setTocken(serverToken); // Update the state with the token
        return localStorage.setItem("token", serverToken); // Use the correct name "token"
      };
    //till here content of context api;


    //defining the function to extract the data from the backend after the jwt tocken verification code in the backend
    //Authentication->to get the currently logged user data
    const userAuthentication=async()=>{
        try{
            const response=await fetch("http://localhost:5000/api/auth/user",{
            method: "GET", //a single missing space could get you fucked up
            headers: {
                Authorization: `Bearer ${token.trim()}`,
            },

            });
            if(response.ok){
                const data=await response.json();
                //ab ye fetched data ko ek state varibale mein daalna padega,
                //so that frontend mein show kar saken
                console.log("User data");
                setUser(data.userData);
                //ab user ke ander hmara data hoga
            }
        }
        catch(error){
            console.log("Error fetching user data");
        }
    }

    //useEffect mein wo chijen chahiye jo page load hone se phele hi show ho jaye
    useEffect(()=>{
        userAuthentication();
    },[]); //sirf first time hi chalega


    return(
     <AuthContext.Provider value={{storetockenInLS,user}}> 
    {/* DON't forget to wrap the whole app  */}
    {/* jo function mein value={} ke ander mention karunga wo koi bhi page access kar sakhta hai  */}
    {/* now due to this you will be required to wrap the App inside main.jsx 
    iski help se jo bhi data function hm likhenge wo globally accessible ho jayega*/}
        {children}
    </AuthContext.Provider>
    );
};

//creating the custom hook
//start with use
export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}
//ab useAuth ke ander sara data a gya hai