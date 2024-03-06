
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage.jsx'
import './index.js'
import CommunityPage from './pages/CommunityPage.jsx';
import Job from './pages/Job.jsx';
import UserPage from './pages/userPage.jsx';
import AddPost from './components/community/AddPost.js';
import CompanyPage from './pages/CompanyPage.jsx';
import JobBasics from './pages/JobBasics.jsx';
import JobPost from './pages/Job_post.jsx';
import SalaryPage from './pages/SalaryPage.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';
function App() {
 
  return (
    <BrowserRouter>
    <div className="App w-screen">
      <Routes>
     <Route path="/" element={<LandingPage />} />
     <Route path="/community" element={<CommunityPage/>}/>
     <Route path="/jobs" element={<Job/>}/>
     <Route path="/profile" element={<UserPage/>}/>
     <Route path="/add-post" element={<AddPost/>}/>
     <Route path="/companies" element={<CompanyPage/>}/>
     <Route path="/job-basics" element={<JobBasics/>}/>
     <Route path="/job-post" element={<JobPost/>}/>
     <Route path="/salaries" element={<SalaryPage/>}></Route>
     <Route path="/verify-email" element={<VerifyEmail/>}></Route>
     <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
     <Route path="update-password/:id" element={<UpdatePassword/>}></Route>
     </Routes>
  
    </div>
    </BrowserRouter>
  );
}

export default App;