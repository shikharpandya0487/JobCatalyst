const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const router = express.Router();

const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

const {createPost,getPosts,likePost,dislikePost,heart,disheart,congrats,discongrats,search,createComment,getComments,deleteComment,updateComment} = require("../controllers/PostController.js")

//CREATE POST
router.post("/create-post",requireLogin,createPost)

//GET ALL POST ON COMMUNITY PAGE 
router.get("/get-posts",getPosts)

//LIKE POST AND ADD THEM TO THAT POST DATABASE
router.put("/like-post",requireLogin,likePost)

//DISLIKE POST AND REMOVE THEM FROM POST
router.put("/dislike-post",requireLogin,dislikePost)

//REACT HEART ON POST AND ADD THEM TO THAT POST DATABASE
router.put("/heart-post",requireLogin,heart)

//DISHEART PRODUCT AND REMOVE THEM FROM POST
router.put("/unheart-post",requireLogin,disheart )

//LIKE PRODUCT AND ADD THEM TO THAT POST DATABASE
router.put("/cong-post",requireLogin,congrats)

//DISLIKE PRODUCT AND REMOVE THEM FROM POST
router.put("/discong-post",requireLogin,discongrats)

//ADD COMMENT
router.post('/comments',requireLogin, createComment)

//GET COMMENT FROM THE POST ID OF SPECIFIC POST
router.get('/:postId/get-comment', getComments);

//DELETE COMMENT
router.delete('/delete-comments/:commentId', deleteComment);

//UPDATE COMMENT
router.put('/update-comments/:commentId', updateComment);

//SEARCH THE POST ON THE BASIS OF TITLE
router.get("/search",search)

module.exports = router;