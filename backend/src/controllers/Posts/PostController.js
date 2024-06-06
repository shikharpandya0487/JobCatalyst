const Post = require("../../models/Post/Post.js");
const Comment = require("../../models/Comment/Comment.js");
const uploadToCloudinary = require("../../utils/uploadOnCloudinary.utils.js")


const createPost = async (req, res) => {
  try {
      const { company, title, description, tag, position, salary, location, jobtype, postedBy } = req.body;

      const file =  req.file || {};
      const filePath = file ? file.path:"";

      //upload to cloudinary
      const fileUpload = await uploadToCloudinary(filePath);

      // if (!company || !title || !description || !position || !salary || !location || !jobtype) {
      //     return res.status(422).json({ error: "Please enter all the fields" });
      // }

      const post = new Post({
          company,
          title,
          description,
          tag,
          position,
          salary, 
          location,
          jobtype,
          imgPath:fileUpload?.url||"",
          postedBy: req.user
      }); 

      const result = await post.save();
      const createdAt = new Date(result.createdAt);
      const localCreatedAt = createdAt.toLocaleString();

      return res.json({ message: "Posted Successfully", post: result, time: localCreatedAt });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPosts = async (req, res) => {
  try { 
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);
      const result = await Post.find().populate({
        path: 'comments',
        populate: { path: 'replies' }
      }).populate("postedBy", "_id username")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    

      res.json({ 
      msg: "Find success", 
      post: result,
      totalPosts: totalPosts,
      totalPages: totalPages,
      currentPage: page
    });
  } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
  }
};

const likePost = async (req, res) => {
  try {
      const postId = req.body.postId;
      const userId = req.user._id;
      console.log(postId, userId);

      await Post.findByIdAndUpdate(postId, {
          $push: { likes: userId }
      }, {
          new: true
      });

      res.json({ msg: "Liked successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const dislikePost = async (req, res) => {
  try {
      const postId = req.body.postId;
      const userId = req.user._id;
      console.log(postId, userId);

      await Post.findByIdAndUpdate(postId, {
          $pull: { likes: userId }
      }, {
          new: true
      });

      res.json({ msg: "Disliked successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const heart = async (req, res) => {
  try {
      const postId = req.body.postId;
      const userId = req.user._id;
      console.log(postId, userId);

      await Post.findByIdAndUpdate(postId, {
          $push: { heart: userId }
      }, {
          new: true
      });

      res.json({ msg: "Hearted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const disheart = async (req, res) => {
  try {
      const postId = req.body.postId;
      const userId = req.user?._id;
      console.log(postId, userId);

      await Post.findByIdAndUpdate(postId, {
          $pull: { heart: userId }
      }, {
          new: true
      });

      res.json({ msg: "Disliked successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const congrats = async (req, res) => {
  try {
      const postId = req.body.postId;
      const userId = req.user._id;
      console.log(postId, userId);

      await Post.findByIdAndUpdate(postId, {
          $push: { congrats: userId }
      }, {
          new: true
      });

      res.json({ msg: "Congratulated successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const discongrats = async (req, res) => {
  try {
      const postId = req.body.postId;
      const userId = req.user._id;
      console.log(postId, userId);

      await Post.findByIdAndUpdate(postId, {
          $pull: { congrats: userId }
      }, {
          new: true
      });

      res.json({ msg: "Disliked successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const search = async (req, res) => {
  try {
      const searchTerm = req.query.search;

      const result = await Post.find({
          $or: [
              { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search
          ]
      }).populate("postedBy", "_id username");

      res.json({ msg: "Find success", post: result });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const createComment = async (req, res) => {
  try {
    const userId = req.user?._id;
    const userName = req.user?.username;
    const { postId, text, parentCommentId } = req.body; 

    const newComment = new Comment({ text, user: userId, parentComment: parentCommentId, post: postId, username: userName });
    await newComment.save();

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ error: 'Parent comment not found' });
      }
      parentComment.replies.push(newComment);
      await parentComment.save();
    } else {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      post.comments.push(newComment);
      await post.save(); 
    }

    // Include username and userId in the response
    const responseComment = {
      _id: newComment._id,
      text: newComment.text,
      user: {
        _id: newComment.user,
        username: userName
      },
      parentComment: newComment.parentComment,
      post: newComment.post,
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt
    };

    res.status(201).json(responseComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

  
const getComments = async (req, res) => {  
    try {
        const postId = req.params.postId;

          const post = await Post.findById(postId).populate({
            path: 'comments',
            populate: {
              path: 'user', 
              select: 'username', 
            },
          }).populate({
            path: 'comments',
            populate: { path: 'replies' }, 
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

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    
    if (!comment.parent) {
      await Comment.deleteMany({ $or: [{ _id: commentId }, { parent: commentId }] });
    } else {
      await Comment.findByIdAndDelete(commentId);
    }

    res.json({ msg: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { text,postId } = req.body;
  
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      comment.text = text;
      await comment.save();
      
      const post=await Post.findById(postId) 
      console.log(post)


      
      console.log("Comment saved",comment);
  
      res.status(200).json({ message: 'Comment updated successfully',comment:comment,comments:post?.comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};


const deletePost = async (req,res)=>{

  try {
    const {postId}= req.body;
      const post = await Post.findById(postId).populate({
        path: 'postedBy',
        populate: { path: '_id' }, 
      });
      if(!post)
      {
        return res.status(404).json({ error: 'Post not found' });
      }
      const userId = post.postedBy._id;
      if(userId.toString() !== req.user._id.toString())
      {
        return res.status(200).json({message:"you cannot delete this post"})
      }
      else {
        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
  
}
  
const myPost = async (req, res) => {
  const userId = req.params.userId;
  try {
      const posts = await Post.find({ 'postedBy': userId });
      
      if (!posts || posts.length === 0) {
          return res.status(404).json({ error: 'No posts found for the given user ID' });
      }
      res.json({    
          msg: 'Find success',
          posts: posts,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;  
    console.log(postId);
    const post = await Post.findOne({ _id: postId }).populate("postedBy", "_id username");
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editPost =  async (req, res) => {
  const postId = req.params.postId;
  const updatedPostData = req.body;
  // console.log(updatedPostData);
  const file =  req.file;
  console.log("file h",req.file);
  try {
    let imagePath = '';
    if (file) {
      
      const filePath = file.path;
      const fileUpload = await uploadToCloudinary(filePath);
      
      imagePath = fileUpload?.url||"";
    }

    
    if (imagePath) {
      updatedPostData.imagePath = imagePath;
    }

      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $set: updatedPostData },
          { new: true }
      );

      if (!updatedPost) {
          return res.status(404).json({ error: 'Post not found' });
      }

      res.json({
          msg: 'Post updated successfully',
          post: updatedPost,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {createPost,getPosts,likePost,dislikePost,heart,disheart,congrats,discongrats,search,createComment,getComments,deleteComment,updateComment,deletePost,myPost,getPost,editPost}
