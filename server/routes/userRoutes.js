const express = require("express");
const router = express.Router();
const {
  register,
  login,
  currentUser,
} = require("../controllers/userControllers");
const { auth } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");


// anyone can register
router.post("/register", register);
// anyone can login
router.post("/login", login);
// anyone can stay online
router.get("/current", auth, currentUser);

module.exports = router;

