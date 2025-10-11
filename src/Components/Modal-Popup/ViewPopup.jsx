import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import styles from "./ModalPopup.module.css";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";


const ViewPopup = ({ show, handleClose, popupData }) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered >
                {/* closeButton prop ko Modal.Header mein daalein */}
                <Modal.Header className={` ${styles.borderNone} borderNone`}>
                    <Modal.Title className={styles.enquiryHeading}>
                        {popupData.heading} 
                        <button onClick={handleClose} className={styles.customCloseBtn}>
                            <FaTimes />
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.quickEnquiry}>
                    <div className=''>
                        {/* Username */}
                        <div className={styles.topBox}>
                            <div className={styles.topBoxRow}>
                                <div className={`${styles.topBoxCol} ${styles.topBoxColView}`}>
                                    <p className='m-0'>{popupData.nameLabel}</p>
                                </div>
                                <div className={`${styles.topBoxCol} ${styles.topBoxValue}`}>
                                    <p className="m-0">{popupData.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.topBox}>
                            <div className={styles.topBoxRow}>
                                <div className={`${styles.topBoxCol} ${styles.topBoxColView}`}>
                                    <p className='m-0'>{popupData.phoneLabel}</p>
                                </div>
                                <div className={`${styles.topBoxCol} ${styles.topBoxValue}`}>
                                    <p className="m-0">{popupData.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.topBox}>
                            <div className={styles.topBoxRow}>
                                <div className={`${styles.topBoxCol} ${styles.topBoxColView}`}>
                                    <p className='m-0'>{popupData.emailLabel}</p>
                                </div>
                                <div className={`${styles.topBoxCol} ${styles.topBoxValue}`}>
                                    <p className="m-0">{popupData.email}</p>
                                </div>
                            </div>
                        </div>


                        
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewPopup
