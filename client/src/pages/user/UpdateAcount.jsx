import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { fetchCurrentUser, uploadProfilePicture } from "../../redux/authSlice";
import SpinnerLoading from "../../components/spinner/SpinnerLoading";


export default function UpdateAccount() {
  const user = useSelector((state) => state.auth.user);
  console.log("user from upload picture", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams(); // Ensure this matches your routing parameter
    const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
          setIsLoading(true);
      dispatch(uploadProfilePicture({ userId, file }))
        .unwrap()
        .then(() => {
          console.log("Profile picture updated successfully");
                  setIsLoading(false);
          dispatch(fetchCurrentUser());
          navigate("/profile");
        })
        .catch((error) =>
          console.error("Error updating profile picture:", error)
        );
    }
  };

  return (
    <div>
      {isLoading ? <SpinnerLoading /> : null}
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};