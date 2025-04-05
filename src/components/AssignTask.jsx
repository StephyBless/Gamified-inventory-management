import React, { useState } from "react";
import "../styles/AssignTask.css";
import taskGif from "../assets/task.gif"; // Make sure this path is correct

const AssignTask = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const handleAssign = () => {
    if (!task || !deadline) {
      alert("⚠ Please enter task and deadline.");
      return;
    }

    const newTask = {
      id: Date.now(),
      description: task,
      priority,
      deadline,
      points: 20,
      assigned: true,
    };

    const existingTasks = JSON.parse(localStorage.getItem("assignedTasks")) || [];
    const updatedTasks = [...existingTasks, newTask];

    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));

    alert("✅ Task assigned successfully!");
    window.location.href = "/challenges";

    setTask("");
    setPriority("Medium");
    setDeadline("");
  };

  return (
    <div className="assign-page-wrapper">
      {/* Left Side - GIF */}
      <div className="assign-left">
        <img src={taskGif} alt="Teddy Animation" className="assign-gif" />
      </div>

      {/* Right Side - Form */}
      <div className="assign-right">
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
      </div>
    </div>
  );
};

export default AssignTask;