import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadVideos } from "../redux/videoSlice";

const UploadVideo = () => {
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
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Video File:</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
};

export default UploadVideo;
