const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const router = express.Router();

const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

const postcontroller = require("../controllers/PostController.js")

//CREATE POST
router.post("/create-post",requireLogin,postcontroller.createPost)

//GET ALL POST ON COMMUNITY PAGE 
router.get("/get-posts",postcontroller.getPosts)

//LIKE POST AND ADD THEM TO THAT POST DATABASE
router.put("/like-post",requireLogin,postcontroller.likePost)

//DISLIKE POST AND REMOVE THEM FROM POST
router.put("/dislike-post",requireLogin,postcontroller.dislikePost)

//REACT HEART ON POST AND ADD THEM TO THAT POST DATABASE
router.put("/heart-post",requireLogin,postcontroller.heart)

//DISHEART PRODUCT AND REMOVE THEM FROM POST
router.put("/unheart-post",requireLogin,postcontroller.disheart )

//LIKE PRODUCT AND ADD THEM TO THAT POST DATABASE
router.put("/cong-post",requireLogin,postcontroller.congrats)

//DISLIKE PRODUCT AND REMOVE THEM FROM POST
router.put("/discong-post",requireLogin,postcontroller.discongrats)

//ADD COMMENT
router.post('/comments',requireLogin, postcontroller.createComment)

//GET COMMENT FROM THE POST ID OF SPECIFIC POST
router.get('/:postId/get-comment', postcontroller.getComments);

//DELETE COMMENT
router.delete('/delete-comments/:commentId',postcontroller. deleteComment);

//UPDATE COMMENT
router.put('/update-comments/:commentId', postcontroller.updateComment);

//SEARCH THE POST ON THE BASIS OF TITLE
router.get("/search",postcontroller.search)

module.exports = router;