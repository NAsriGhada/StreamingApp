const {
  createVideo,
  allVideos,
  oneVideo,
  getVideoDetails,
} = require("../controllers/videoControllers");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const { auth } = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");
const express = require("express");
const allowVideoUpload = require("../middlewares/allowVideoUpload");

const router = express.Router();

// ! only admin can upload
// router.post(
//   "/videos/upload",
//   multerMiddleware.single("video"),
//   auth,
//   isAdmin,
//   createVideo
// );
// module.exports = router;

// ! admin and streamers can upload
router.post(
  "/videos/upload",
  auth,
  allowVideoUpload,
  multerMiddleware.single("video"),
  createVideo
);

//get all videos for all users
router.get("/all/videos", auth, allVideos);

// get one video
router.get("/one/video/:videoId", auth, oneVideo);

// get one video with specific details
router.get("/detail/video/:videoId", auth, getVideoDetails);


module.exports = router;

