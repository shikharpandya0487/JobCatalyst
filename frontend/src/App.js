
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import './index.js'
import CommunityPage from './pages/Community/CommunityPage.jsx';
import {useTheme} from './Context/ThemeContext'
import Job from './pages/Job-Related-Pages/Job.jsx';
import UserPage from './pages/user-page/userPage.jsx';
import AddPost from './components/community/AddPost.js';
import EditPost from './components/community/EditPost.jsx';
import CompanyPage from './pages/Company-Page/CompanyPage.jsx';
import JobBasics from './pages/Job-Related-Pages/JobBasics.jsx';
import JobPost from './pages/Job-Related-Pages/Job_post.jsx';
import ApplyJob from './pages/Job-Related-Pages/ApplyJob.jsx';
import SalaryPage from './pages/Salary/SalaryPage.jsx';
import VerifyEmail from './pages/PasswordChanges/VerifyEmail.jsx';
import ForgotPassword from './pages/PasswordChanges/ForgotPassword.jsx';
import UpdatePassword from './pages/PasswordChanges/UpdatePassword.jsx';
import DisplayData from './components/community/DisplayData.jsx'
import axios from 'axios'
import ChatProvider  from './UserContext.js';
import Chats from './components/Chats-ChatsHome/Chats.js';


function App() {
  axios.defaults.baseURL = 'https://jobcatalyst.onrender.com';
  axios.defaults.withCredentials = true;
  //this useTheme hook is access theme state and toggle function
  const {theme,toggleTheme} = useTheme();
  return (
    <BrowserRouter>
      <ChatProvider>
          <div className="App">
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/community" element={<CommunityPage/>}/>
            <Route path="/jobs" element={<Job/>}/>
            <Route path="/profile" element={<UserPage/>}/>
            <Route path="/add-post" element={<AddPost/>}/>
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/companies" element={<CompanyPage/>}/>
            <Route path="/job-basics" element={<JobBasics/>}/>
            <Route path="/job-post" element={<JobPost/>}/>
            <Route path="/applyjob" element={<ApplyJob/>}/>
            <Route path="/salaries" element={<SalaryPage/>}></Route>
            <Route path="/verify-email" element={<VerifyEmail/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/display-data/:id" element={<DisplayData/>}></Route>
            <Route path="update-password/:id" element={<UpdatePassword/>}></Route>
            <Route path='/chats' element={<Chats/>} />
            <Route path='/post' element={<displayPost/>} />
            </Routes>
        
          </div>
         </ChatProvider>
        </BrowserRouter>
  );
}

export default App;