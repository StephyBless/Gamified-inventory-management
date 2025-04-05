import React, { useState, useEffect } from "react";
import "../styles/SupervisorDashboard.css";

const SupervisorDashboard = () => {
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load pending approvals from localStorage
    const storedRequests = JSON.parse(localStorage.getItem("approvalRequests")) || [];
    setApprovalRequests(storedRequests);

    if (storedRequests.length > 0) {
      const newOrder = storedRequests[storedRequests.length - 1]; // Get latest order
      const message = `New packing approval request! Order ID: ${newOrder.id}`;
      setNotifications((prev) => [...prev, message]);

      // Send desktop notification if enabled
      if (Notification.permission === "granted") {
        new Notification("Packing Approval", { body: message });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Packing Approval", { body: message });
          }
        });





        
      }
    }
  }, []);

  const approveOrder = (orderId) => {
    // Find the approved order
    const approvedOrder = approvalRequests.find((order) => order.id === orderId);
    if (!approvedOrder) return;

    // Remove order from pending approvals
    const updatedRequests = approvalRequests.filter((order) => order.id !== orderId);
    setApprovalRequests(updatedRequests);
    localStorage.setItem("approvalRequests", JSON.stringify(updatedRequests));

    // Save approved task in localStorage
    let approvedTasks = JSON.parse(localStorage.getItem("approvedTasks")) || [];
    approvedTasks.push({ id: orderId, name: `Order ${orderId}` });
    localStorage.setItem("approvedTasks", JSON.stringify(approvedTasks));

    // Notify user
    setNotifications([...notifications, `Order ${orderId} approved ✅`]);

    // Trigger TaskPage update
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="supervisor-wrapper">  {/* This ensures background only for this page */}
      <div className="supervisor-container">
        <h2>Supervisor Dashboard</h2>

        <h3>Notifications 🔔</h3>
<ul className="notifications-list">
  {notifications.map((note, index) => (
    <li key={index}>{note}</li>
  ))}
</ul>

<h3>Pending Approvals</h3>
{approvalRequests.length === 0 ? (
  <p>No pending orders</p>
) : (
  <ul className="pending-approvals">
    {approvalRequests.map((order) => (
      <li key={order.id}>
        Packing Time: {order.packingTime}s
        <button onClick={() => approveOrder(order.id)}>Approve</button>
      </li>
    ))}
  </ul>
)}



      </div>
    </div>
  );
  
};

export default SupervisorDashboard;
