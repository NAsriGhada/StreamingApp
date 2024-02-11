const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false, // Set to true if you want a description to be mandatory
    },
    videoUrl: {
      type: String,
      required: true, // This will be the URL from Cloudinary
    },
    duration: {
      type: Number,
      required: false, // In seconds, if you want to keep track of video length
    },
    format: {
      type: String,
      required: false, // For example, 'mp4', 'mov', etc.
    },
    thumbnails: [
      {
        type: String, // These will be URLs to the thumbnail images on Cloudinary
        required: false,
      },
    ],
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // References the user who uploaded the video
    },
    // You can add more fields as needed, such as tags, views, likes, etc.
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
