const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Project = mongoose.model("Project");

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
    res.redirect("/");
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create project", error: error.message });
  }
});

router.get("/new", (req, res) => {
  res.render("new-project-form");
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.redirect("back");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete project", error: error.message });
  }
});

module.exports = router;
