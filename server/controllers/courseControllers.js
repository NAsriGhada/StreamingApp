const Course = require("../models/courseSchema");

exports.createCourse = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const course = new Course({
      // Assuming you have these fields in your courseSchema
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      difficulty: req.body.difficulty,
      language: req.body.language,
      videos: [], // Initialize an empty array for videos
      createdBy: req.user._id, // Reference to the admin user
    });

    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course", error });
  }
};

// Add more functions for updating, deleting, and retrieving courses as needed
