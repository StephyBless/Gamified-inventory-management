import React, { useState } from "react";
import Confetti from "react-confetti";
import "../styles/SpinWheel.css";

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [blastConfetti, setBlastConfetti] = useState(false); // Confetti only after spin

  const rewards = [
    "Bonus Points",
    "Exclusive Badge",
    "Mystery Gift",
    "Discount Coupon",
    "XP Boost",
    "Try Again"
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const newRotation = rotation + 1800 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);

      const selectedReward = rewards[
        Math.floor((newRotation % 360) / (360 / rewards.length))
      ];
      alert(`🎉 You won: ${selectedReward}!`);

      // Trigger confetti
      setBlastConfetti(true);
      setTimeout(() => setBlastConfetti(false), 7000); // Confetti lasts 7s
    }, 3000);
  };

  return (
    <div className="spin-wheel-container">
      {blastConfetti && <Confetti numberOfPieces={400} gravity={0.3} />}
      
      <h2>🎡 Spin & Win Rewards</h2>
      <div className="pointer"></div>
      
      <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
        {rewards.map((reward, index) => (
          <div
            key={index}
            className="segment"
            style={{ transform: `rotate(${index * (360 / rewards.length)}deg)` }}
          >
            {reward}
          </div>
        ))}
      </div>
      
      <button className="spin-btn" onClick={spinWheel} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin the Wheel"}
      </button>
    </div>
  );
};

export default SpinWheel;
