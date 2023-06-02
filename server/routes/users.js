import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";


const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// SEARCH
router.get('/search', verifyToken, getUser);

//get user to follow
router.get("/all/user", verifyToken, async(req , res)=>{
  try {
      const allUser = await User.find();
      const user = await User.findById(req.user.id);
      const followinguser = await Promise.all(
          user.Following.map((item)=>{
              return item;
          })
      )
      let UserToFollow = allUser.filter((val)=>{
          return !followinguser.find((item)=>{
              return val._id.toString()===item;
          })
      })

      let filteruser = await Promise.all(
          UserToFollow.map((item)=>{
              const {email , Follower , Following , password , ...others} = item._doc;
              return others
          })
      )

      res.status(200).json(filteruser)
  } catch (error) {
      
  }
})

//Following
router.put("/following/:id" , verifyToken , async(req , res)=>{
  if(req.params.id !== req.body.user){
      const user = await User.findById(req.params.id);
      const otheruser = await User.findById(req.body.user);

      if(!user.Followers.includes(req.body.user)){
          await user.updateOne({$push:{Followers:req.body.user}});
          await otheruser.updateOne({$push:{Following:req.params.id}});
          return res.status(200).json("User has followed");
      }else{
          await user.updateOne({$pull:{Followers:req.body.user}});
          await otheruser.updateOne({$pull:{Following:req.params.id}});
          return res.status(200).json("User has Unfollowed");
      }
  }else{
      return res.status(400).json("You can't follow yourself")
  }
})

export default router;
