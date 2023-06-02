import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [dataComment, setdataComment] = useState();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const makeComment = (text, portId) => {
    fetch('/comment', {
      method: "post",
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
    .then(result=>{
      console.log(result)
      const newData = dataComment.map(item=>{
        if(item._id===result._id){
          return result
        }else{
          return item
        }
      })
      setdataComment(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('/allpost', {
      headers:{
        "Authorization": "Bearer"+ localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
    .then(result=>{
      setData(result.posts)
    })
  },[])

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton 
            onClick={() => setIsComments(!isComments)}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      <Box mt="0.5rem">
            <Box >
              {
                data.map(item=>{
                  return(
                    <>
                      <Divider />
                      <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                        {item.postedBy.name}
                      </Typography>
                    </>
                  )
                })
              }
              
            </Box>

        </Box>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
          <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
            <form className="formCmt" action="" onSubmit={(e)=>{
              e.preventDefault()
              // makeComment(e.target[0].value,item._id)
            }}>
              <input className="inputCmt" type="text" placeholder="Add comment"/>
              <SendRoundedIcon sx={{margin: "0 6px 0 0"}}/>
            </form>
          </Typography>
          <Divider />


        </Box>
      )}
      {/* {
      dataComment.map(item => {
        return(
          <>
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
            <form className="formCmt" action="" onSubmit={(e)=>{
              e.preventDefault()
              makeComment(e.target[0].value,item._id)
            }}>
              <input className="inputCmt" type="text" placeholder="Add comment"/>
              <SendRoundedIcon sx={{margin: "0 6px 0 0"}}/>
            </form>
          </Typography>
          <Divider />
          </>
          )})
          } */}
    </WidgetWrapper>
  );
};

export default PostWidget;
