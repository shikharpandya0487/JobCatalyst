import React from 'react'

const Stories = ({
    p1,
    p2,
    p3,
  }) => {
    return (
      <div className="bg-pink-50 shadow-md rounded-2xl p-4 mb-4">
        <div className="flex items-center mb-4"></div>
        <div>
          <p className="text-gray-800">{p1}</p>
          <p className="text-gray-800">{p2}</p>
          <p className="text-gray-800">{p3}</p>
        </div>
      </div>
    );
  };

export default Stories
