import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "antd";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { FaGift, FaMedal, FaTrophy, FaCalendarCheck, FaStar, FaBoxOpen } from "react-icons/fa";
import "../styles/RewardsPage.css";

const RewardsPage = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(10);
    const [streak, setStreak] = useState(3);
    const [mysteryBox, setMysteryBox] = useState(null);
    const [confetti, setConfetti] = useState(true); // Start with confetti ON
    const rewards = ["Bonus Points", "Exclusive Badge", "Discount Coupon", "Mystery Item"];

    // Animate skill progress
    useEffect(() => {
        const storedProgress = JSON.parse(localStorage.getItem("skillProgress")) || 10;

        let currentProgress = progress;
        const interval = setInterval(() => {
            if (currentProgress < storedProgress) {
                currentProgress += 1;
                setProgress(currentProgress);
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Stop confetti after 7000ms
    useEffect(() => {
        const timer = setTimeout(() => setConfetti(false), 9000);
        return () => clearTimeout(timer);
    }, []);

    const openMysteryBox = () => {
        setMysteryBox(rewards[Math.floor(Math.random() * rewards.length)]);
        setConfetti(true); // Confetti on box open
        setTimeout(() => setConfetti(false), 3000); // Confetti for 3s
    };

    return (
        <motion.div className="rewards-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {confetti && <Confetti numberOfPieces={300} gravity={0.3} />}
            
            <h2>🏆 Rewards & Achievements</h2>

            <div className="progress-section">
                <h3>🎖 Skill Progress</h3>
                <Progress percent={progress} status="active" strokeColor="#ffcc00" />
            </div>

            <div className="badges-section">
                <h3>🏅 Achievements</h3>
                <div className="badges">
                    <span><FaMedal /> Fast Packer</span>
                    <span><FaTrophy /> Top Performer</span>
                    <span><FaStar /> Speed Demon</span>
                </div>
            </div>

            <div className="streak-section">
                <h3>📅 Daily Streak</h3>
                <p>🔥 {streak} days in a row!</p>
            </div>

            <motion.div className="mystery-box" whileHover={{ scale: 1.1 }} onClick={openMysteryBox}>
                <h3> Open Mystery Box</h3>
                <FaBoxOpen size={50} />
                {mysteryBox && <p>{mysteryBox}</p>}
            </motion.div>

            <motion.button 
                className="spin-reward-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/spinwheel")}
            >
                🎡 Spin for Reward
            </motion.button>
        </motion.div>
    );
};

export default RewardsPage;
