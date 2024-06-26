import React,{useState} from "react";
import UserProfileInfo from "../../components/settings/userProfileInfo";
import ContactInfo from "../../components/settings/ContactInfo";
import PasswordAndSecurity from "../../components/settings/Password&Security";
import NotificationandSetting from "../../components/settings/NotificationandSetting";
import ResumeSetting from "../../components/resume/Form"
import JobRecord from "../../components/settings/JobRecord";
import MyPost from "../../components/settings/myPost";
import {useTheme} from '../../Context/ThemeContext'
import { ChatState } from "../../UserContext";
import Jobapplications from "../../components/settings/Jobapplications";
const UserSettings = () => {
  const {user}=ChatState()
    const {theme} = useTheme();
    const [showUserProfile,setShowUserProfile] = useState(true);
    const [showContactInfo,setShowContactInfo] = useState(false);  
    const isadmin=user?.isAdmin;
    const [showSetting,setShowSetting] = useState(false);
    const [showNotification,setShowNotification] = useState(false);
    const [showResume,setShowResume] = useState(false);
    const [showRecord,setShowRecord] = useState(false);
    const [showmyPost,setshowMyPost] = useState(false);
    const [showJobApp,setShowJobApp]=useState(false)
    const showMyProfile = () => {
        setShowUserProfile(true);
        setShowContactInfo(false);
        setShowSetting(false);
        setShowNotification(false);
        setShowResume(false);
        setShowRecord(false);
        setShowJobApp(false)
        setshowMyPost(false);
    }
    const showContactInformation = () => {
        setShowUserProfile(false);
        setShowContactInfo(true);
        setShowJobApp(false)
        setShowSetting(false);
        setShowNotification(false);
        setShowResume(false);
        setShowRecord(false);
        setshowMyPost(false);
    }
   
    const showMyTeamSetting = () => {
        setShowUserProfile(false);
        setShowContactInfo(false);
       
        setShowSetting(true);
        setShowNotification(false);
        setShowResume(false);
        setShowRecord(false);
        setshowMyPost(false);
        setShowJobApp(false)
    }
    const showNotificationmethod = () => {
        setShowUserProfile(false);
        setShowContactInfo(false);
        setShowJobApp(false)
        setShowSetting(false);
        setShowNotification(true);
        setShowResume(false);
        setShowRecord(false);
        setshowMyPost(false);
        setShowJobApp(false)

    }
    const showResumemethod = () => {
      setShowUserProfile(false);
      setShowContactInfo(false);

      setShowSetting(false);
      setShowNotification(false);
      setShowResume(true);
      setShowRecord(false);
      setshowMyPost(false);
      setShowJobApp(false)

  }
    const showRecordMethod = () => {
    setShowUserProfile(false);
    setShowContactInfo(false);

    setShowSetting(false);
    setShowNotification(false);
    setShowResume(false);
    setShowRecord(true);
    setshowMyPost(false);
    setShowJobApp(false)

  }
  const showmyPostMethod = () => {
    setShowUserProfile(false);
    setShowContactInfo(false);
    
    setShowSetting(false);
    setShowNotification(false);
    setShowResume(false);
    setShowRecord(false);
    setshowMyPost(true);
    setShowJobApp(false)

  }

  const showJobAppMeth=()=>{
    setShowUserProfile(false);
    setShowContactInfo(false);
    setShowJobApp(true)
    setShowSetting(false);
    setShowNotification(false);
    setShowResume(false);
    setShowRecord(false);
    setshowMyPost(false);
  }
  const onCloseJobRecord = () => {
    setShowRecord(false);
  }




  return (
    <section className="flex flex-col items-start justify-start py-4 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32 min-h-fit"
    style={{
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#333",
    }}
    >
      <h1 className={`text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-6 pl-4 ${theme === 'dark' ? 'text-white':'text-black'}`}>
        Settings
      </h1>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Left section with User Settings, Payment Settings, and Accounting Settings */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-col md:flex-col gap-2">
            <div className="w-full md:w-2/3">
              {/* User Settings */}
              <div className="px-3 rounded-md">
                <h3 className="text-2xl font-medium">User Settings</h3>
                <div className="flex flex-col">
                  <div className="flex gap-1 items-center min-h-fit">
                    <div
                      style={{ width: "3px" ,height: '30px',backgroundColor:'grey' }}
                      className={`mr-3 mb-2 bg-gray-700 h-full ${showUserProfile ? 'border-green-700' : ''}`}
                      ></div>
                   
                    <p className="text-lg font-normal cursor-pointer hover:text-green-600 transition-all" onClick={showMyProfile}>
                      My Profile
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div
                      style={{ width: "3px" ,height: '30px',backgroundColor:'grey'}}
                      className={`mr-3 mb-2 bg-gray-700 h-full ${showContactInfo ? 'border-green-700' : ''}`}
                      ></div>
                    
                    <p className="text-lg font-normal cursor-pointer hover:text-green-600 transition-all" onClick={showContactInformation}>
                      Contact info
                    </p>
                  </div>
                 
                  <div className="flex gap-1 items-center">
                    <div
                      style={{ width: "3px" ,height: '50px',backgroundColor:'grey'}}
                      className={`mr-3 mb-2 bg-gray-700 h-full ${showSetting ? 'border-green-700' : ''}`}
                      ></div>
                    
                    <p className="text-lg cursor-pointer font-normal hover:text-green-600 transition-all" onClick={showMyTeamSetting}>
                      Password & Security
                    </p>
                  </div>
                { isadmin? <div></div>:<div className="flex gap-1 items-center pt-2">
                    <div
                      style={{ width: "3px",height: '30px' ,backgroundColor:'grey' }}
                      className={`mr-3 mb-2 bg-gray-700 h-full ${showRecord ? 'border-green-700' : ''}`}
                      ></div>
                    <p className="text-lg cursor-pointer font-normal hover:text-green-600 transition-all text-center" onClick={showRecordMethod}>
                      Job Record
                    </p>
                  </div>}
                 {isadmin?<div></div>:<div className="flex gap-1 items-center">
                    <div
                      style={{ width: "3px" ,height:'30px',backgroundColor:'grey'}}
                      className="mr-3 mb-2 bg-gray-700 h-full"
                    ></div>
                    <p className="text-lg cursor-pointer font-normal hover:text-green-600 transition-all"  onClick={showResumemethod}>
                      Resume
                    </p>
                  </div>}
                  <div className="flex gap-1 items-center">
                    <div
                      style={{ width: "3px" ,height:'50px',backgroundColor:'grey' }}
                      className= {`mr-3 mb-2 bg-gray-700 h-full ${showNotificationmethod? 'border-green-700' : ''}`}
                      ></div>                   
                    <p className="text-lg font-normal cursor-pointer hover:text-green-700 transition-all" onClick={showNotificationmethod}>
                      Notification Settings
                    </p>
                  </div>

                  <div className="flex gap-1 w-full items-center">
                    <div
                      style={{ width: "3px" ,height:'50px',backgroundColor:'grey' }}
                      className= {`mr-3 mb-2 bg-gray-700 w-full h-full ${showmyPost? 'border-green-700' : ''}`}
                      ></div>                   
                    <p className="text-lg font-normal cursor-pointer hover:text-green-700 transition-all" onClick={showmyPostMethod}>
                     My Post
                    </p>
                  </div>

                  <div className="flex gap-1 w-full items-center">
                    <div
                      style={{ width: "3px" ,height:'50px',backgroundColor:'grey' }}
                      className= {`mr-3 mb-2 bg-gray-700 w-full h-full ${showJobApp? 'border-green-700' : ''}`}
                      ></div>                   
                    <p className="text-lg font-normal cursor-pointer hover:text-green-700 transition-all" onClick={showJobAppMeth}>
                     Job Applications
                    </p>
                  </div>

                </div>
              </div>
            </div>
            
            
          </div>
        </div>
        {/* Right section with user details */}
        <div className="flex flex-col gap-2 min-h-fit "
           
        >
          <div className={`w-full ml-20 md:ml-4 ${showUserProfile ? "border-2 border-slate-600 rounded-2xl"  : ""}`}
          
          >
            {showUserProfile && (
              <div className="bg-gray-100 p-4 rounded-2xl w-full">
                <UserProfileInfo />
              </div>
            )}
          </div>
          <div className={`w-[700px] ml-20 md:ml-4 ${showContactInfo ? "border-2 border-slate-600 rounded-2xl" : ""}`}>
            {showContactInfo && (
              <div className="bg-gray-100 p-4 rounded-2xl w-full">
                <ContactInfo />
              </div>
            )}
          </div>
        

        <div className={`w-full ml-20 md:ml-4 ${showSetting ? "border-2 border-slate-600 rounded-2xl" : ""}`}>
          {showSetting && (
            <div className="bg-gray-100 p-4 rounded-2xl w-full">
              <PasswordAndSecurity />
            </div>
          )}
        </div>

        <div className={`w-full ml-20 md:ml-4 ${showResume ? "border-2 border-slate-600 rounded-2xl" : ""}`}>
          {showResume && (
            <div >
              <ResumeSetting />
            </div>
          )}
        </div>

        <div className={`w-full ml-20 md:ml-4 ${showNotification ? "border-2 border-slate-600 rounded-2xl" : ""}`}>
          {showNotification && (
            <div className="bg-gray-100 p-4 rounded-2xl w-full">
              <NotificationandSetting />
            </div>
          )}
        </div>

        <div className={`w-full ml-20 md:ml-4 ${showRecord ? "border-2 border-slate-600 rounded-2xl" : ""}`}>
          {showRecord && (
            <div className="bg-gray-100 p-4 rounded-2xl w-full">
              <JobRecord onClose = {onCloseJobRecord} />
            </div>
          )}
        </div>
        <div className={`w-full ml-20 md:ml-4 ${showmyPost ? "border-2 border-slate-600 rounded-2xl" : ""}`}>
          {showmyPost && (
            <div className="bg-gray-100 p-4 rounded-2xl w-full">
              <MyPost />
            </div>
          )}
        </div>
          <div className={`w-full ml-20 md:ml-4 ${showJobApp ? "border-2 border-slate-600 rounded-2xl" : ""}`}>
            {showJobApp && (
              <div className=" bg-slate-200 p-4 rounded-2xl w-full">
                <Jobapplications />
              </div>
            )}
          </div>
        </div>
        
     </div>   
    </section>
  );
};

export default UserSettings;
