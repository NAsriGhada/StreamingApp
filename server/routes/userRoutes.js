const express = require("express");
const router = express.Router();
const {
  register,
  login,
  currentUser,
  uploadPicture,
} = require("../controllers/userControllers");
const { auth } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");



// anyone can register
router.post("/register", register);
// anyone can login
router.post("/login", login);
// anyone can stay online
router.get("/current", auth, currentUser);
router.put(
  "/upload-picture/:id",
  auth,
  multerMiddleware.single("myPhoto"),
  uploadPicture
);

module.exports = router;

