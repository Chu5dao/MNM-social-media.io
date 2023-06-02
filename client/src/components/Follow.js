import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

export default function Follow(userdetails) {

    const token = useSelector((state) => state.token);
    const [Follow , setFollow] = useState(PersonAddOutlined);
    const handleFollow = async(e)=>{
            await fetch(`http://localhost:3001/user/following/${userdetails._id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , token:token} , 
        })
            setFollow(PersonRemoveOutlined);
      }
  return (
    <div key={userdetails._id}>
    <div>
      <Link to={`/Profile/${userdetails._id}`}>
      <div>
        <img src={`${userdetails.profile}`} className="Profileimage" alt="" />
        <div>
          <p>{userdetails.username}</p>
          <p>Suggested for you</p>
        </div>
      </div>
      </Link>
      <div style={{ backgroundColor: "#aaa", padding: '10px', marginRight: 13, borderRadius: "50%" , cursor:'pointer' }} onClick={e=>handleFollow(userdetails._id)}>
        <img src={`${Follow}`} className="addfriend" alt=""  />
      </div>
    </div>
  </div>
  )
}

