const Video = require("../models/videoSchema");
const { cloudinary } = require("../config/cloudinaryConfig");

exports.uploadVideo = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    // TODO: Save the video URL and any additional information to your database*
    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: result.secure_url,
      // Include other fields like duration, format, etc., if available
      uploadedBy: req.user._id, // This assumes req.user is populated from some auth middleware
    });

    return res.status(200).json({
      message: "Video uploaded successfully",
      data: result,
      vid: video
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({ message: "Error uploading video", error });
  }
};