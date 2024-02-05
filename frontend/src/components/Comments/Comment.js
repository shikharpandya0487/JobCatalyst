import React from 'react'


const Comment = ({comment,replies,currentUserId,deleteComment}) => {
    // console.log(comment);
    const canReply=Boolean(currentUserId)
    
    
    // diabling the edit or delete of comment after 5min of formation 
   // diabling the edit or delete of comment after 5min of formation 
     const tenMinute = 600000; // it's in milliseconds
     const timePassed = new Date().getTime() - new Date(comment.createdAt).getTime() > tenMinute;
     const canEdit = currentUserId === comment.userId && !timePassed;
     const canDelete = currentUserId === comment.userId && !timePassed;

    const createdAt=new Date(comment.createdAt).toLocaleDateString()

    //  console.log(canDelete);
    //  console.log(canEdit);
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
             
             <div className='comment-text'>
                 {comment.body}
             </div>
             <div className="comment-actions">
              { // I Have to make it to && but due to error I have kept it as or ||
              canReply || <div className="comment-action">Reply</div>}
            { canEdit || <div className="comment-action">Edit</div>}
            { canDelete ||   <div className="comment-action" onClick={()=>deleteComment(comment.id)}>Delete</div>}
             </div>
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
                        />
                    ))

                  }
                </div>} 

        </div>
    </div>
  )
}

export default Comment
