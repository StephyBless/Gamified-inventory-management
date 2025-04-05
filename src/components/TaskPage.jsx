import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/TaskPage.css";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const approvedTasks = JSON.parse(localStorage.getItem("approvedTasks")) || [];
    setTasks(approvedTasks);
  }, []);

  const handleApprovedClick = (task) => {
    const taskCompletionMessage = `${task.name} ${new Date().toLocaleDateString()} is completed`;

    let rewards = JSON.parse(localStorage.getItem("rewards")) || [];

    if (!rewards.includes(taskCompletionMessage)) {
      rewards.push(taskCompletionMessage);
      localStorage.setItem("rewards", JSON.stringify(rewards));
    }

    let progress = JSON.parse(localStorage.getItem("skillProgress")) || 50;
    progress = Math.min(progress + 10, 100);
    localStorage.setItem("skillProgress", JSON.stringify(progress));

    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    localStorage.setItem("approvedTasks", JSON.stringify(updatedTasks));

    navigate("/rewards");
  };

  return (
    <div className="task-page">
      <h2>📋 Approved Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">🎉 No pending approved tasks!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item approved">
              {task.name} - <span className="status">Approved</span>
              <button className="approve-btn" onClick={() => handleApprovedClick(task)}>
                <FaCheckCircle /> Mark as Completed
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskPage;
