import React, { useState, useEffect } from "react";
import "../styles/SupervisorDashboard.css";
import lookGif from "../assets/look.gif"; // adjust path if needed

const SupervisorDashboard = () => {
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("approvalRequests")) || [];
    setApprovalRequests(storedRequests);

    if (storedRequests.length > 0) {
      const newOrder = storedRequests[storedRequests.length - 1];
      const message = `New packing approval request! Order ID: ${newOrder.id}`;
      setNotifications((prev) => [...prev, message]);

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
    const approvedOrder = approvalRequests.find((order) => order.id === orderId);
    if (!approvedOrder) return;

    const updatedRequests = approvalRequests.filter((order) => order.id !== orderId);
    setApprovalRequests(updatedRequests);
    localStorage.setItem("approvalRequests", JSON.stringify(updatedRequests));

    let approvedTasks = JSON.parse(localStorage.getItem("approvedTasks")) || [];
    approvedTasks.push({ id: orderId, name: `Order ${orderId}` });
    localStorage.setItem("approvedTasks", JSON.stringify(approvedTasks));

    setNotifications([...notifications, `Order ${orderId} approved ✅`]);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="supervisor-wrapper">
      <div className="supervisor-layout">
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

        <div className="gif-right-wrapper">
          <img src={lookGif} alt="look" className="dashboard-gif" />
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
