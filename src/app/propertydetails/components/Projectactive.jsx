import React from "react";
import "./Projectactive.css";
import { FaHeart } from "react-icons/fa";
import { MdReport, MdVisibility, MdPhone } from "react-icons/md";
const Projectagent = () => {
  return (
    <div className="property-activity">
      <div className="property-stats">
        <h4 className="stats-h4  body-text-20">Activity On This property</h4>
        <div className="activity-stats">
          <div className="active-content">
            <MdVisibility className="stats-icon" />{" "}
            <span className="stat-number">470</span>
            <p className="active-para">Unique View</p>
          </div>
          <div className="active-content">
            <MdPhone className="stats-icon" />{" "}
            <span className="stat-number">7</span>
            <p className="active-para">Contacted</p>
          </div>
          <div className="active-content">
            <FaHeart className="stats-icon" />{" "}
            <span className="stat-number">17</span>
            <p className="active-para">Shortlists</p>
          </div>
        </div>
        <div className="report-stats">
          <MdReport className="report-icon" />
          <button className="report-btn">Report</button>
        </div>
      </div>
      <button className="download-btn body-text-sb18">Download Brochure</button>
    </div>
  );
};

export default Projectagent;
