import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaEdit, FaHeart, FaThumbsUp, FaAward } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToast } from '@chakra-ui/react';

const MediaDisplay = ({ url }) => {
  const isVideo = url.endsWith('.mp4');
  return isVideo ? (
    <video className='w-3/4 h-3/6' controls>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <img className='w-3/4 rounded-md' src={url} alt="Media" />
  );
};

const DisplayData = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:5000/api/post/get-post/${id}`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log("server err", error);
      }
    };
    fetchData();
  }, [id]);


  return (
    <div>
      <div className="w-100">
        <div className="bg-slate-200 w-full p-2 rounded-lg mb-3 relative" key={data._id}>
          <div className="flex gap-1 items-center w-full h-15">
            <div className='flex flex-col justify-center items-start pl-4 select-none w-1/3'>
              <IoPersonCircleSharp className="w-14 h-14 flex justify-center items-center" />
              <div>
                <p className="text-slate-700 text-sm font-light">{moment(data.createdAt).fromNow()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-between w-2/3 h-fit">
              <div className='text-center w-fit'>
                {data.title && data.title.length > 0 && (
                  <h1 className="font-normal absolute top-0 right-0 mr-0 ">{data.title[0].toUpperCase() + data.title.slice(1)}</h1>
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            {data.imgPath && <MediaDisplay url={data.imgPath} />}
          </div>
          <div className="mb-4">
            <h4 className="text-2xl mt-4 font-medium">Description: </h4>
            {data.description}
            <br />
            <span className="bg-gray-200 py-1 mr-6 rounded-xl w-20 text-2xl cursor-pointer text-center text-blue-600">
              #{data.tag}
            </span>
          </div>
          <div className="w-full flex justify-between items-center p-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <FaThumbsUp className="text-blue-500 mr-1" />
                <span>{data.likes ? data.likes.length : 0}</span>
              </div>
              <div className="flex items-center">
                <FaHeart className="text-red-500 mr-1" />
                <span>{data.heart ? data.heart.length : 0}</span>
              </div>
              <div className="flex items-center">
                <FaAward className="text-yellow-500 mr-1" />
                <span>{data.congrats ? data.congrats.length : 0}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DisplayData;
