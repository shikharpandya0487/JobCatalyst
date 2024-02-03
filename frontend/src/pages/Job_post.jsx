import React,{useRef,useState} from 'react'
import JoditEditor from 'jodit-react';
import Navbar from '../components/Navbar';

const Job_post = () => {

    const editor = useRef(null);
	const [content, setContent] = useState('');
    const [selectedValues,setSelectedValues]=useState('');

    const handleInputChange=(e)=>{
        setSelectedValues(e.target.value)
    }
   
  return (
    <div className='w-screen h-screen'>
       
       <Navbar/>

      <div className='mx-auto w-8/12 h-full flex flex-col items-center justify-start gap-3'>

         {/* employee number and salary range  */}
         <div className='flex justify-center items-center p-1 w-full font-semibold'>
            Details of the Job
         </div>

        <div className='flex justify-evenly items-center p-1 gap-1 w-full font-semibold'>
            <div className='flex flex-col gap-2 p-1'>
               <label htmlFor=""> Experience</label>
                <input 
                type="text" 
                name="" 
                value={selectedValues}
                onChange={handleInputChange}
                id="inputSelector" 
                
                />
            </div>

            <div className='flex flex-col gap-2 p-1'>
                Salary
            </div>
        </div>


        {/* job description   */}
        <div className='flex justify-center items-center p-1'>
            <h3>
                Job Description
            </h3>
        </div>
        
        <div className='flex flex-col h-8/12 w-full p-2'>
        <JoditEditor
			ref={editor}
            // config={config}
			value={content}
			onChange={newContent => setContent(newContent)}
		/>
        </div>


      </div>


    </div>
  )
}

export default Job_post
