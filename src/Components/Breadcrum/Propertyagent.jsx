import React from 'react';
import "./Propertyagent.css";
const Propertyagent = () => {
  return (
    <div>
          <div className="agent-details">
            <h4>Agent Details</h4>
            <div className="agent-card">
              <img src="/agent-detail.png" alt="Agent" className="agent-image" />
              <div className="agent-name">Akash Sharma</div>
              <div className="agent-rating">⭐⭐⭐⭐⭐ 9.8 Rating</div>
              <button className="agent-contact">📞 Akash Sharma</button>
            </div>
          </div>
    </div>
  );
}

export default Propertyagent;
