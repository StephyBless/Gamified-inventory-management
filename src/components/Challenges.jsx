import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "../styles/Challenges.css";

const Challenges = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [completedTasks, setCompletedTasks] = useState([]);
  const [score, setScore] = useState(0);

  // ✅ Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("assignedTasks")) || [];

    const enhanced = storedTasks.map((task) => ({
      ...task,
      points: task.points || 20,
      deadline: task.deadline || new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    }));

    setAssignedTasks(enhanced);
  }, []);

  // ⏱️ Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      assignedTasks.forEach((task) => {
        const diff = new Date(task.deadline) - new Date();
        updated[task.id] = diff > 0 ? Math.floor(diff / 1000) : 0;
      });
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [assignedTasks]);

  const handleTaskCompletion = (id, points) => {
    if (!completedTasks.includes(id)) {
      setCompletedTasks([...completedTasks, id]);
      setScore((prevScore) => prevScore + points);
    }
  };

  const formattedTasks = useMemo(() => {
    return assignedTasks.map((task) => {
      const remainingTime = timeLeft[task.id] || 0;
      return {
        ...task,
        timeFormatted: remainingTime > 0
          ? `${Math.floor(remainingTime / 60)}m ${remainingTime % 60}s`
          : "Expired",
        isExpired: remainingTime === 0,
      };
    });
  }, [timeLeft, assignedTasks]);

  return (
    <motion.div
      className="challenges-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <h1 className="challenges-title">🔥 Active Challenges 🔥</h1>
      <p className="scoreboard">🎯 Score: {score} Points</p>

      <div className="task-list">
        {formattedTasks.length === 0 ? (
          <p className="no-task-msg">No tasks assigned yet! 💼</p>
        ) : (
          formattedTasks.map((task) => (
            <motion.div
              key={task.id}
              className={`task-card ${completedTasks.includes(task.id) ? "completed" : ""}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2>{task.description}</h2>
              <p>🎯 Points: {task.points}</p>
              <p>🚩 Priority: {task.priority}</p>
              <p>🕒 Time Left: {task.timeFormatted}</p>

              <motion.button
                className="complete-btn"
                onClick={() => handleTaskCompletion(task.id, task.points)}
                disabled={completedTasks.includes(task.id) || task.isExpired}
                aria-label={`Mark ${task.description} as done`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {completedTasks.includes(task.id)
                  ? "✅ Completed"
                  : task.isExpired
                  ? "⏳ Expired"
                  : "Mark as Done"}
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Challenges;
