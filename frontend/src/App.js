
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage.jsx'
import './index.js'
import CommunityPage from './pages/CommunityPage.jsx';
import Job from './pages/Job.jsx';
import UserPage from './pages/userPage.jsx';
import AddPost from './components/community/AddPost.js';
import EditPost from './components/community/EditPost.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import JobBasics from './pages/JobBasics.jsx';
import JobPost from './pages/Job_post.jsx';
import SalaryPage from './pages/SalaryPage.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';
import DisplayData from './components/community/DisplayData.jsx'
import axios from 'axios'
import { UserContextProvider } from './UserContext.js';
import Chat from './pages/Chat.jsx'

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
        <BrowserRouter>
          <div className="App w-screen">
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
            <Route path="/salaries" element={<SalaryPage/>}></Route>
            <Route path="/verify-email" element={<VerifyEmail/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/display-data/:id" element={<DisplayData/>}></Route>
            <Route path="update-password/:id" element={<UpdatePassword/>}></Route>
            <Route path='/connections' element={<Chat/>} />
            <Route path='/post' element={<displayPost/>} />
            </Routes>
        
          </div>
        </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;