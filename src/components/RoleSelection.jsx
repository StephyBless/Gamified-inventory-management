import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RoleSelection.css";
import teddyGif from "../assets/teddy.gif"; // make sure this path is correct

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "worker") {
      navigate("/");
    } else if (role === "supervisor") {
      navigate("/sphomepage");
    }
  };

  return (
    <div className="role-selection-container">
      {/* Left side: GIF image */}
      <div className="gif-section">
        <img src={teddyGif} alt="Teddy" className="role-gif" />
      </div>

      {/* Right side: role selection */}
      <div className="role-content">
        <h2>Select Your Role</h2>
        <div className="role-buttons">
          <button onClick={() => handleRoleSelect("worker")}>🧑 I am a Worker</button>
          <button onClick={() => handleRoleSelect("supervisor")}>👨‍💼 I am a Supervisor</button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;