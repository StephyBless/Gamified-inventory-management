import React, { createContext, useState } from "react";

export const ApprovalContext = createContext();

export const ApprovalProvider = ({ children }) => {
  const [approvalRequests, setApprovalRequests] = useState([]);

  const sendForApproval = (packingTime) => {
    const newOrder = { id: Date.now(), packingTime };
    setApprovalRequests((prevRequests) => [...prevRequests, newOrder]);
    console.log("Order sent for approval:", newOrder);
  };

  return (
    <ApprovalContext.Provider value={{ approvalRequests, sendForApproval }}>
      {children}
    </ApprovalContext.Provider>
  );
};
