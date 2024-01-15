import React, { useState } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa'

const navlinks=[
  {
    title:"Community",
    link:'/'
  },
  {
    title:"Jobs",
    link:'/jobs'
  },
  {
    title:"Salaries",
    link:'/salaries'
  },
  {
    title:"Companies",
    link:"/companies"
  },
  {
    title:"Connections",
    link:'/connections'
  },
  {
    title:"Profile",
    link:'/profile'
  }

]

function Navbar() {
  const [open,setOpen]=useState(false)
  console.log(open);
  return (
    <div className='bg-gray-900 w-screen overflow-x-hidden'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 w-full'>

        <div className='flex items-center justify-evenly h-16 sm:justify-between md:justify-between'>
            <div className='flex items-center text-white'>
            
                Navbar 
              
            </div>
            {/* nav links*/}

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {
                   navlinks.map((link,indx)=>{
                         return(
                                  <>
                                   <a href={link.link} key={indx} className='text-white transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md' >
                                      {link.title}
                                   </a>
                                  </>
                         )
                   })
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
        <div className='md:hidden justify-between'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {
                navlinks.map((link,index)=>(
                  <a href={link.link} className='text-gray-300 hover:gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium' key={index}>
                    {link.title}
                  </a>
                ))
              }
          </div>

        </div>
      ):null}
    </div>
    
  )
}

export default Navbar
