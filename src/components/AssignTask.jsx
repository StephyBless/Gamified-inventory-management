import React, { useState } from "react";
import "../styles/AssignTask.css";

const AssignTask = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const handleAssign = () => {
    if (!task || !deadline) {
      alert("⚠️ Please enter task and deadline.");
      return;
    }

    const newTask = {
      id: Date.now(),
      description: task,
      priority,
      deadline,
      points: 20, // default points
      assigned: true,
    };

    const existingTasks = JSON.parse(localStorage.getItem("assignedTasks")) || [];
    const updatedTasks = [...existingTasks, newTask];

    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));

    alert("✅ Task assigned successfully!");

    // 👉 Redirect to Challenges page so task is visible immediately
    window.location.href = "/challenges";

    // Clear input fields
    setTask("");
    setPriority("Medium");
    setDeadline("");
  };

  return (
    <div className="assign-task-container">
      <h2>📋 Assign a Task</h2>

      <input
        type="text"
        placeholder="Enter task description..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={handleAssign}>✅ Assign Task</button>
    </div>
  );
};

export default AssignTask;
