const multer = require("multer");
const path = require("path");

// Set up the storage engine for multer, which determines where and how files are saved
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // This is the uploads directory where files will be saved
  },
  filename: function (req, file, cb) {
    // Create a unique filename with the original name and current timestamp
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize the multer middleware with the storage engine and file filter (if any)
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept video files only
    if (!file.originalname.match(/\.(mp4|mov|avi|wmv|flv)$/)) {
      return cb(new Error("Only video files are allowed!"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;

// const multer = require("multer");

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads/"); // Make sure this directory exists
//   },
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

// // Initialize multer with the storage options
// const upload = multer({ storage: storage });

// module.exports = upload;
