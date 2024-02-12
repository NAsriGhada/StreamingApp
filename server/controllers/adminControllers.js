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