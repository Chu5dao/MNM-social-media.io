import express from "express";
import { getFeedPosts, getUserPosts, likePost, cmt } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import mongoose from "mongoose";
const Post = mongoose.model("Post")

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.get('/allpost', verifyToken, (req,res)=>{
    Post.find()
    .populate("postedBy", "_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
});

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

// CREATE
router.patch("/:id/cmt", verifyToken, cmt);

// router.put('/commet', verifyToken, (req,res) => {
//     const comment = {
//         text:req.body.text,
//         postBy:req.user._id
//     }
//     Post.findByIdAndUpdate(req.body.postId, {
//         $push:{comments:comment}
//     },{
//         new:true
//     })
//     .populate("comments.postedBy","_id name")
//     .exec((err,result) => {
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })

export default router;
