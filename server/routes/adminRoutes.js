const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const { getAllUsers } = require("../controllers/adminControllers");


router.get("/all-users", auth, isAdmin, getAllUsers);


module.exports = router;
