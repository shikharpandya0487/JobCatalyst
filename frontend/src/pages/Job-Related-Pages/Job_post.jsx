import React,{useRef,useState} from 'react'
import JoditEditor from 'jodit-react';
import Navbar from '../../components/Navbar/Navbar';
import {useTheme} from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';

const Job_post = () => {
    const {theme} = useTheme();

    // useRef is used to prevent rerendering of components  and make reference to the element
    const editor = useRef(null);
	// const [content, setContent] = useState('');
    // const [selectedValuesExperience,setSelectedValuesExperience]=useState('');
    // const [selectedValuesSalary,setSelectedValuesSalary]=useState('');
   
    //state which holds all the post data 
    const [post,setpost]=useState({
        experience:'',
        salary:'',
        content:'',
        numberOfEmployees:''
    })
    
    const editorDataHandler=(data)=>{
        console.log(data);
        setpost({...post,'content':data})
    }



    const fieldChanged=(event)=>{
        const {name,value}=event.target 
        console.log(name,value);
        setpost({...post,[event.target.name]:event.target.value})
    }
  return (
    <div className='w-screen h-screen'
    style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
       
       <Navbar/>

      <div className='mx-auto w-8/12 h-full flex flex-col items-center justify-start gap-3 p-2'>

         {/* employee number and salary range  */}
         <div className='flex text-4xl justify-center items-center p-4 w-full font-bold'>
            Details of the Job
         </div>

        <div className='flex justify-evenly items-center p-1 gap-1 w-full font-semibold'>
            {/* experience dropdown  */}
            <div className='flex flex-col gap-2 p-1'>
                <label htmlFor="experience"  className='text-center'>Experience</label>
                <select 
                    id="experience" 
                    name="experience" 
                    value={post.experience} 
                    onChange={fieldChanged}
                    className='text-center border-2 border-blue-500 rounded-md'
                    style={{
                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        color: theme === "dark" ? "#fff" : "#333",
                      }}
                >
                    <option value="" id='exp1'>Select Experience</option>
                    <option value="0-1" id='exp2'>0-1 years</option>
                    <option value="1-3" id='exp3'>1-3 years</option>
                    <option value="3-5" id='exp4'>3-5 years</option>
                    <option value="5+" id='exp5'>5+ years</option>
                </select>
            </div>
            {/* salary dropdown  */}
            <div className='flex flex-col gap-2 p-1'>
                <label htmlFor="salary"  className='text-center'>Salary</label>
                <select 
                    id="salary" 
                    name="salary" 
                    value={post.salary} 
                    onChange={fieldChanged}
                    className='text-center border-2 border-blue-500 rounded-md'
                    style={{
                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        color: theme === "dark" ? "#fff" : "#333",
                      }}
                >
                    <option value="" id='s1'>Select Salary Range</option>
                    <option value="10-20k" id='s2'>10-20k</option>
                    <option value="20-30k" id='s3'>20-30k</option>
                    <option value="30-40k" id='s4'>30-40k</option>
                    <option value="50k+" id='s5'>50k+</option>
                </select>
            </div>
        </div>


        {/* job description   */}
        <div className='flex justify-center items-center p-1'
        style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
          }}
        >
            <h3>
                Job Description
            </h3>
        </div>
        
        <div className='flex flex-col h-8/12 w-full p-2'>
        <JoditEditor
			ref={editor}            
			value={post.content}
			onChange={editorDataHandler}
		/>
        </div>

        <div className='flex flex-col gap-2 p-1 w-full '>
                <label htmlFor="employee"  className='text-left font-bold w-full text-xl'>Number of Employees</label>
                <select 
                    id="numberOfEmployees" 
                    name="numberOfEmployees" 
                    value={post.numberOfEmployees} 
                    onChange={fieldChanged}
                    className='text-left w-full font-semibold border-2 border-blue-500 rounded-md'
                    style={{
                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        color: theme === "dark" ? "#fff" : "#333",
                      }}
                >
                    <option value="" id='emp1'>Select Number of Employees</option>
                    <option value="0-20" id='emp1'>0-20 Employees</option>
                    <option value="20-40" id='emp1'>20-30 Employees</option>
                    <option value="40-50" id='emp1'>30-40 Employees</option>
                    <option value="50+" id='emp1'>50+ Employees</option>
                </select>
            </div>

            <div className='flex justify-between items-center p-2 w-full'> 
                <Link to = "/applyjob">
                <button
                 className="text-center order-last  p-2 py-2 mt-4 ml-10 mr-10 md:ml-10 mr-10 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-green-500 rounded-xl md:rounded-3xl"
                 >
                  Apply Now
                </button> 
                </Link>  

                <button
                 className="text-center order-last  px-6 py-2 mt-4 ml-10 mr-10 md:ml-10 mr-10 w-28 md:w-30 text-lg md:text-lg text-black whitespace-nowrap bg-blue-500 rounded-xl md:rounded-3xl"
                 >
                  Create
                </button>    
            </div>

      </div>
       

    </div>
  )
}

export default Job_post
