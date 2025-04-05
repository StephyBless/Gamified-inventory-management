const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/inventoryGame", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const approvalSchema = new mongoose.Schema({
  employeeId: String,
  packingTime: Number,
  status: { type: String, default: "pending" },
});

const Approval = mongoose.model("Approval", approvalSchema);

// Fetch all pending approvals
app.get("/api/approvalRequests", async (req, res) => {
  const requests = await Approval.find({ status: "pending" });
  res.json(requests);
});

// Approve an order
app.post("/api/approveOrder", async (req, res) => {
  const { orderId } = req.body;
  await Approval.findByIdAndUpdate(orderId, { status: "approved" });
  res.json({ message: "Order approved" });
});

// Reject an order
app.post("/api/rejectOrder", async (req, res) => {
  const { orderId } = req.body;
  await Approval.findByIdAndUpdate(orderId, { status: "rejected" });
  res.json({ message: "Order rejected" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
