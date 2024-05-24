import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaEdit, FaHeart, FaThumbsUp, FaAward } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      };

      const url = `https://jobcatalyst.onrender.com/api/post/my-post/${userId}`;
      try {
        const response = await axios.get(url, { headers });
        if (response.data) {
          setData(response.data.posts);
          setSuccess(!success);
        }
      } catch (error) {
        console.error(error);
        alert("No post found");
      }
    };
    fetchData();
  }, [success,userId]);

  const handleDelete = async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      };
      const url = `https://jobcatalyst.onrender.com/api/post/delete-post`;
      const data = { postId: id };
      const response = await axios.delete(url, { data, headers });
      alert(response.data.message);
    } catch (err) {
      console.log("Server error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full">
      {data && data.map((item, index) => (
        <div className="bg-slate-200 w-full p-2 rounded-lg mb-3 relative" key={item._id}>
          <div className="flex gap-1 items-center w-full h-15">
            <div className='flex flex-col justify-center items-start pl-4 select-none w-1/3'>
              <IoPersonCircleSharp className="w-14 h-14 flex justify-center items-center" />
              <div>
                <p className="text-slate-700 text-sm font-light">{moment(item.createdAt).fromNow()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-between w-2/3 h-fit">
              <div className='text-center w-fit'>
                {item.title && item.title.length > 0 && (
                  <h1 className="font-normal absolute top-0 right-0 mr-0 ">{item.title[0].toUpperCase() + item.title.slice(1)}</h1>
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            {item.imgPath && <MediaDisplay url={item.imgPath} />}
          </div>
          <div className="mb-4">
            <h4 className="text-2xl mt-4 font-medium">Description: </h4>
            {item.description}
            <br />
            <span className="bg-gray-200 py-1 mr-6 rounded-xl w-20 text-2xl cursor-pointer text-center text-blue-600">
              #{item.tag}
            </span>
          </div>
          <div className="w-full flex justify-between items-center p-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <FaThumbsUp className="text-blue-500 mr-1" />
                <span>{item.likes.length}</span>
              </div>
              <div className="flex items-center">
                <FaHeart className="text-red-500 mr-1" />
                <span>{item.heart.length}</span>
              </div>
              <div className="flex items-center">
                <FaAward className="text-yellow-500 mr-1" />
                <span>{item.congrats.length}</span>
              </div>
            </div>
            <div className="flex">
              <MdDelete onClick={() => handleDelete(item._id)} className="cursor-pointer text-red-600 mr-2 text-3xl" />
              <FaEdit onClick={() => handleEdit(item._id)} className="cursor-pointer text-blue-700 text-3xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPost;
