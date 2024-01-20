
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage.jsx'
import './index.js'
import CommunityPage from './pages/CommunityPage.jsx';
import JobPage from './pages/JobPage.jsx';
function App() {
 
  return (
    <BrowserRouter>
    <div className="App w-screen">
      <Routes>
     <Route path="/" element={<LandingPage />} />
     <Route path="/community" element={<CommunityPage/>}/>
     <Route path="/job" element={<JobPage/>}/>
     </Routes>
  
    </div>
    </BrowserRouter>
  );
}

export default App;