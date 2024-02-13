const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const {
  getAllUsers,
  getOneUser,
  getAllUserswithVideos,
} = require("../controllers/adminControllers");

// get all users
router.get("/all-users", auth, isAdmin, getAllUsers);
// get all users with videos (if found)
router.get("/users-and-videos", auth, isAdmin, getAllUserswithVideos);
// get one user by their ids
router.get("/one/user/:userId", auth, isAdmin, getOneUser);

module.exports = router;
