import React from 'react'

const EmployerSpotlight = ({
    s1,
    s2,
    s3,
  }) => {
    return (
      <div className="bg-pink-50 shadow-md rounded-2xl p-4 mb-4">
        <div className="flex items-center mb-4"></div>
        <div>
          <p className="text-gray-800">{s1}</p>
          <p className="text-gray-800">{s2}</p>
          <p className="text-gray-800">{s3}</p>
        </div>
      </div>
    );
  };

  export default EmployerSpotlight



