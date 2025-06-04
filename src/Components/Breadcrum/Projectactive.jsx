import React from 'react';
import "./Projectactive.css";
import { FaHeart } from "react-icons/fa";
import {
  MdVisibility,
  MdPhone,
} from "react-icons/md";
const Projectagent = () => {
  return (
    <div>
         <div className="property-activity">
            <div className="property-stats">
              <h4>Activity On This property</h4>
              <div className="activity-stats">
                <div>
                  <MdVisibility /> <span>470</span>
                  <p>Unique View</p>
                </div>
                <div>
                  <MdPhone /> <span>7</span>
                  <p>Contacted</p>
                </div>
                <div>
                  <FaHeart /> <span>17</span>
                  <p>Shortlists</p>
                </div>
              </div>
              <button className="report-btn">Report</button>
            </div>
            </div>
        <button className="download-btn">Download Brochure</button>
          </div>
  );
}

export default Projectagent;
