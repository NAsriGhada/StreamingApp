const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(210).json({
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
    const allUsers = await User.find().populate('videos');
    res.status(210).json({
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
    res.status(210).json({
      msg: "successful retrieval of one user",
      oneUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
