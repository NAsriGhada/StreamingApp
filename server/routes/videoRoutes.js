const { uploadVideo } = require("../controllers/videoControllers");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const { auth } = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");
const express = require("express");

const router = express.Router();

router.post(
  "/videos/upload",
  multerMiddleware.single("video"),
  auth,
  isAdmin,
  uploadVideo
);
module.exports = router;

