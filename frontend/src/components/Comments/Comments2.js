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
    console.log("Backend comments check before replies ",backendComments)
    const k= backendComments
      .filter((backendComment) => backendComment.parentComment === commendId)
      

      
      console.log("replies ",k);
      return k;

  };

  const addComment = (text, parentId, postId) => {
    console.log("Added comment", text, parentId);
  
    createCommentApi(text, parentId, postId)
      .then((comment) => {
        console.log(
          "parent idx ",parentId
        )
        if (parentId) {
          // Find the parent comment in the backendComments array
          const parentCommentIndex = backendComments.findIndex(
            (c) => c._id === parentId
          );
          
          console.log("This is the comment ",comment,comment.parentComment,parentId,parentCommentIndex)
          // If the parent comment is found, update its replies array
          if (parentCommentIndex !== -1) {
            const updatedBackendComments = [...backendComments];
            updatedBackendComments[parentCommentIndex].replies = [
              ...(updatedBackendComments[parentCommentIndex].replies || []),
              comment,
            ];
            console.log("updated comments",updatedBackendComments)
            setBackendComments(updatedBackendComments);
          }
        } else {
          // If the comment does not have a parent ID, it's a new comment
          setBackendComments([comment, ...backendComments]);
        }
      })
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
          const sortedComments = updatedBackendComments.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
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
            
            const updatedBackendComments = backendComments.map((comment) => {
              if (comment._id === updatedComment._id) {
                // Update the text of the updated comment
                return { ...comment, text: updatedComment.text };
              } else if (comment.replies && comment.replies.length > 0) {
                // If the comment has replies, filter out the deleted comment from the replies array
                return {
                  ...comment,
                  replies: comment.replies.filter((reply) => reply._id !== commendId),
                };
              } else {
                return comment;
              }
            });
            
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
          
            const sortedComments = data.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
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
        key={rootComments?._id+`${rootComments.parentId}`}
        submitLabel="Write"
        handleSubmit={addComment}
        parentId={null}
        postId={postId}
      />

      <div className="comments-container gap-4">
        {console.log("Backend comments ",backendComments)}
        {
          //  nested comments are basically tree structure so mapping the root to access other commments which could be nested
          backendComments.map((rootComment) => (
            <Comment
              key={rootComment?._id}
              id={rootComment?._id}
              postId={rootComment?.post}
              comment={rootComment}
              replies={rootComment?.replies}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              parentId={rootComment?.parentComment}
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
