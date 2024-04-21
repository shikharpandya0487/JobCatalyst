import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTheme } from '../../Context/ThemeContext'; 

const PasswordAndSecurity = () => {
  const {theme} = useTheme();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //security setting from backend
    const fetchUserSecuritySettings = async () => {
      try {
        const response = await fetch("/api/user/security");
        const data = await response.json();
        setTwoFactorAuth(data.twoFactorAuth);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchUserSecuritySettings();
  }, [])

  //function for checking password strength
  const checkPasswordStrength = (password) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[!@$%^&(),.?:{}|<>]/.test(password);
    const isLength = password.length >= 6;
    if (hasCapital && hasSpecial && isLength) {
      return "Strong";
    } else {
      return "Weak";
    }
  };
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);
  //function which enable to change the users password
  const handleChangePassword = async () => {
    try {
      const data = {password,newPassword,confirmPassword};
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
      };
      const url='https://jobcatalyst.onrender.com/api/auth/changepassword';
      const response = await axios({
        method: 'POST', 
        url: url,
        data:data,
        headers: headers,
      })
      console.log(response);
      if (response) {
        navigate("/")
        console.log("Password Changed successfully");
        alert("Password Changed successfully")
      } else {
        console.error("failed to change password");
        alert("failed to change password")
      }
    } catch (error) {
      console.error("Error changing password", error);
    }


  };

  //two factor authentication
  const handleTwoFactorAuth = async () => {
    try {
      const response = await fetch("/api/user/toggle-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enable: !twoFactorAuth }),
      });
      if (response.ok) {
        console.log("Two Factor Authentication updated successfully");
        setTwoFactorAuth(!twoFactorAuth);
      } else {
        console.error("failed to update two Factor authentication");
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const isPasswordMatch = newPassword === confirmPassword
  return (
    <div style={{ 
      width: "900px",
       maxWidth: "1000px",
        margin: "auto",
         padding: "20px",
         backgroundColor: theme === "dark" ? "#333" : "#fff",
         color: theme === "dark" ? "#fff" : "#333",
         border:theme=== "dark" ? ' 1px solid #fff': '',
 
    }}>
      <h4>Password And Security</h4>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "5px"}}>Current Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "13px", borderBlockColor: "gray",border: "1px solid gray" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>New Password:</label>
        <input
          type="password"
          id="newpassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "13px" ,border: "1px solid gray"}}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "13px",border: "1px solid gray" }}
        />
        {!isPasswordMatch && (
          <p className="password-match-error" style={{ color: "red", margin: "5px 0" }}>Passwords do not match.</p>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <button style={{ backgroundColor: isPasswordMatch ? "#3498db" : "#95a5a6", color: "#fff", padding: "8px 7px", border: "none", borderRadius: "5px", fontSize: "13px", cursor: isPasswordMatch ? "pointer" : "not-allowed" }}
          onClick={handleChangePassword} disabled={!isPasswordMatch}>Change Password</button>
      </div>
      <div>
        <h6>Password Strength: {passwordStrength}</h6>
      </div>

      <div style={{ marginBottom: "15px", marginTop: "15px" }}>
        <label>
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={handleTwoFactorAuth}
            style={{ fontsize: "25px" }}
          />
          Enable Two-Factor Authentication
        </label>
      </div>
    </div>
  )

}
export default PasswordAndSecurity;