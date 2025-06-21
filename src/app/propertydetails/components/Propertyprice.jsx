"use client";
import { useState } from "react";
import "./Propertyprice.css";

const Propertyprice = () => {
  const [showAll, setShowAll] = useState(false);
  const priceData = Array(12).fill({ price: "₹ 1.3 Cr.", booking: "₹ 1,00,000" });

  return (
    <div className="property-price-details-box">
      <h4 className="property-section-title">Price Details</h4>
      <div className="property-price-grid">
        {(showAll ? priceData : priceData.slice(0, 6)).map((item, index) => (
          <div key={index} className="property-price-column">
            <div className="d-flex justify-content-between">
              <p className="property-label">Price Breakup</p>
              <p className="property-value">{item.price}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="property-label">Booking Amount</p>
              <p className="property-value">{item.booking}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="property-view-more" onClick={() => setShowAll(!showAll)}>
        {showAll ? "View less Details" : "View all Details"}
      </button>
    </div>
  );
};

export default Propertyprice;
