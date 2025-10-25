'use client';

import React, { useState } from "react";
import "./Propertyagent.css";
import ViewPopup from "@/Components/Modal-Popup/ViewPopup";

const Propertyagent = ({ property, userDetail }) => {
  const rating = 5;
  const stars = Array(rating).fill("");
  const [viewShowModal, setViewShowModal] = useState(false);

  const handleViewShowModal = () => setViewShowModal(true);
  const handleViewCloseModal = () => setViewShowModal(false);

  console.log("userDetail:", userDetail);

  // ✅ Safely handle empty userDetail
  const isEmpty = !userDetail || Object.keys(userDetail).length === 0;

  // ✅ Default contact details
  const contactDetails = {
    heading: "Contact Detail",
    nameLabel: "Name",
    phoneLabel: "Number",
    emailLabel: "Email",
    name:
      !isEmpty
        ? `${userDetail.first_name || ""} ${userDetail.last_name || ""}`.trim() || "N/A"
        : "N/A",
    phone: !isEmpty ? userDetail.phone : "N/A",
    email: !isEmpty ? userDetail.email: "N/A",
  };



  return (
    <div className="agent-details">
      <h4 className="agent-h4 body-text-20">User Details</h4>
      <div className="agent-card">
        <img
          src="/agent-detail.png"
          alt="Agent"
          className="agent-image"
          style={{ width: "161px", height: "131px" }}
        />

        {property?.created_by?.name && (
          <div className="agent-name body-text-md18">
            {property.created_by.name}
          </div>
        )}

        <div className="agent-rating body-text-14">
          {stars.map((_, index) => (
            <img key={index} src="/yellowstar.png" alt="star" />
          ))}
          {" "}9.8 Rating
        </div>

        {property?.created_by?.name && (
          <button className="agent-contact" onClick={handleViewShowModal}>
            View Number
          </button>
        )}
      </div>

      {/* ✅ Pass correct props to modal */}
      <ViewPopup
        show={viewShowModal}
        handleClose={handleViewCloseModal}
        popupData={contactDetails}
        agentName={contactDetails.name}
      />
    </div>
  );
};

export default Propertyagent;

