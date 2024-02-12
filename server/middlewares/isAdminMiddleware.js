// Middleware to check for admin role
const User = require("../models/user");

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
