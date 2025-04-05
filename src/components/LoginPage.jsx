import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import "../styles/LoginPage.css";

const LoginPage = () => {
  const text = "GAMIFICATION IN INVENTORY MANAGEMENT";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();  // ✅ Initialize navigate function

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  // ✅ Function to handle login and navigate to Home Page
  const handleLogin = () => {
    
    navigate("/role");  // Redirect to Home Page
  };

  return (
    <div className="container">
      {/* Left Section - White Background */}
      <div className="left-section">
        <div className="login-box">
          <h2>LOGIN ❤</h2>
          <div className="hidden-fields">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            {/* ✅ Button triggers navigation on click */}
            <button onClick={handleLogin}>Sign in</button>
          </div>
        </div>
      </div>

      {/* Middle Partition with Floating Animation */}
      <div className="middle-partition">
        <div className="floating-particles"></div>
      </div>

      {/* Right Section with Typing Animation */}
      <div className="right-section">
        <h1 className="typing-container">{typedText}</h1>
        <p>Our goal is to motivate you</p>
        <span>Using Game-based Techniques</span>
        <div>Innovate, Automate, Optimize</div>
      </div>
    </div>
  );
};

export default LoginPage;
