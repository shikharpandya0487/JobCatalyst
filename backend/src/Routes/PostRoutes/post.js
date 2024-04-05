const express = require("express");
const requireLogin = require("../../middlewares/requireLogin.js");
const router = express.Router();
const upload = require("../../middlewares/multer_middleware.js")
const postcontroller = require("../../controllers/Posts/PostController.js")


//CREATE POST
router.post("/create-post",requireLogin,upload.single("file"),postcontroller.createPost)

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
router.get('/get-comment/:postId', postcontroller.getComments);

//DELETE COMMENT
router.delete('/delete-comments/:commentId',requireLogin,postcontroller.deleteComment);

//UPDATE COMMENT
router.put('/update-comments/:commentId',requireLogin, postcontroller.updateComment);

//DELETE POST 
router.delete('/delete-post',requireLogin,postcontroller.deletePost);

//SEARCH THE POST ON THE BASIS OF TITLE 
router.get("/search",postcontroller.search);

//GET MYPOST 
router.get("/my-post/:userId",requireLogin,postcontroller.myPost); 

//GET A POST FROM ID
router.get("/get-post/:postId",postcontroller.getPost);

//EDIT THE POST
router.put('/edit-post/:postId',requireLogin,upload.single("file"),postcontroller.editPost);


module.exports = router;