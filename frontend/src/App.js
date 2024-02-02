
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage.jsx'
import './index.js'
import CommunityPage from './pages/CommunityPage.jsx';
import Job from './pages/Job.jsx';
import UserPage from './pages/userPage.jsx';
import AddPost from './components/AddPost.js';
import CompanyPage from './pages/CompanyPage.jsx';
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
     </Routes>
  
    </div>
    </BrowserRouter>
  );
}

export default App;