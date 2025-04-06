const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  await Task.deleteOne({ id: req.params.id });
  res.json({ success: true });
});

module.exports = router;
