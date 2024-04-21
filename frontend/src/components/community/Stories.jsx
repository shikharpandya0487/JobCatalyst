import React from 'react'
import { useNavigate } from 'react-router-dom';


const Stories = ({
  company,
  salary,
  postedBy,
  id,
  }) => {
  const navigate = useNavigate();

    const getPost = (postId) => {
      navigate(`/display-data/${postId}`);

  }; 
               
    return (
      <div className="bg-pink-50 shadow-md rounded-2xl p-4 mb-4">
        <div className="flex items-center mb-4"></div>
        <div className='text-black cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:text-green-700 px-3 py-2 rounded-md text-md'>
          <div style={{ textDecoration: 'none', color: 'inherit' }} onClick={()=>getPost(id)} >!! {postedBy} Bagged {salary}/- job in {company}</div>
        </div>
      </div>
    );
  };

export default Stories