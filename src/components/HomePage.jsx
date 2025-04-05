import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  
  const [showProfile, setShowProfile] = useState(false);
  const [showDepartmentList, setShowDepartmentList] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear any stored session data
    navigate("/login"); // ✅ Corrected navigation to Login Page
  };

  useEffect(() => {
    document.title = "Welcome Home";
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowDepartmentList(false);
  };

  const toggleDepartmentList = () => {
    setShowDepartmentList(!showDepartmentList);
    setShowProfile(false);
  };


  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="top-bar">
        <div className="top-right-buttons">
          <button className="department-btn" onClick={toggleDepartmentList}>Department</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <div className="profile-icon-wrapper" onClick={toggleProfile}>
          <div className="profile-icon" onClick={() => setShowProfile(!showProfile)}>
        👤
      </div>

      </div>

        </div>

      {showProfile && (
        <div className="profile-container">
          <div className="narrow-column">
            <div className="upload-profile">Upload</div>
            <div className="icon-container">
              <div className="icon-row">
                <div className="icon" onClick={() => document.getElementById('icon2-detail').innerHTML = 'StephyBless'}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <rect x="6" y="14" width="12" height="6" />
                  </svg>
                </div>
                <div id="icon2-detail" className="detail-container">Click to view</div>
              </div>
              <div className="icon-row">
                <div className="icon" onClick={() => document.getElementById('icon3-detail').innerHTML = 'Packer'}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <rect x="6" y="14" width="12" height="6" />
                  </svg>
                </div>
                <div id="icon3-detail" className="detail-container">Click to view</div>
              </div>
              <div className="icon-row">
                <div className="icon" onClick={() => document.getElementById('icon4-detail').innerHTML = 'Packing'}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <rect x="6" y="14" width="12" height="6" />
                  </svg>
                </div>
                <div id="icon4-detail" className="detail-container">Click to view</div>
              </div>
            </div>
          </div>
        </div>
      )}

{showDepartmentList && (
        <div className="department-list">
          <ul>
            <li>Shipping</li>
            <li>Finance</li>
            <li>Manager</li>
            <li>Manufacturer</li>
          </ul>
        </div>
      )}


      <div className="animated-bg"></div>
      <div className="glow-effect"></div>

      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
         Inventory (packing)
      </motion.h1>

      <motion.p 
        className="subtitle"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Master every order, beat the clock, and earn your rewards!
      </motion.p>

      <motion.div 
        className="nav-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Link to="/challenges" className="home-btn">CHALLENGES</Link>
        <Link to="/packing" className="home-btn">START PACKING</Link>
        
        <Link to="/performance" className="home-btn">PERFORMANCE</Link>
        <Link to="/rewards" className="home-btn">REWARDS</Link>
        <Link to="/levels" className="home-btn">LEVELS</Link>
        <Link to="/tasks" className="home-btn">TASKS</Link>
      </motion.div>

      <motion.div 
        className="floating-icons"
        initial={{ y: -10 }} 
        animate={{ y: 10 }} 
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
      >
        
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
