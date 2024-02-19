// middleware/allowVideoUpload.js

const allowVideoUpload = (req, res, next) => {
  const { role } = req.user;
  console.log("Received headers:", req.headers); // Log all headers
  console.log("Authorization header:", req.headers.authorization); // Specifically log the Authorization header
  // Allow both admins and streamers to proceed
  if (role === "admin" || role === "streaming_user") {
    next();
  } else {
    res.status(403).json({
      message: "Forbidden: Insufficient privileges to upload videos.",
    });
  }
};

module.exports = allowVideoUpload;
