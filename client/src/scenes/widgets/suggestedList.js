import { Box, Typography, useTheme } from "@mui/material";
import Follow from "components/Follow";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setFriends } from "state";
import axios from 'axios';


const SuggestedListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
//   const friends = useSelector((state) => state.user.friends);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  const id = user?.other?._id;
  const [users , setUsers] = useState([]);
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res = await axios.get(`http://localhost:3001/user/all/user`, {headers:{
        token: token
        }})
        setUsers(res.data);

      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  console.log(users)

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Suggested for you
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {users.map((item) => (
          <Follow userdetails={item}/>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default SuggestedListWidget;
