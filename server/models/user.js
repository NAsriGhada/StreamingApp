// Import Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "streaming_user"],
      default: "user",
    },
    // Add additional fields as needed for user profile (e.g., name, avatar, etc.)
  },
  { timestamps: true }
);

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;