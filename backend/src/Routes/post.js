const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const router = express.Router();

const Post = require("../models/Post.js");


//CREATE POST
router.post("/create-post",requireLogin,(req,res)=>{
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

})

//GET ALL POST ON COMMUNITY PAGE 
router.get("/get-posts",(req,res)=>{
    Post.find()
        .populate("postedBy","_id username")
        .then((result) => {
            res.json({ msg: "find success", product: result });
        })
        .catch((err) => {
            res.send({ msg: "server error" });
        });
})


//LIKE PRODUCT AND ADD THEM TO THAT POST DATABASE
router.put("/like-post",requireLogin,(req,res)=>{
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
})

//DISLIKE PRODUCT AND REMOVE THEM FROM POST
router.put("/dislike-post",requireLogin,(req,res)=>{
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
})



//LIKE PRODUCT AND ADD THEM TO THAT POST DATABASE
router.put("/heart-post",requireLogin,(req,res)=>{
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
})

//DISLIKE PRODUCT AND REMOVE THEM FROM POST
router.put("/unheart-post",requireLogin,(req,res)=>{
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
})



//LIKE PRODUCT AND ADD THEM TO THAT POST DATABASE
router.put("/cong-post",requireLogin,(req,res)=>{
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
})

//DISLIKE PRODUCT AND REMOVE THEM FROM POST
router.put("/discong-post",requireLogin,(req,res)=>{
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
})




router.get("/search",(req,res)=>{
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
})

module.exports = router;