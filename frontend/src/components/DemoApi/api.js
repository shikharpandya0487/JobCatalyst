import axios from 'axios';

export const getComments = async (postId) => {
  try {
    const url = `https://jobcatalyst.onrender.com/api/post/get-comment/${postId}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error displaying comment:', error.message);
    throw error;
  }

  };
  
export const createComment = async (text, parentId ,postId) => {
    try {
      const data = { text,parentCommentId:parentId,postId };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
      };
      const url='https://jobcatalyst.onrender.com/api/post/comments';
      const response = await axios({
        method: 'POST', 
        url: url,
        data:data,
        headers: headers,
      })
      console.log("created comment ",response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }

  };

  
  export const updateComment = async (text,commendId,postId) => {
    try {
      const data={text:text,postId:postId}
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
      };

      const response=await axios.put(`https://jobcatalyst.onrender.com/api/post/update-comments/${commendId}`,data,{headers})
        // console.log("Updated comment ",response);
        return response;
    } catch (error) {
      console.log("Updated comment error ",error);
    }
  };
  
  export const deleteComment = async (commendId) => {
    try {

      const headers = {
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
      };
      const response=await axios.delete(`https://jobcatalyst.onrender.com/api/post/delete-comments/${commendId}`,{headers})
      
      console.log("Deleted comment",response);
      
    } catch (error) {
      console.log(error)
    }
  };

  export const replyComment=async (postId,text,parentCommentId)=>{
    try {
      const data={
        text,
        parentCommentId,
        postId
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
      };
      
      const response=await axios.post(`https://jobcatalyst.onrender.com/api/post/comments`,data,headers)
      console.log("reply ",response)

      return response;
    } catch (error) {
      console.log("error while creating a reply ")
    }
  }