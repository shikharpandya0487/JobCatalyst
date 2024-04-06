import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

const MyPost = () => {

  const userId = localStorage.getItem('userId');
  const [data, setData] = useState([]);
  const [openComments, setOpenComments] = useState(false)
  const [success,setSuccess] = useState(false);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      };

      const url = `http://localhost:5000/api/post/my-post/${userId}`;
      try {
        const response = await axios.get(url, { headers });
        if (response.data) {
          setData(response.data.posts);
          setSuccess(!success);
        }
      } catch (error) {
        console.error(error);
        setSuccess(!success);
        alert("No post found");
      }
    };
    fetchData();
  }, [success]);


  const handleDelete = async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      };
      const url = `http://localhost:5000/api/post/delete-post`;
      const data = { postId: id };
      const response = await axios({
        method: 'delete',
        url: url,
        data: data,
        headers: headers,
      });
      alert(response.data.message);
    } catch (err) {
      console.log("Server error");
    }
  }

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const navigate = useNavigate();


  return (
    <div>
      {data && data.map((item, index) => (
        <div className="bg-slate-200  w-3/4 p-2 rounded-lg">
          <div className="flex gap-1 items-center w-full h-15">
            {/* <img src={image} alt={company} className="w-12 h-12 mr-4" /> */}

            <div className='flex flex-col justify-center items-start pl-4 select-none w-1/3'>
              <IoPersonCircleSharp className="w-14 h-14 flex justify-center items-center" />
              <div>
                <p className="text-slate-700 text-sm font-light">{moment(item.createdAt).fromNow()}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center justify-between w-2/3 h-fit">

              <div className='text-center w-fit'>
                <h1 className=" font-normal pb-2">

                  {item.title && item.title.length > 0 && (
                    <h1 className="font-normal pt-2">{item.title[0].toUpperCase() + item.title.slice(1)}</h1>
                  )}
                </h1>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            {item.imgPath && <MediaDisplay url={item.imgPath} />}
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-medium">Description: </h4>
            {item.description}
            <br />
            <span className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-2xl cursor-pointer text-center text-blue-600 ">
              #{item.tag}
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
              {openComments && <Comments2 postId={item._id} currentUserId={userId} />}
            </div>

          </div>

          <h4 className="text-lg font-medium">Reactions: {item.likes.length} Likes ,{item.heart.length} Heart,{item.congrats.length} Congratulation</h4>

          <div className="w-full flex flex-col justify-between items-center p-2">

            < MdDelete onClick={() => handleDelete(item._id)} />
            <br />
            <FaEdit onClick={() => handleEdit(item._id)} />

          </div>
        </div >
      ))}
    </div>
  );
};

export default MyPost;

