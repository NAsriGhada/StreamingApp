import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { fetchCurrentUser, uploadProfilePicture } from "../../redux/authSlice";


export default function UpdateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams(); // Ensure this matches your routing parameter


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadProfilePicture({ userId, file }))
        .unwrap()
        .then(() => {
          console.log("Profile picture updated successfully");
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