'use client';

import React from "react";
import "./Propertyagent.css";
const Propertyagent = ({ property }) => {
  const rating = 5;
  const stars = Array(rating).fill("");

  return (
    <div className="agent-details">
      <h4 className="agent-h4 body-text-20">Agent Details</h4>
      <div className="agent-card">
        <img
          src="/agent-detail.png"
          alt="Agent"
          className="agent-image"
          style={{ width: "161px", height: "131px" }}
        />
        {property?.created_by?.name &&
          <div className="agent-name body-text-md18">{property?.created_by?.name}</div>}
        <div className="agent-rating body-text-14">
          {stars.map((_, index) => (
            <img key={index}
              src="/yellowstar.png"
              alt="star" />
          ))}
          {""} 9.8 Rating
        </div>
        {property?.created_by?.name &&
          <button className="agent-contact">📞 {property.created_by.name}</button>
        }
      </div>
    </div>
  );
};

export default Propertyagent;
