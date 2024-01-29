import React from 'react'
import { useState } from 'react'

const CommentsForm = ({handleSubmit,submitLabel}) => {
    //states to store the text given as input 
    const [text,setText]=useState("")
       
   const onSubmit=(e)=>{
    e.preventDefault();
    //To prevent form from getting submitted on it's own
    handleSubmit(text)
    setText("")

   }
  return (
    <form onSubmit={onSubmit}>
      <textarea className='comment-form-textarea' 
      name="" 
      id="" 
      cols="30" 
      rows="10"
      value={text}
      onChange={(e)=>setText(e.target.value)}
      />
      {/* here the button has type submit by default so it will be submitted  */}
      <button className='comment-form-button' >
       {submitLabel}
      </button>
    </form>
  )
}

export default CommentsForm
