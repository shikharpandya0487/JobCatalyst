import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
// import { FaRegThumbsUp } from "react-icons/fa";
// import { FaThumbsUp } from "react-icons/fa";
// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import { FaHandsClapping } from "react-icons/fa6";
// import { PiHandsClapping } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import Comments2 from '../Comments/Comments2'
import AddPost from '../community/AddPost'

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


const JobPosting = ({
  title,
  
  description,
  tags,
  image,
  posted,
  postedBy,
  id,

}) => {
  const [expanded, setExpanded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const toggle = () => {
    setExpanded(!expanded);
  };
  
  const navigate = useNavigate();

  if(title)
  {
    title=title.toLowerCase()
  }


const handleDelete = async (id) => {
  try {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  };
  const url = `https://jobcatalyst.onrender.com/api/post/delete-post`;
  const data = { postId: id };
      const response = await axios({
          method: 'delete',
          url: url,
          data: data,
          headers: headers,
      });
      alert(response.data.message);
      setRefresh(!refresh);
  } catch (err) {
      console.log("Server error");
  }
}

const handleEdit = async (id)=>{
  navigate('/add-post')
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    };
  } catch (error) {
    
  }
}


  const userId = localStorage.getItem('userId');

  // states to manage the comments 
  const [openComments, setOpenComments] = useState(false)

  return (
    <div className="bg-slate-200  w-full p-2 rounded-lg">
      <div className="flex gap-1 items-center w-full h-15">
        {/* <img src={image} alt={company} className="w-12 h-12 mr-4" /> */}
          
        <div className='flex flex-col justify-center items-start pl-4 select-none w-1/3'>
          <IoPersonCircleSharp className="w-14 h-14 flex justify-center items-center" />
          <div>
            <h6 className="text-slate-700 text-sm font-light">Posted by: <b className='font-semibold cursor-pointer hover:underline text-lg'>{postedBy}</b></h6>
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
        <p className="text-gray-700">
          {expanded ? description : description.slice(0, 40) + '...'}
          {expanded && description.length > 200 && (
            <span>
              Remaining content is here when expanded.
              <div className="text-blue-500" onClick={toggle}>
                Read less
              </div>
            </span>
          )}
        </p>
        {!expanded && description.length > 250 && (
            <button className="text-blue-500" onClick={toggle}>
              Read more
            </button>
          )}

          <span className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-2xl cursor-pointer text-center text-blue-600 ">
            #{tags}
          </span>
    
      </div>
        

      <div className="w-full flex flex-col justify-between items-center p-2">
      
       
        {/* reaction icons */}
        
      

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
          <div className='text-center w-fit cursor-pointer '>
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
      < MdDelete onClick={()=> handleDelete(id)}/>
      <br/>
      <br/>
      <br/>
     
      <FaEdit onClick={()=>handleEdit(id)}/>
      {/* addcomment */}
      <div className='flex w-full rounded-md flex-col p-2 justify-start items-start min-h-fit gap-2'>

        {/* button  */}
        <div className="buttonForComments w-full">
          <button className=' rounded-md w-fit h-fit p-2 bg-blue-600 text-white font-semibold flex justify-center items-center' onClick={() => setOpenComments((open) => !open)}>
            {openComments ? 'Close Comments' : 'Open Comments'}
          </button>
        </div>
        {openComments && <Comments2 postId={id} currentUserId={userId} />}
      </div>

      


    </div>
      </div >
    );
  };

export default JobPosting

