import React, { useEffect, useState } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../DemoApi/api.js";
import Comment from "./Comment";
import CommentForm from "./CommentsForm.js";
import { ChatState } from "../../UserContext.js";

const Comments2 = ({postId, currentUserId }) => {
  // states to track the comments made
  console.log("Post ID ",postId,"currentUserID ",currentUserId);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  
  const {user}=ChatState();
  // writing a function to find the root comment
  const rootComments = backendComments.filter((data) => data?.parentId === null);
  
  
  
  // we have to sort the array according to (createdAt) time of their creation
  const getReplies = (commendId) => {
    //here the time will be in string so we have to convert the string to javascript Date to perform the sorting
    //get time calculates the time in milliseconds
    return backendComments
      .filter((backendComment) => backendComment?.parentId === commendId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    console.log("Added comment", text, parentId);
    //creating the comment and adding it to the array of objects
    console.log("Before adding ",backendComments)
    createCommentApi(text, parentId, postId)
      .then((comment) => setBackendComments([comment, ...backendComments]))
      .then(setActiveComment(null))
      .catch((e) => {
        console.log("error on adding comments", e);
      });
  };

  const deleteComment = (commentId) => {
    console.log(commentId);

    if (window.confirm("Are u sure that u want to delete the comment")) {
      //first step is to find the id to be deleted and then we can delete the user
      deleteCommentApi(commentId)
        .then(() => {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment._id !== commentId
          );
          const sortedComments = updatedBackendComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBackendComments(sortedComments);
          
        })
        .catch((e) => {
          console.log("error in deleting the comment");
        });
    }
  };

  const replyComment = (text, parentId) => {
    console.log(backendComments);
  };

  const updateComment = (text, commendId, postId) => {
    updateCommentApi(text, commendId, postId)
        .then((response) => {
            const updatedComment = response.data.comment;
            
            const updatedBackendComments = backendComments.map((comment) =>
                comment._id === updatedComment._id ?{...comment,text:updatedComment.text} : comment
            );
            console.log("Updated Comments",updatedBackendComments);
            setBackendComments(updatedBackendComments);
        })
        .catch((error) => {
            console.error("Error while updating the comment", error);
        });
};


  //we want to fetch data
  useEffect(() => {
    getCommentsApi(postId)
        .then((data) => {
            console.log("Data backend comment ", data);
          
            const sortedComments = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBackendComments(sortedComments);
        })
        .catch((e) => {
            console.log("An error while loading the data from the backend", e);
        });
}, [postId]);


  // console.log(rootComments.body);

  return (
    <div className="comments w-full">
      <div className="comments-title"></div>
      {/* form for comments  */}
      <div className="comment-form-title">Write a comment</div>
      {/* Here comment form is to  be used in 
        1-> To make new Comments 
        2-> To make replies for those comments
        3-> To edit the comments / replies  */}

      <CommentForm
        key={rootComments._id}
        submitLabel="Write"
        handleSubmit={addComment}
        parentId={null}
        postId={postId}
      />

      <div className="comments-container gap-4">
        {
          //  nested comments are basically tree structure so mapping the root to access other commments which could be nested
          backendComments.map((rootComment) => (
            <Comment
              key={rootComment._id}
              id={rootComment._id}
              postId={postId}
              comment={rootComment}
              replies={getReplies(rootComment._id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              parentId={null}
              updateComment={updateComment}
            /> 
            // console.log("Root Comment ",rootComment)
          ))
        }
      </div>
    </div>
  );
};

export default Comments2;
