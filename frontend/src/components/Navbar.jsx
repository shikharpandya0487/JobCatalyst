import React, { useState } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


function Navbar() {
  const [open,setOpen]=useState(false)

  const [modalShowlogin, setModalShowlogin] = useState(false);
  const [modalShowSignup,setModalShowSignup]=useState(false)
  
  

  console.log(open);
  return (
    <div className='bg-slate-600 w-screen overflow-x-hidden'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 w-full'>

        <div className='flex items-center justify-evenly h-16 sm:justify-between md:justify-between'>
            <div className='flex items-center text-white'>
            
                Navbar 
              
            </div>
            {/* nav links*/}

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 text-white">
                <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link className='' style={{ textDecoration: 'none', color: 'inherit' }}  to="/">Home</Link></li>
                <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link to="/community">Community</Link></li>
                <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link to="/jobs">Jobs</Link></li>
                <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link to="/salaries">Salaries</Link></li>
                <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link to="/companies">Companies</Link></li>
                <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link to="/connections">Connections</Link></li>
                <li className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'><Link to="/profile">Profile</Link></li>

                <button className='w-20 p-1 h-10 bg-gray-300 rounded-[40px] flex justify-center items-center text-red-500' onClick={()=>setModalShowlogin(true)}> 
                  Login
                </button>
                <LoginForm show={modalShowlogin} onHide={()=>setModalShowlogin(false)}/>

                <button className="w-20 p-1 h-10 bg-gradient-to-b from-lime-300 via-green-700 to-lime-300 rounded-[80px] shadow text-red-500" onClick={()=>setModalShowSignup(true)}> 
                 Sign up
                </button>
                <SignupForm show={modalShowSignup} onHide={()=>setModalShowSignup(false)}  />
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
        <div className='md:hidden justify-between'>
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
