const express = require("express");
const router = express.Router();
const Reward = require("../models/Reward");

// GET all rewards (optional)
router.get("/", async (req, res) => {
  const rewards = await Reward.find();
  res.json(rewards);
});

// POST a reward
router.post("/", async (req, res) => {
  const reward = new Reward(req.body);
  await reward.save();
  res.json({ success: true });
});

module.exports = router;
