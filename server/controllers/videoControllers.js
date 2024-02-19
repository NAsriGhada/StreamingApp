const Video = require("../models/videoSchema");
const User = require("../models/user");
const { cloudinary } = require("../config/cloudinaryConfig");

exports.createVideo = async (req, res) => {
  // ! I used a middleware for checking
  // if (req.user.role !== "admin" || req.user.role !== "streaming_user") {
  //   return res.status(403).json({ message: "Unauthorized" });
  // }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    // TODO: Save the video URL and any additional information to your database*
    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: result.secure_url, // this is provided by the cloudinary service
      // Include other fields like duration, format, etc., if available
      uploadedBy: req.user._id, // This assumes req.user is populated from some auth middleware
    });
    const savedVideo = await video.save(); // This line actually saves the document to MongoDB

    // after uploading the videos successfully add them to the user schema
    const allVideos = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { videos: savedVideo._id },
      },
      { new: true, safe: true, upsert: true } // Return the updated document and ensure safety
    );
    console.log(allVideos);
    return res.status(200).json({
      message: "Video uploaded successfully",
      data: result,
      video: savedVideo,
      userInfo: {
        msg: "user's info with attached videos",
        allVideos,
      },
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({ message: "Error uploading video", error });
  }
};

// get all videos
exports.allVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(201).json({
      msg: "getting all videos successfully",
      videos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
};

// get one video by id
exports.oneVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Video.findById(videoId);
    res.status(201).json({
      msg: "getting one video",
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
};

// get a video's details by query parameters
exports.getVideoDetails = async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.query;
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }
    // If query parameters are present, respond with requested details
    if (title || description) {
      let videoDetails = {};
      if (title === "true") videoDetails.title = video.title;
      if (description === "true") videoDetails.description = video.description;
      return res.status(200).json({
        msg: "Getting specific video details",
        video: videoDetails,
      });
    }
    // If no specific query parameters, respond with the entire video object
    res.status(200).json({
      msg: "Getting one video",
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
};
