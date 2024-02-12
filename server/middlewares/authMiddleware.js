// // middleware/authMiddleware.js

// const jwt = require("jsonwebtoken");

// // Middleware to verify JWT token
// exports.verifyToken = (req, res, next) => {
//   // Get token from request headers
//   const token = req.headers.authorization;

//   // Check if token is provided
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if user is an admin
//     if (decoded.role !== "admin") {
//       return res
//         .status(403)
//         .json({
//           message: "Forbidden: Only admins are allowed to access this resource",
//         });
//     }

//     // Attach user information to request object
//     req.user = decoded;

//     // Call next middleware
//     next();
//   } catch (err) {
//     // Token is invalid or expired
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// Middleware to validate token and attach user to request
// exports.auth = async (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

exports.auth = async (req, res, next) => {
  // Check if the Authorization header is present
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract the token from the Authorization header
  const token = tokenHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded
    // req.user = decoded.user;
    // coming from the token's payload
    req.user = {
      _id: decoded.user.userId,
      role: decoded.user.role,
    };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
