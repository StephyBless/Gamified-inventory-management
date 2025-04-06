const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  message: String,
  date: String,
});

module.exports = mongoose.model("Reward", rewardSchema);
