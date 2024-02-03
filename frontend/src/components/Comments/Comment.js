import React from 'react'
import CommentsForm from './CommentsForm';


const Comment = ({comment,replies,currentUserId,deleteComment,activeComment,setActiveComment,addComment,parentId=null,updateComment}) => {
    console.log(comment);
    const canReply=Boolean(currentUserId)
    
    
    // diabling the edit or delete of comment after 5min of formation 
   // diabling the edit or delete of comment after 5min of formation 
   const tenMinute = 600000; // 10 minutes in milliseconds
   const commentCreationTime = new Date(comment.createdAt);
   const currentTime = new Date();
   const timePassed = currentTime - commentCreationTime > tenMinute;
  
   const canEdit = currentUserId === comment.userId && !timePassed;
   const canDelete = currentUserId === comment.userId && !timePassed;
   
   const isReplying=activeComment && activeComment.type==="replying" && activeComment.id===comment.id 

   const isEditing=activeComment && activeComment.type==="editing" && activeComment.id===comment.id

    const createdAt=new Date(comment.createdAt).toLocaleDateString()

    const replyId=parentId?parentId:comment.id 

     console.log(canDelete);

     console.log(canEdit);
    return (
        
    <div className='comment w-full'>
        <div className='comment-image-container'>
            <img src="/user-icon.png" alt="Image of user here" />
        </div>

        <div className='comment-right-part'>
            <div className='comment-content'>
                {/* Author  */}
                <div className='comment-author'>
                    {comment.username}
                </div>
              
                 {/* creationg time  */}
                 <div className='creation'>
                  {createdAt}
                 </div> 
            </div>

            {/* main text  */}
                  { !isEditing &&
                  <div className='comment-text'>
                      {comment.body}
                  </div>
                  }

                  {
                    isEditing && (
                      <CommentsForm
                        submitLabel="Update"
                        hasCancelButton 
                        initialText={comment.body}
                        handleSubmit={(text)=>updateComment(text,comment.id)}
                        handleCancel={()=>setActiveComment(null)}
                      />
                    )
                  }

             <div className="comment-actions">
                  { // I Have to make it to && but due to error I have kept it as or ||
                  canReply &&<div className="comment-action" onClick={()=>setActiveComment({id:comment.id,type:"replying"})}>Reply</div>}
                { canEdit || <div className="comment-action" onClick={()=>setActiveComment({id:comment.id,type:"editing"})}>Edit</div>}
                { canDelete ||  <div className="comment-action" onClick={()=>deleteComment(comment.id)}>Delete</div>}
             </div>



             {isReplying && (
              <CommentsForm
               submitLabel="Reply"
               handleSubmit={(text)=>addComment(text,replyId)}
              />
             )}

             




             {replies.length>0 && 
                <div className='replies'>
                  {
                    replies.map((reply)=>(
                        //reply is a comment and we have to render it recursively
                        //empty array is passed as our replies can't have nested comments
                        <Comment 
                        comment={reply} 
                        key={reply.id} 
                        replies={[]} 
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        parentId={comment.id}
                        updateComment={updateComment}
                        />
                    ))

                  }
                </div>} 

        </div>
    </div>
  )
}

export default Comment
