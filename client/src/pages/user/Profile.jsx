// import React from "react";
// import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";

// const Profile = () => {
//   // Accessing user information from auth slice of Redux store
//   const user = useSelector((state) => state.auth.user);
//   console.log(user);
//   if (!user) {
//     // Handle the case when user is null, e.g., display a loading indicator or a message
//     return <div>Loading...</div>;
//   }
//   return (
//     <div>
//       <NavBar />
//       Profile's {user.username}
//     </div>
//   );
// };

// export default Profile;

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../redux/authSlice";

export default function Profile() {
  const theme = useTheme();
  // Accessing user information from auth slice of Redux store
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(user);
  if (!user) {
    // Handle the case when user is null, e.g., display a loading indicator or a message
    return <div>Loading...</div>;
  }

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   navigate("/login"); // Redirect to login page after logout
  // };

  return (
    <>
      <NavBar />
      <p>{user.username}'s profile</p>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Mac Miller
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
      </Card>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </>
  );
}
