import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Challenges from "./components/Challenges";
import PackingScreen from "./components/PackingScreen";
import SupervisorDashboard from "./components/SupervisorDashboard";
import PerformancePage from "./components/PerformancePage";
import RewardsPage from "./components/RewardsPage";
import HomePage from "./components/HomePage";
import SpinWheel from "./components/SpinWheel";
import LoginPage from "./components/LoginPage";
import Levels from "./components/Levels";
import TaskPage from "./components/TaskPage";
import SpHomePage from "./components/SpHomePage";
import RoleSelection from "./components/RoleSelection"; // ✅ import it
import AssignTask from "./components/AssignTask";



function App() {
  const [approvalRequests, setApprovalRequests] = useState([]);

  // Function to add completed orders for supervisor approval
  const sendForApproval = (packingTime) => {
    const newOrder = { id: Date.now(), packingTime };
    setApprovalRequests((prevRequests) => [...prevRequests, newOrder]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/packing" element={<PackingScreen sendForApproval={sendForApproval} />} />
        <Route path="/supervisor" element={<SupervisorDashboard approvalRequests={approvalRequests} />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/spinwheel" element={<SpinWheel />} />
        <Route path="/login" element={<LoginPage />} />  {/* ✅ Added Login Route */}
        <Route path="/levels" element={<Levels />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/sphomepage" element={<SpHomePage />} />
        <Route path="/role" element={<RoleSelection />} /> {/* ✅ Role Selection Route */}
        <Route path="/assign-task" element={<AssignTask />} />
        

      </Routes>
    </Router>
  );
}

export default App;
