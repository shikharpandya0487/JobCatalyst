import React,{useEffect, useState} from 'react'
import Edit from './Edit';
import axios from 'axios';
import { IoPersonCircleSharp } from "react-icons/io5";

import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { PiHandsClapping } from "react-icons/pi";
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
    const [refresh,setRefresh] = useState(false);
    const toggle = () => {
      setExpanded(!expanded);
    };

    // useEffect(() => {
    //   const url = 'http://localhost:5000/api/post/get-posts'
    //   axios.get(url)
    //     .then((res) => {
    //       if (res.data.product) {
    //         console.log("refresh");
    //       }
    //     }).catch((err) => {
    //       alert("server err");
    //     })
    // }, [refresh])
    
    
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
      setRefresh(!refresh);
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
      setRefresh(!refresh);
    }).catch((err) => {
      console.log("server err",err);
    })
  }

    //LIKE POST 
    const heartPost = (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      };
      const url = 'http://localhost:5000/api/post/heart-post';
      const data = { postId: id }
      axios({
        method: 'put',
        url: url,
        data: data,
        headers: headers,
      })
      .then((res) => {
        console.log("liked");
        setRefresh(!refresh);
      }).catch((err) => {
        console.log("server err",err);
      })
    }
  
    //DISLIKE POST
    const disHeartPost = (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      };
      const url = 'http://localhost:5000/api/post/unheart-post';
      const data = { postId: id }
      axios({
        method: 'put',
        url: url,
        data: data,
        headers: headers,
      })
      .then((res) => {
        console.log("liked");
        setRefresh(!refresh);
      }).catch((err) => {
        console.log("server err",err);
      })
    }

      //LIKE POST 
  const congratsPost = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    };
    const url = 'http://localhost:5000/api/post/cong-post';
    const data = { postId: id }
    axios({
      method: 'put',
      url: url,
      data: data,
      headers: headers,
    })
    .then((res) => {
      console.log("liked");
      setRefresh(!refresh);
    }).catch((err) => {
      console.log("server err",err);
    })
  }

  //DISLIKE POST
  const disCongratsPost = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    };
    const url = 'http://localhost:5000/api/post/discong-post';
    const data = { postId: id }
    axios({
      method: 'put',
      url: url,
      data: data,
      headers: headers,
    })
    .then((res) => {
      console.log("liked");
      setRefresh(!refresh);
    }).catch((err) => {
      console.log("server err",err);
    })
  }

  const userId = localStorage.getItem('userId');

    return (
      <div className="bg-pink-50  rounded-2xl p-4 mb-4">
        <div className="flex items-center mb-4">
        {/* <img src={image} alt={company} className="w-12 h-12 mr-4" /> */}
        <IoPersonCircleSharp className="w-12 h-12 mr-4"/>
        <div>
          <p className="text-gray-700 text-sm">{posted}</p>
          <h3 className="text-2xl font-normal pt-2">{title}</h3>
          {/* <h6 className="text-gray-700 text-sm">Posted by: {postedBy}</h6> */}
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
             <p className="text-gray-700 select-none">Position: {position}</p>
             <p className="text-gray-700 ">Location: {location}</p>
             <p className="text-gray-700 select-none">Job Type: {jobType}</p>
          </div>
          {/* like dislike icon */}
          <div className='flex flex-col space-y-[20px] '>
          {
            post.likes.find((id)=> id == userId)
            ?
            <FaThumbsUp onClick={() => dislikePost(id)}  />
            :
            <FaRegThumbsUp onClick={() => likePost(id)} />
          }
          <h5>{post.likes.length} Likes</h5>

          {
            post.likes.find((id)=> id == userId)
            ?
            <CiHeart onClick={() => disHeartPost(id)}  />
            :
            <FaHeart onClick={() => heartPost(id)} />
          }
          <h5>{post.heart.length} Likes</h5>
          {
            post.likes.find((id)=> id == userId)
            ?
            <PiHandsClapping onClick={() => disCongratsPost(id)}  />
            :
            <FaHandsClapping  onClick={() => congratsPost(id)} />
          }
          <h5>{post.congrats.length} Likes</h5>

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
