import React from "react";
import "./Propertyagent.css";
const Propertyagent = () => {
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
        <div className="agent-name body-text-md18">Akash Sharma</div>
        <div className="agent-rating body-text-14">
          {stars.map((_, index) => (
            <img key={index}
             src="/yellowstar.png" 
             alt="star" />
          ))}
          {""} 9.8 Rating
        </div>
        <button className="agent-contact">📞 Akash Sharma</button>
      </div>
    </div>
  );
};

export default Propertyagent;
