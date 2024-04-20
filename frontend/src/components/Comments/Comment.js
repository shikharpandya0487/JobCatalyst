import React from 'react'
import CommentsForm from './CommentsForm';


const Comment = ({id,postId,comment,replies,currentUserId,deleteComment,activeComment,setActiveComment,addComment,parentId=null,updateComment}) => {
    // console.log(comment);

    if (!comment) {
      return null; // Return null if comment is null or undefined
  }

 

    const canReply=Boolean(currentUserId)
    // console.log("Comment is  ",comment)
    // console.log("Curr ID ",currentUserId," userId ",comment.user._id)
    // diabling the edit or delete of comment after 5min of formation 
   // diabling the edit or delete of comment after 5min of formation 
   const t = 6000; 
   const commentCreationTime = new Date(comment.createdAt);
   const currentTime = new Date();
   const timePassed = ((currentTime-commentCreationTime)>t)?true:false
  
   const canEdit = ((currentUserId === comment.user._id) && timePassed)|| parentId!==null;
   const canDelete = ((currentUserId === comment.user._id) && timePassed) || parentId!==null;
   console.log("rep ",replies);

  //  console.log("Time ",timePassed,"Edit ",canEdit,"Delete ",canDelete," IDs ",currentUserId, " User ",comment.user._id,"Comment ",comment);
   
   const isReplying=activeComment && activeComment.type==="replying" && activeComment.id===id 

   const isEditing=activeComment && activeComment.type==="editing" && activeComment.id===id

    const createdAt=new Date(comment?.createdAt).toLocaleDateString()

    const replyId=parentId?parentId:comment._id

    return (
        
    <div className='comment w-full'>
        <div className='comment-image-container'>
            <img src="/user-icon.png" alt="Image of user here" />
        </div>

        <div className='comment-right-part'>
            <div className='comment-content'>
                {/* Author  */}
                <div className='comment-author'>
                    {comment.user.username}
                </div>
              
                 {/* creationg time  */}
                 <div className='creation'>
                  {createdAt}
                 </div> 
            </div>

            {/* main text  */}
                  { !isEditing &&
                  <div className='comment-text'>
                      {comment.text}
                  </div>
                  }

                  {
                    isEditing && (
                      <CommentsForm
                        submitLabel="Update"
                        hasCancelButton 
                        initialText={comment.text}
                        handleSubmit={(text)=>updateComment(text,comment._id,postId)}
                        handleCancel={()=>setActiveComment(null)}
                        postId={postId}
                      />
                    )
                  }

              <div className="comment-actions">
                  { // I Have to make it to && but due to error I have kept it as or ||
                canReply&&<div className="comment-action" onClick={()=>setActiveComment({id:comment._id,type:"replying"})}>Reply</div>}
                { canEdit && <div className="comment-action" onClick={()=>setActiveComment({id:comment._id,type:"editing"})}>Edit</div>}
                { canDelete &&  <div className="comment-action" onClick={()=>deleteComment(comment._id)}>Delete</div>}
             </div>



             {isReplying && (
              <CommentsForm
               submitLabel="Reply"
               handleSubmit={(text)=>addComment(text,replyId)}
               postId={postId}
              />
             )}
    
             {replies.length>0 && 
                <div className='replies right-2 p-1 text-red-400'>
                  {replies &&
                    replies.map((reply)=>(
                        // reply is a comment and we have to render it recursively
                        // empty array is passed as our replies can't have nested comments
                        <Comment 
                        className={(reply.parentId===null)?'right-2 p-2 bg-red-300':'left-0 p-2 bg-slate-300'}
                        comment={reply} 
                        key={reply._id} 
                        postId={postId}
                        replies={[]} 
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        parentId={comment._id}
                        updateComment={updateComment}
                        />
                        // console.log("Replies ",reply)
                    ))

                  }
                </div>
                
                }



        </div>
    </div>
  )
}

export default Comment