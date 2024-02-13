const User = require("../models/user");
const Video = require("../models/videoSchema");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(201).json({
      msg: "successful retrieval of all users",
      allUsers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// with videos
exports.getAllUserswithVideos = async (req, res) => {
  try {
    // add videos array to the user schema after a successful upload from the video controllers
    const allUsers = await User.find().populate("videos");
    res.status(201).json({
      msg: "successful retrieval of all users",
      allUsers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const oneUser = await User.findById(userId);
    res.status(201).json({
      msg: "successful retrieval of one user",
      oneUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(201).json({
      msg: "user has been deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// delete users and their videos by id
exports.deleteUserAndVideo = async (req, res) => {
  const { userId } = req.params;
  try {
    // First, find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Then, delete all videos uploaded by this user
    const deleteVideo = await Video.deleteMany({ uploadedBy: userId });
    // Send back a successful response
    res.status(200).json({
      msg: "User and all associated videos successfully deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
