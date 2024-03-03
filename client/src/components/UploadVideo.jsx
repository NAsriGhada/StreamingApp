import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadVideos } from "../redux/videoSlice";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadVideo = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.auth.user.userId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    // uploadedBy: user,
  });
  // Handles changes in the text inputs and updates state accordingly
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handles file selection and updates state
  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };
  // Prepares and dispatches the form data when the form is submitted
  // since we're uploading files, we can either stringify json or use the form below
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Initialize a new FormData object
    const uploadFormData = new FormData();
    uploadFormData.append("title", formData.title);
    uploadFormData.append("description", formData.description);
    if (formData.video) {
      uploadFormData.append("video", formData.video);
    }
    // Dispatch the action to upload the video, passing the FormData object
    dispatch(uploadVideos(uploadFormData));
    navigate("/profile");
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="form-label">Video File:</label>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
                required
                className="form-control form-control-lg"
              />
            </div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="submit" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
