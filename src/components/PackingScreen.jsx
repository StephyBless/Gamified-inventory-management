import React, { useState, useEffect } from "react";
import "../styles/PackingScreen.css";
import packingGif from "../assets/packing.gif"; // ✅ Import your gif here

const PackingScreen = () => {
  const [timer, setTimer] = useState(0);
  const [isPacking, setIsPacking] = useState(false);
  const [itemsScanned, setItemsScanned] = useState(0);
  const totalItems = 5;

  useEffect(() => {
    let interval;
    if (isPacking) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPacking]);

  const startPacking = () => {
    setIsPacking(true);
    setTimer(0);
    setItemsScanned(0);
  };

  const scanItem = () => {
    if (itemsScanned < totalItems) {
      setItemsScanned(itemsScanned + 1);
    }
  };

  const completePacking = () => {
    if (itemsScanned < totalItems) {
      alert("Please scan all items before completing!");
      return;
    }

    const newOrder = { id: Date.now(), packingTime: timer };
    console.log("Order sent for approval:", newOrder);

    const existingRequests = JSON.parse(localStorage.getItem("approvalRequests")) || [];
    existingRequests.push(newOrder);
    localStorage.setItem("approvalRequests", JSON.stringify(existingRequests));

    setIsPacking(false);
  };

  return (
    <div className="packing-container">
      <h2>Packing Challenge</h2>

      <div className="packing-inner">
        {/* ✅ GIF on the left */}
        <img src={packingGif} alt="Packing Animation" className="packing-gif" />

        {/* ✅ Buttons and status on the right */}
        <div className="packing-content">
          <p>Time: {timer}s</p>
          <p>Scanned Items: {itemsScanned}/{totalItems}</p>

          {!isPacking ? (
            <button onClick={startPacking}>Start Packing</button>
          ) : (
            <>
              <button onClick={scanItem}>Scan Item</button>
              <button onClick={completePacking} disabled={itemsScanned < totalItems}>
                Complete Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackingScreen;