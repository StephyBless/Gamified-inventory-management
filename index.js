const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/inventoryGame", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// === SCHEMAS ===
const ApprovalTaskSchema = new mongoose.Schema({
  id: String,
  name: String,
  packingTime: Number,
});

const RewardSchema = new mongoose.Schema({
  message: String,
  date: String,
});

const ApprovalTask = mongoose.model("ApprovalTask", ApprovalTaskSchema);
const Reward = mongoose.model("Reward", RewardSchema);

// === ROUTES ===
// ➕ Create Approval Task
app.post("/api/approvalTasks", async (req, res) => {
  const task = new ApprovalTask(req.body);
  await task.save();
  res.json(task);
});

// 📥 Get all approval tasks
app.get("/api/approvalTasks", async (req, res) => {
  const tasks = await ApprovalTask.find();
  res.json(tasks);
});

// ✅ Approve a task
app.delete("/api/approvalTasks/:id", async (req, res) => {
  await ApprovalTask.deleteOne({ id: req.params.id });
  res.json({ message: "Task approved and removed" });
});

// 🎁 Add reward
app.post("/api/rewards", async (req, res) => {
  const reward = new Reward(req.body);
  await reward.save();
  res.json(reward);
});

// 📥 Get all rewards
app.get("/api/rewards", async (req, res) => {
  const rewards = await Reward.find();
  res.json(rewards);
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
