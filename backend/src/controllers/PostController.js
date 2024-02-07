const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

module.exports.createPost = (req,res)=>{
    const { company,title,description,tag,position,salary,location,jobtype,postedBy } = req.body;
    if(!company || !title || !description || !position || !salary || !location || !jobtype)
    {
        return res.status(422).json({error:"please enter all the feilds"});
    }
    const post = new Post({
        company,
        title,
        description,
        tag,
        position,
        salary,
        location,
        jobtype,
        postedBy: req.user
    })
    post.save()
    .then((result) => {
        const createdAt = new Date(result.createdAt); 
        const localCreatedAt = createdAt.toLocaleString();
        return res.json({ message: "Posted Successfully", post: result, time: localCreatedAt })
    }).catch(err => console.log(err))

}

module.exports.getPosts = (req,res)=>{
    Post.find()
        .populate("postedBy","_id username")
        .then((result) => {
            res.json({ msg: "find success", product: result });
        })
        .catch((err) => {
            res.send({ msg: "server error" });
        });
}

module.exports.likePost = (req,res)=>{
    let postId = req.body.postId;
    let userId = req.user._id;
    console.log(postId,userId);
    Post.findByIdAndUpdate( postId ,{
        $push:{likes:userId}
    },{
        new:true
    }).then(() => {
        res.send({ msg: "liked sucessfully" })
    }).catch((error) => {
        res.send({ msg: 'server error' })
    })
}

module.exports.dislikePost = (req,res) => {
    let postId = req.body.postId;
    let userId = req.user._id;
    console.log(postId,userId);
    Post.findByIdAndUpdate( postId ,{
        $pull:{likes:userId}
    },{
        new:true
    }).then(() => {
        res.send({ msg: "dislike sucessfully" })
    }).catch((error) => {
        res.send({ msg: 'server error' })
    })
}

module.exports.heart = (req,res)=>{
  let postId = req.body.postId;
  let userId = req.user._id;
  console.log(postId,userId);
  Post.findByIdAndUpdate( postId ,{
      $push:{heart:userId}
  },{
      new:true
  }).then(() => {
      res.send({ msg: "liked sucessfully" })
  }).catch((error) => {
      res.send({ msg: 'server error' })
  })
}

module.exports.disheart =(req,res)=>{
  let postId = req.body.postId;
  let userId = req.user._id;
  console.log(postId,userId);
  Post.findByIdAndUpdate( postId ,{
      $pull:{heart:userId}
  },{
      new:true
  }).then(() => {
      res.send({ msg: "dislike sucessfully" })
  }).catch((error) => {
      res.send({ msg: 'server error' })
  })
}

module.exports.congrats = (req,res)=>{
  let postId = req.body.postId;
  let userId = req.user._id;
  console.log(postId,userId);
  Post.findByIdAndUpdate( postId ,{
      $push:{congrats:userId}
  },{
      new:true
  }).then(() => {
      res.send({ msg: "liked sucessfully" })
  }).catch((error) => {
      res.send({ msg: 'server error' })
  })
}

module.exports.discongrats = (req,res)=>{
  let postId = req.body.postId;
  let userId = req.user._id;
  console.log(postId,userId);
  Post.findByIdAndUpdate( postId ,{
      $pull:{congrats:userId}
  },{
      new:true
  }).then(() => {
      res.send({ msg: "dislike sucessfully" })
  }).catch((error) => {
      res.send({ msg: 'server error' })
  })
}

module.exports.search= (req,res)=>{
    let search = req.query.search;

    Post.find({
        $or: [
            { title: { $regex: search } },
        ]
    })
    .populate("postedBy","_id username")
        .then((result) => {
            res.send({ msg: "find success", post: result });
        })
        .catch((err) => {
            res.send({ msg: "server errorr" });
        });
}

module.exports.createComment =  async (req, res) => {
    try {
      userId = req.user._id;
      const { postId, text, parentCommentId } = req.body; 

      const newComment = new Comment({ text, user: userId, parentComment:parentCommentId,post:postId });
      await newComment.save();
  
      if (parentCommentId) {

        console.log("yes")
        const parentComment = await Comment.findById(parentCommentId);
        if (!parentComment) {
          return res.status(404).json({ error: 'Parent comment not found' });
        }
        console.log(newComment);
        parentComment.replies.push(newComment);
        await parentComment.save();
      } else {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        // console.log(newComment);
        post.comments.push(newComment);
        await post.save(); 
      }
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};
  
module.exports.getComments = async (req, res) => {  
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(400).json({ error: 'postId is required in the request body' });
          }
      
          const post = await Post.findById(postId).populate({
            path: 'comments',
            populate: {
              path: 'user', // Populate the user details for each comment
              select: 'username', // Select the fields you want to include
            },
          }).populate({
            path: 'comments',
            populate: { path: 'replies' }, // Populate the replies for each comment
          });
      
          if (!post) {
            return res.status(404).json({ error: 'Post not found' });
          }
      
          const comments = post.comments;
      
          res.status(200).json(comments);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
};

module.exports.deleteComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const comment = await Comment.findById(commentId);
      console.log(comment)
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      console.log(comment.parentComment);
      // Check if the comment is a parent comment or a reply
      if (comment.parentComment) {
        // If it's a reply, remove it from the parent comment's replies array
        const parentComment = await Comment.findById(comment.parentComment);
        if (parentComment) {
          parentComment.replies = parentComment.replies.filter(replyId => replyId.toString() !== commentId);
          await parentComment.save();
        }
      } else {
        // If it's a parent comment, remove it from the post's comments array
        console.log(comment.post)
        const post = await Post.findByIdAndUpdate(
          comment.post, // Assuming you have a 'post' field in the Comment model referencing the Post
          { $pull: { comments: commentId } },
          { new: true }
        );
  
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
      }
  
        // Delete the comment
        await comment.deleteOne();
  
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};

module.exports.updateComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { text } = req.body;
  
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Update the text of the comment
      comment.text = text;
      await comment.save();
  
      // Update the text of all replies
      await Comment.updateMany({ parentComment: commentId }, { $set: { text } });
  
      res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};
  