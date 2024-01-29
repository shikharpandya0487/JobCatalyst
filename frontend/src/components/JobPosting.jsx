import React,{useState} from 'react'
import Edit from './Edit';
import Comments2 from './Comments/Comments2'

const JobPosting = ({
    title,
    company,
    position,
    location,
    jobType,
    salary,
    description,
    tags,
    image,
    posted,
  }) => {
    const [expanded,setExpanded] = useState(false);
    const toggle = () => {
      setExpanded(!expanded);
    };
    return (
      <div className="bg-pink-50  rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <img src={image} alt={company} className="w-12 h-12 mr-4" />
          <div>
          <p className="text-gray-700 text-sm select-none">{posted}</p>
            <h3 className="text-2xl font-normal pt-2">{title}</h3>
          </div>
          <div className="pl-10 pr-10">
                
                <p className="text-gray-900 font-medium">{salary}</p>
              </div>
        </div>
        <div className="mb-4">
    <h4 className="text-lg font-medium">Description:</h4>
    <p className="text-gray-700 ">
      {expanded ? description : description.slice(0, 250) + '...'}
      {expanded && description.length > 250 && (
        <span>
          {"  "}
          <a className="text-blue-500 cursor-pointer" onClick={toggle}>
             Read less
          </a>
        </span>
      )}
    </p>
    {!expanded && description.length > 250 && (
      <a className="text-blue-500 cursor-pointer" onClick={toggle}>
        Read more
      </a>
    )}
  </div>
  <div className="mb-4">
    <div className="flex flex-wrap ">
      {tags.map((tag, index) => (
        <span key={index} className="flex items-center">
          <button className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-xs text-center">
            {tag}
          </button>
          {index % 2 === 1 && <br /> }
        </span>
      ))}
    </div>
  </div>
      <div className="mb-4 w-full flex flex-col justify-between items-center p-2">
          <div className='w-full'>
             <p className="text-gray-700 select-none">{position}</p>
             <p className="text-gray-700 ">{location}</p>
             <p className="text-gray-700 select-none">{jobType}</p>
          </div>
          <div className='flex justify-evenly gap-4 items-center p-1 w-full'>
           
           <div className='w-fit flex flex-col p-1'>
            <div className="comment flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2">
               <img className='rounded-full' src="Comments.png" alt="Placeholder" />    
            </div>
            <div className='text-center w-fit'>
              Comment
            </div>
           </div>
            
           <div className='w-fit flex flex-col p-1'>
            <div className="like flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2">
              <img className='rounded-full' src="FacebookLike.png" alt="Placeholder" />             
            </div>
            <div className='text-center w-fit'>
              Like
            </div>
           </div>
           
           <div className='w-fit flex flex-col p-1'>
            <div className="share flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2">
              <img className='rounded-full' src="ForwardArrow.png" alt="Placeholder" />
            </div>
            <div className='text-center w-fit'>
              Share
            </div>
           </div>

          </div>
          <div className='flex w-full rounded-md flex-col p-2 justify-start items-start max-h-[600px] gap-2'>
            {/* addcomment */}
             <Comments2 currentUserId={1}/>
          </div>


          
        </div>
      </div>
    );
  };

export default JobPosting
