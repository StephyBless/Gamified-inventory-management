import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "../styles/Levels.css";

const levelThresholds = [0, 100, 250, 450, 700, 1000]; // XP needed per level
const unlocks = [
  "🚀 Fast Packing Mode Unlocked",
  "🔍 Advanced Inventory Tracking Unlocked",
  "🏆 Bonus Rewards Feature Unlocked",
  "🛍️ Special Store Discounts Unlocked",
  "🔥 Prestige Mode Unlocked",
];

const Levels = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let newLevel = levelThresholds.findIndex(threshold => xp < threshold);
    if (newLevel === -1) newLevel = levelThresholds.length;
    
    if (newLevel > level) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
    }
    
    setLevel(newLevel);
  }, [xp]);

  const addXP = () => {
    setXp(prevXp => Math.min(prevXp + 50, 1000)); // Increment XP by 50
  };

  return (
    <motion.div 
      className="levels-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {showConfetti && <Confetti numberOfPieces={200} />}
      
      <h1 className="levels-title">🎮 Level {level}</h1>
      <p className="xp-text">🔥 XP: {xp} / {levelThresholds[level] || "Max"}</p>

      <div className="xp-bar-container">
        <motion.div 
          className="xp-bar"
          style={{ width: `${(xp / (levelThresholds[level] || xp)) * 100}%` }}
          animate={{ width: `${(xp / (levelThresholds[level] || xp)) * 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      <button className="add-xp-btn" onClick={addXP}>➕ Earn XP</button>

      <div className="unlocks">
        <h2>🔓 Unlocks</h2>
        {unlocks.map((item, index) => (
          <motion.div 
            key={index}
            className={`unlock-item ${index < level ? "unlocked" : "locked"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {index < level ? `✅ ${item}` : `🔒 ${item}`}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Levels;
