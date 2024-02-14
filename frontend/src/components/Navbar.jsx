import React, { useState } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


function Navbar() {
  const navigate = useNavigate();

  const [open,setOpen]=useState(false)

  const [modalShowlogin, setModalShowlogin] = useState(false);
  const [modalShowSignup,setModalShowSignup]=useState(false)
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  }

  return (
    <div className='bg-slate-600 w-screen overflow-x-hidden'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 w-full'>

        <div className='w-full flex items-center justify-between gap-2 h-16 sm:justify-evenly md:justify-between'>
            <div className='flex items-center text-white'>
            
                Navbar 
              
            </div>
            {/* nav links*/}

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 text-white">
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/">Home</Link></div>
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/community">Community</Link></div>
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/job-post">Job-post</Link></div>
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/jobs">Jobs</Link></div>
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/salaries">Salaries</Link></div>
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/companies">Companies</Link></div>
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/connections">Connections</Link></div>
                <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link style={{ textDecoration: 'none', color: 'inherit' }}  to="/profile">Profile</Link></div>

                
                <SignupForm show={modalShowSignup} onHide={()=>setModalShowSignup(false)}  />
                {!localStorage.getItem('token') ?  <div className='flex flex-row justify-evenly items-center gap-4 p-2 w-fit '>
                <button className='w-20 p-1 h-10 bg-gray-300 rounded-[40px] flex justify-center items-center text-red-500' onClick={()=>setModalShowlogin(true)}> 
                  Login
                </button>
                <LoginForm show={modalShowlogin} onHide={()=>setModalShowlogin(false)}/>

                <button className="w-20 p-1 h-10 bg-gradient-to-b from-lime-300 via-green-700 to-lime-300 rounded-[80px] shadow text-red-500" onClick={()=>setModalShowSignup(true)}> 
                 Sign up
                </button>
                    </div>
                    :
                    <div className='flex flex-row '>
                      <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/profile">Profile</Link></div>
                      <div className='text-white cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/add-post">Add Post</Link></div>
                      <button className="w-20 p-1 h-10 bg-gradient-to-b from-lime-300 via-green-700 to-lime-300 rounded-[80px] shadow text-red-500" onClick={handleLogout}> 
                      Logout
                      </button> 
                      
                  </div>
                  }
              </div>
            </div>
            
            

            <div className='-mr-2 flex justify-between md:hidden'>
                 <button onClick={()=>setOpen((open)=>!open)} className='inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                   <span className='sr-only'>
                    Open Main Menu
                    </span>
                    {
                      open===true?<FaTimes className='text-white'/>:<FaBars className='text-white' />
                    }
                
                 </button>
            </div>         
        </div>




      </div>
      {open?(
        <div className='md:hidden justify-evenly'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link to="/">Community</Link></li>
                <li className='text-gray-300 hover:gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'><Link to="/jobs">Jobs</Link></li>
                <li className='text-gray-300 hover:gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'><Link to="/salaries">Salaries</Link></li>
                <li className='text-gray-300 hover:gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'><Link to="companies">Companies</Link></li>
                <li className='text-gray-300 hover:gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'><Link to="connections">Connections</Link></li>
                <li className='text-gray-300 hover:gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'><Link to="/profile">Profile</Link></li>
          </div>

        </div>
      ):null}
    </div>
    
  )
}

export default Navbar
