import React from 'react'
import Avatar from './Avatar'

const Contact = ({Key,id,onClick,username,selected,online}) => {
  return (
    (username && <div key={Key} onClick={()=>onClick(id)} className={'w-full border-b border-gray-100 py-2 flex justify-between items-center gap-3 text-xl font-semibold cursor-pointer p-3 '+(selected?'bg-blue-50 ':'')}>
         
    <Avatar username={username} userId={id} online={online}/>
    <span className='text-gray-800'> {(username!==null)?username:''}</span>
   </div>)
  )
}

export default Contact
