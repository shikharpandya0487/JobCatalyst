import React, { useState } from 'react';

const Avatar = ({ username, userId, online }) => {
  const colors = ['bg-teal-200', 'bg-red-200',
    'bg-green-200', 'bg-purple-200',
    'bg-blue-200', 'bg-yellow-200',
    'bg-orange-200', 'bg-pink-200', 'bg-fuchsia-200', 'bg-rose-200'];

  // Converting the id to decimal
  const Idto10 = parseInt(userId.substring(10), 16);
  const color = colors[Idto10 % colors.length];

  return (
    <div className='relative'>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-2xl ${color}`}>
        {username && username.length > 0 ? username[0] : ''}
      </div>
      {online && (
        <div className='rounded-full bg-green-500 w-3 h-3 absolute top-3 left-3 m-2 border-2 border-white'>
        </div>
      )}
      {
        !online && (
          <div className='rounded-full bg-gray-500 w-3 h-3 absolute top-3 left-3 m-2 border-2 border-white'>
          </div>
        )
      }
    </div>
  );
}

export default Avatar;
