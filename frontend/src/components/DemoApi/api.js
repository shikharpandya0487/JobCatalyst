import axios from 'axios';

export const getComments = async (postId) => {
  try {
    const url = `http://localhost:5000/api/post/${postId}/get-comment`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error displaying comment:', error.message);
    throw error;
  }
 

    //   return [
    //   {
    //     id: "1",
    //     body: "First comment",
    //     username: "Jack",
    //     userId: "1",
    //     parentId: null,
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    //   {
    //     id: "2",
    //     body: "Second comment",
    //     username: "John",
    //     userId: "2",
    //     parentId: null,
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    //   {
    //     id: "3",
    //     body: "First comment first child",
    //     username: "John",
    //     userId: "2",
    //     parentId: "1",
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    //   {
    //     id: "4",
    //     body: "Second comment second child",
    //     username: "John",
    //     userId: "2",
    //     parentId: "2",
    //     createdAt: "2021-08-16T23:00:33.010+02:00",
    //   },
    // ];
  };
  
  export const createComment = async (text, parentId ,postId) => {
    try {
      // Make an API request to create a comment on the server
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error('Error creating comment:', error.message);
      throw error; // Propagate the error to the calling code
    }

  //   return {
  //     id: Math.random().toString(36).substr(2, 9),
  //     body: text,
  //     parentId,
  //     userId: "1",
  //     username: "John",
  //     createdAt: new Date().toISOString(),
  //   };
  };

  
  export const updateComment = async (text,commendId) => {
    return { text,commendId };
  };
  
  export const deleteComment = async () => {
    return {};
  };