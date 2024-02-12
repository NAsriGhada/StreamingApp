const { createVideo } = require("../controllers/videoControllers");
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
  multerMiddleware.single("video"),
  allowVideoUpload,
  createVideo
);

module.exports = router;

