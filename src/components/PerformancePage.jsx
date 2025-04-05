import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import "../styles/PerformancePage.css";

const performanceData = [
  { name: "Mon", orders: 5, speed: 8 },
  { name: "Tue", orders: 8, speed: 6 },
  { name: "Wed", orders: 6, speed: 7 },
  { name: "Thu", orders: 9, speed: 5 },
  { name: "Fri", orders: 7, speed: 9 },
];

const leaderboardData = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 90 },
  { name: "Charlie", score: 85 },
];

const taskCompletion = [{ name: "Goal", value: 80 }];

const PerformancePage = () => {
  const [ordersPacked, setOrdersPacked] = useState(0);
  const [packingSpeed, setPackingSpeed] = useState(0);
  const [quote, setQuote] = useState("");

  const quotes = [
    "Success is no accident!",
    "Hard work beats talent!",
    "Stay focused and never give up!",
  ];

  useEffect(() => {
    setOrdersPacked(50);
    setPackingSpeed(7.5);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div className="performance-container" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      <motion.div className="background-animation" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 5 }}></motion.div>
      <h2 className="title">🏆 Performance Dashboard</h2>
      
      <div className="badges">
        <span>🥇 Fast Packer</span>
        <span>⚡ Speed Demon</span>
        <span>🔥 Top Performer</span>
      </div>
      
      <div className="stats-container">
        <motion.div className="stats-card" whileHover={{ scale: 1.1 }}>
          <h3 class="clrt1">📦 Orders Packed</h3>
          <p>{ordersPacked}</p>
        </motion.div>
        <motion.div className="stats-card" whileHover={{ scale: 1.1 }}>
          <h3 class="clrt2">⚡ Avg Packing Speed</h3>
          <p>{packingSpeed} sec/item</p>
        </motion.div>
      </div>
      
      <div className="charts-container">
        <motion.div className="chart-card" whileHover={{ scale: 1.05 }}>
          <h3 class="clrt3">📈 Orders Packed Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#ff6384" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        
        <motion.div className="chart-card" whileHover={{ scale: 1.05 }}>
          <h3 class="clrt4">⚡ Packing Speed Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="speed" fill="#36a2eb" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      
      <motion.div className="leaderboard-card" whileHover={{ scale: 1.05 }} animate={{ y: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <h3 class="clrt5">🏅 Leaderboard</h3>
        <ul>
          {leaderboardData.map((player, index) => (
            <li key={index}>{index + 1}. {player.name} - {player.score} pts</li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div className="gauge-card" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
        <h3 class="clrt6">🎯 Task Completion</h3>
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart innerRadius="90%" outerRadius="100%" data={taskCompletion} startAngle={90} endAngle={-270}>
            <RadialBar minAngle={15} label={{ fill: "#ff6384", position: "insideStart" }} background clockWise dataKey="value" fill="#ff6384" />
          </RadialBarChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div className="quote-box" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
        <h3 class="clrt7">💡 Motivation</h3>
        <p>{quote}</p>
      </motion.div>
    </motion.div>
  );
};

export default PerformancePage;
