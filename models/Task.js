const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: String,
  name: String,
  packingTime: Number,
});

module.exports = mongoose.model("Task", taskSchema);
