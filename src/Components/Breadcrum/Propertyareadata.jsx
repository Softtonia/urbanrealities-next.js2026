"use client";
import { useState } from "react";
import "./Propertyareadata.css";


const Propertyareadata = () => {
 const [showMore, setShowMore] = useState(false);

  return (
    <div className="property-details-box">
      <h4 className="section-title body-text-sb18">Property Details</h4>
      <div className="property-details-grid">
        <div>
          <p className="label">Carpet Area</p>
          <p className="value">1720 sqft</p>
        </div>
        <div>
          <p className="label">Developer</p>
          <p className="value">Ganesh Property.pvt.ltd</p>
        </div>
        <div>
          <p className="label">Property Type</p>
          <p className="value">New Property</p>
        </div>
        <div>
          <p className="label">Additional Room</p>
          <p className="value">1 Playing Room</p>
        </div>
        <div>
          <p className="label">Facing</p>
          <p className="value">East</p>
        </div>
        <div>
          <p className="label">Floor</p>
          <p className="value">07 (out of 20 floors)</p>
   
        </div>
        <div>
          <p className="label">Available from</p>
          <p className="value">Nxt Month</p>
        </div>
        <div>
          <p className="label">Address</p>
          <p className="value">
            Ganesh Ernakulam,<br />
            Kerela<br />
            Pincode: 4785211
          </p>
        </div>
        <div>
          <p className="label">Lifts</p>
          <p className="value">Four</p>
        </div>
        <div>
          <p className="label">Available</p>
          <p className="value">Family</p>
        </div>

        {showMore && (
          <>
            <div>
              <p className="label">Water Supply</p>
              <p className="value">24x7</p>
            </div>
            <div>
              <p className="label">Furnishing</p>
              <p className="value">Semi-Furnished</p>
            </div>
            <div>
              <p className="label">Age of Property</p>
              <p className="value">Under Construction</p>
            </div>
          </>
        )}
      </div>
          <button className="view-more" onClick={() => setShowMore(!showMore)}>
            {showMore ? "View less Details" : "View more Details"}
          </button>
    </div>
  );
}

export default Propertyareadata;
