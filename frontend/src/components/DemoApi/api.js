import axios from 'axios';

export const getComments = async (postId) => {
  try {
    const url = `http://localhost:5000/api/post/get-comment/${postId}`;
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
      const data = { text,parentId,postId };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
      };
      const url='http://localhost:5000/api/post/comments';
      const response = await axios({
        method: 'POST', 
        url: url,
        data:data,
        headers: headers,
      })
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }

  };

  
  export const updateComment = async (text,commendId) => {
    return { text,commendId };
  };
  
  export const deleteComment = async () => {
    return {};
  };