const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import the Project model
const Project = mongoose.model("Project");

// Route to create a new project
router.post("/", async (req, res) => {
  try {
    const { name, description, price, finished_jobs, start_date, end_date } =
      req.body;
    const project = new Project({
      name,
      description,
      price,
      finished_jobs,
      start_date,
      end_date,
    });
    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create project", error: error.message });
  }
});

module.exports = router;
