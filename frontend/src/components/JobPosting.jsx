import React,{useState} from 'react'
import axios from 'axios';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
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
  // image,
  posted,
  postedBy,
  id,
  post
  }) => {
    const [expanded,setExpanded] = useState(false);
    const toggle = () => {
      setExpanded(!expanded);
    };

    
  //LIKE POST 
  const likePost = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    };
    const url = 'http://localhost:5000/api/post/like-post';
    const data = { postId: id }
    axios({
      method: 'put',
      url: url,
      data: data,
      headers: headers,
    })
    .then((res) => {
      console.log("liked");
    }).catch((err) => {
      console.log("server err",err);
    })
  }

  //DISLIKE POST
  const dislikePost = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    };
    const url = 'http://localhost:5000/api/post/dislike-post';
    const data = { postId: id }
    axios({
      method: 'put',
      url: url,
      data: data,
      headers: headers,
    })
    .then((res) => {
      console.log("liked");
    }).catch((err) => {
      console.log("server err",err);
    })
  }

  const userId = localStorage.getItem('userId');

  // states to manage the comments 
  const [openComments,setOpenComments]=useState(false)

    return (
      <div className="bg-pink-50  rounded-2xl p-4 mb-4">
        <div className="flex items-center mb-4">
        {/* <img src={image} alt={company} className="w-12 h-12 mr-4" /> */}
        <div>
          <p className="text-gray-700 text-sm">{posted}</p>
          <h3 className="text-2xl font-normal pt-2">{title}</h3>
          <h6 className="text-gray-700 text-sm">Posted by: {postedBy}</h6>
        </div>
        <div className="pl-10 pr-10">

          <p className="text-gray-900 font-medium">Salary: {salary}/Month</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-medium">Description: </h4>
        <p className="text-gray-700">
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
        )}
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap ">
          {/* {tags.map((tag, index) => (
            <span key={index} className="flex items-center">
              <span className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-xs text-center">
                {tag}
              </span>
              {index % 2 === 1 && <br />}
            </span>
          ))} */}
          <span className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-xs text-center">
            {tags}
          </span>
        </div>
      </div>

      <div className="mb-4 w-full flex flex-col justify-between items-center p-2">
          <div className='w-full'>
             <p className="text-gray-700 select-none">{position}</p>
             <p className="text-gray-700 ">{location}</p>
             <p className="text-gray-700 select-none">{jobType}</p>
          </div>
          {/* like dislike icon */}
          {/* <div className='flex flex-col space-y-[20px] '>
          {
            post.likes.find((id)=> id == userId)
            ?
            <FaThumbsUp onClick={() => dislikePost(id)}  />
            :
            <FaRegThumbsUp onClick={() => likePost(id)} />
          }
          <h5>{post.likes.length} Likes</h5> 
        </div>*/}


          <div className='flex justify-evenly gap-4 items-center p-1 w-full'>
           

           <div className='w-fit flex flex-col items-center justify-center p-1'>
            <div className="comment flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2 cursor-pointer" onClick={()=>setOpenComments((open)=>!open)}>
               <img className='rounded-full' src="Chat.png" alt="Placeholder" />    
            </div>
            <div className='text-center w-fit'>
              Comment
            </div>
           </div>
            
           <div className='w-fit flex flex-col items-center justify-center p-1 cursor-pointer'>
            <div className="like flex justify-center items-center rounded-full w-12 h-12 bg-slate-400 p-2">
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
                <button className=' rounded-md w-fit h-fit p-2 bg-blue-600 text-white font-semibold flex justify-center items-center'  onClick={()=>setOpenComments((open)=>!open)}>
                 {openComments?'Close Comments':'Open Comments'}
                </button>
              </div>             
            { openComments && <Comments2 currentUserId={1}/>}
          </div>


          
        </div>
      </div>
    );
  };

export default JobPosting
