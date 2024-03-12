// const User = require('../models/user')

// // Controller to create a new user (admin only)
// exports.createUser = async (req, res) => {
//     try {
//         // Extract user data from request body
//         const { username, email, password, role } = req.body;

//         // Check if user with the same email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User with this email already exists' });
//         }

//         // Create a new user
//         const newUser = new User({ username, email, password, role });
//         await newUser.save();

//         // Return success response
//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//         // Handle errors
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

//

// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// // Controller to create a new user (admin only)
// exports.createUser = async (req, res) => {
//   try {
//     // Extract user data from request body
//     const { username, email, password, role } = req.body;

//     // Check if user with the same email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists" });
//     }

//     // Verify JWT token to ensure admin authentication
//       const token = req.headers.authorization;
//        if (!token) {
//          return res
//            .status(401)
//            .json({ message: "Unauthorized: No token provided" });
//        }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if user is an admin
//     if (decoded.role !== "admin") {
//       return res.status(403).json({
//         message: "Forbidden: Only admins are allowed to access this resource",
//       });
//     }

//     // Create a new user
//     const newUser = new User({ username, email, password, role });
//     await newUser.save();

//     // Generate a new JWT token for the newly created user
//     const newToken = generateToken(newUser._id, newUser.role);

//     // Return success response with user details and token
//     res
//       .status(201)
//       .json({
//         message: "User created successfully",
//         user: newUser,
//         token: newToken,
//       });
//   } catch (error) {
//     // Handle errors
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Function to generate JWT token including user ID and role
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // Controller to get all users (admin only)
// exports.getAllUsers = async (req, res) => {
//     try {
//         // Retrieve all users from the database
//         const users = await User.find();

//         // Return users list
//         res.json(users);
//     } catch (error) {
//         // Handle errors
//         console.error('Error getting users:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { cloudinary } = require("../config/cloudinaryConfig");

// User Registration
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      // password: await bcrypt.hash(password, 10), // Hash the password
      password,
      role,
    });

    // hash password
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;

    // save user in the database
    await user.save();

    // Create JWT token
    const payload = {
      user: {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          err,
          message: "User created successfully",
          user: user,
          token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create JWT token
    const payload = {
      user: {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          message: "User logged in successfully",
          // user: user,
          user: {
            userId: user._id,
            username: user.username,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// current user
//token in req.headers
exports.currentUser = async (req, res) => {
  console.log(req);
  console.log(req.user);
  try {
    const currentUser = await User.findById(req.user._id);
    res.status(201).json({
      msg: "user is in the current session",
      currentUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// updating profile pictures
exports.uploadPicture = async (req, res) => {
  console.log(req.file);
  try {
    // Upload the picture to Cloudinary and get the URL
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    // Update the user's picture field with the Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Assuming req.user._id is the ID of the user whose picture is being updated
      {
        $set: { picture: result.secure_url }, // Use $set to update the picture field
      },
      { new: true } // Return the updated document
    );

    console.log(updatedUser);

    // Respond with success and the updated user information
    return res.status(200).json({
      message: "Picture uploaded successfully",
      data: result,
      updatedUser,
    });
  } catch (error) {
    console.error("Error uploading picture:", error);
    return res.status(500).json({ message: "Error uploading picture", error });
  }
};

// const userId = req.user._id;
// let pictureUrl = "";
// if (req.file) {
//   pictureUrl = req.file.filename; // Assuming you want to save the filename in the database
// }

// try {
//   // You need to correctly set the 'picture' field within the $set operation.
//   const user = await User.findByIdAndUpdate(
//     // userId,
//     { _id: req.params.id },
//     {
//       $set: {
//         ...req.body, // This spreads any other body fields you might want to update. Be cautious with spreading user-provided data.
//         picture: pictureUrl, // This sets the 'picture' field to the filename
//       },
//     },
//     { new: true }
//   ); // { new: true } option returns the document after update was applied.

//   res.status(200).json(user);
// } catch (error) {
//   console.error(error.message);
//   res.status(500).send("Server error");
// }

// update users
exports.updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { ...req.body } },
      { new: true }
    );
    console.log(updateUser)
    return res.status(200).json({
      message: "User updated successfully",
      updateUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user", error });
  }
};
