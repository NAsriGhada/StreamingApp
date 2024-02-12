const Video = require("../models/videoSchema");
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
    return res.status(200).json({
      message: "Video uploaded successfully",
      data: result,
      vid: savedVideo,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({ message: "Error uploading video", error });
  }
};
