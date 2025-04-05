import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/SpHomePage.css";

const SpHomePage = () => {
  const navigate = useNavigate();
  const [isProfileVisible, setProfileVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  useEffect(() => {
    document.title = "Supervisor Home";
  }, []);

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="top-right-buttons">
        <button className="department-btn">Department</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="profile-icon" onClick={() => setProfileVisible(!isProfileVisible)}>
        👤
      </div>
      {isProfileVisible && (
        <div className="hidden-profile">
          <p>Supervisor Profile</p>
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
        Supervisor Panel
      </motion.h1>

      <motion.div 
        className="nav-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* ✅ Link to Supervisor Dashboard */}
        <Link to="/supervisor" className="home-btn">
          Go to Supervisor Dashboard
        </Link>

        {/* ✅ Link to Assign Task Page */}
  <Link to="/assign-task" className="home-btn">
    Assign Task to Worker
  </Link>
  
      </motion.div>
    </motion.div>
  );
};

export default SpHomePage;
