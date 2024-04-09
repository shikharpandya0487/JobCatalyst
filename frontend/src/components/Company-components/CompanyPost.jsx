import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import Comments2 from '../Comments/Comments2'

const MediaDisplay = ({ url }) => {
    const isVideo = url.endsWith('.mp4');
  
    if (isVideo) {
      return (
        <video className='w-3/4 h-3/6' controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <img className='w-3/4 rounded-md' src={url} alt="Media" />;
    }
  };

const CompanyPost = ({
    title,
    company,
    position,
    location,
    jobType,
    salary,
    description,
    tag,
    image,
    posted,
    id,
  }) => {
    const [expanded,setExpanded] = useState(false);
    const toggle = () => {
      setExpanded(!expanded);
    };
    const userId = localStorage.getItem('userId');
    const [openComments, setOpenComments] = useState(false)

    return (
        <div className="bg-slate-200  w-3/4 p-2 rounded-lg">
          <div className="flex gap-1 items-center w-full h-15">
            {/* <img src={image} alt={company} className="w-12 h-12 mr-4" /> */}
              
            <div className='flex flex-col justify-center items-start pl-4 select-none w-1/3'>
              <IoPersonCircleSharp className="w-14 h-14 flex justify-center items-center" />
              <div>
                {/* <h6 className="text-slate-700 text-sm font-light">Posted by: <b className='font-semibold cursor-pointer hover:underline text-lg'>{postedBy}</b></h6> */}
                <p className="text-slate-700 text-sm font-light">{posted}</p>
              </div>
            </div>
    
            <div className="flex flex-col gap-2 items-center justify-between w-2/3 h-fit">
    
              <div className='text-center w-fit'>
                <h1 className=" font-normal pb-2">
              
                        {title && title.length > 0 && (
                        <h1 className="font-normal pt-2">{title[0].toUpperCase() + title.slice(1)}</h1>
                      )}
                </h1>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
          {image && <MediaDisplay  url={image} />}
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-medium">Description: </h4>
            {/* <p className="text-gray-700">
               {expanded ? description : description.slice(0, 250) + '...'}
              {expanded && description.length > 250 && (
                <span>
                  {' '}
                  Remaining content is here when expanded.
                  <a className="text-blue-500" onClick={toggle}>
                    Read less
                  </a>
                </span>
              )}
            </p> 
            {!expanded && description.length > 250 && (
              <a className="text-blue-500" onClick={toggle}>
                Read more
              </a>
            )} */}
            {description}
            <br/>
              <span className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-2xl cursor-pointer text-center text-blue-600 ">
                #{tag}
              </span>
        
            </div>
            
    
            <div className="w-full flex flex-col justify-between items-center p-2">
                
    
            <div className='flex justify-evenly gap-2 items-center p-1 w-full'>
    
              <div className='w-fit flex flex-col items-center justify-center p-1'>
                <div className="comment flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2 cursor-pointer" onClick={() => setOpenComments((open) => !open)}>
                  <img className='rounded-full' src="Chat.png" alt="Placeholder" />
                </div>
                <div className='text-center w-fit'>
                  Comment
                </div>
              </div>
              
              
              <div className='w-fit flex flex-col items-center justify-center p-1 cursor-pointer'>
                <div className="like flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2"  >
                  <img className='rounded-full' src="FacebookLike.png" alt="Placeholder" />
                
                </div>
                <div className='text-center w-fit'>
                  Like
                </div>
              </div>
    
              <div className='w-fit flex flex-col items-center justify-center p-1 cursor-pointer'>
                <div className="share flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2">
                  <img className='rounded-full' src="ForwardArrow.png" alt="Placeholder" />
                </div>
                <div className='text-center w-fit'>
                  Share
                </div>
              </div>
    
            </div>
      
            {/* addcomment */}
            <div className='flex w-full rounded-md flex-col p-2 justify-start items-start min-h-fit gap-2'>
    
              {/* button  */}
              <div className="buttonForComments w-full">
                <button className=' rounded-md w-fit h-fit p-2 bg-blue-600 text-white font-semibold flex justify-center items-center' onClick={() => setOpenComments((open) => !open)}>
                  {openComments ? 'Close Comments' : 'Open Comments'}
                </button>
              </div>
              {openComments && <Comments2 postId={id} currentUserId={userId}/>}
            </div>
    
            </div>
          </div >
        );

  };

export default CompanyPost