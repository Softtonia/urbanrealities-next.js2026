import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import styles from "./ModalPopup.module.css";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";

const ModalPopup = ({ show, handleClose, popupData, agentName }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered >
        {/* closeButton prop ko Modal.Header mein daalein */}
        <Modal.Header className={` ${styles.borderNone} borderNone`}>
          <Modal.Title className={styles.enquiryHeading}>
            {popupData.heading} {agentName}
            <button onClick={handleClose} className={styles.customCloseBtn}>
              <FaTimes />
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.quickEnquiry}>
          <div >
            {/* Username */}
            <div className={styles.formGroup}>
              <input
                type="text"
                id="username"
                className={`enquiryInput ${styles.formInput}`}
                placeholder={popupData.usernamePlaceholder}
              />
            </div>
            {/* Email */}
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                className={`enquiryInput ${styles.formInput}`}
                placeholder={popupData.emailPlaceholder}
              />
            </div>
            {/* Phone */}
            <div className={styles.formGroup}>
              <input
                type="tel"
                id="phone"
                className={`enquiryInput ${styles.formInput}`}
                placeholder={popupData.phonePlaceholder}
                maxLength={10} // optional limit
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <textarea
                type="text"
                id="username"
                className={`enquiryInput ${styles.formInput}`}
                placeholder="Message"
                rows={3}
              />
            </div>
            {/* Next Button */}
            <button
              type="submit"
              className={`body-text-14 continueBtn ${styles.nextBtn}`}
            >
              <FaPhoneAlt className={styles.icon} /> {popupData.nextButton}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalPopup;