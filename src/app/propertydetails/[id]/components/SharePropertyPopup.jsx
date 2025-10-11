import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaTimes, FaCopy, FaShareAlt } from "react-icons/fa";
import styles from "./SharePropertyPopup.module.css"

const SharePropertyPopup = ({ show, handleClose, popupLink }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(popupLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className={`${styles.borderNone} borderNone`}>
                    <Modal.Title className={styles.enquiryHeading}>
                        <FaShareAlt className="me-2" />
                        Share This Property
                        <button onClick={handleClose} className={styles.customCloseBtn}>
                            <FaTimes />
                        </button>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.quickEnquiry}>
                    <div className={styles.topBox}>
                        <label className="mb-2 fw-semibold">Copy Link</label>
                        <div className="d-flex align-items-center">
                            <input
                                type="text"
                                value={popupLink}
                                readOnly
                                className="form-control me-2"
                            />
                            <button
                                className="btn d-flex align-items-center"
                                style={{ backgroundColor: "var(--Orange-Red)", color: 'white' }}
                                onClick={handleCopy}
                            >


                                <FaCopy className="me-1" />
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>

                    {/* Optional: Social Media Share buttons */}
                    <div className="mt-4 d-flex gap-2">
                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(popupLink)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success d-flex align-items-center justify-content-center p-2"
                            aria-label="Share on WhatsApp"
                            title="Share on WhatsApp"
                            style={{ width: 40, height: 40, borderRadius: 8 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
                                <path d="M380.9 97.1C339 55.1 283.2 32 224.9 32 106.8 32 10.7 128.1 10.7 246.2c0 42.3 11.1 83.6 32.3 119.6L0 480l117.3-42.7c34.8 19 74.2 29 114 29h.1c118.1 0 214.2-96.1 214.2-214.2 0-58.3-23.1-114.1-65.1-156zM224.9 438.4h-.1c-35.4 0-70.1-9.5-100.4-27.5l-7.2-4.3-69.6 25.4 24.9-71.8-4.7-7.4c-19.5-30.5-29.8-65.8-29.8-102.5 0-105.5 85.8-191.3 191.3-191.3 51.1 0 99.1 19.9 135.2 56 36 36.1 56 84.1 56 135.2 0 105.6-85.8 191.2-191.6 191.2zm104.7-138.7c-5.7-2.9-33.7-16.6-38.9-18.5-5.2-1.9-9-2.9-12.8 2.9-3.7 5.7-14.7 18.5-18 22.3-3.3 3.7-6.6 4.2-12.3 1.4-5.7-2.9-24.1-8.9-45.9-28.3-17-15.2-28.4-33.9-31.7-39.7-3.3-5.7-.3-8.8 2.5-11.6 2.6-2.6 5.7-6.6 8.5-9.9 2.8-3.3 3.7-5.7 5.7-9.5 1.9-3.7.9-7.1-.5-10-1.4-2.9-12.8-30.9-17.6-42.3-4.6-11.1-9.3-9.6-12.8-9.8-3.3-.2-7.1-.2-10.9-.2s-10 1.4-15.2 7.1c-5.2 5.7-19.9 19.4-19.9 47.3s20.4 54.9 23.2 58.7c2.8 3.7 40.2 61.4 97.3 86.1 13.6 5.9 24.2 9.5 32.5 12.2 13.6 4.3 26 3.7 35.8 2.3 10.9-1.6 33.7-13.8 38.5-27.2 4.7-13.3 4.7-24.7 3.3-27.2-1.4-2.5-5.2-3.9-10.9-6.8z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(popupLink)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary d-flex align-items-center justify-content-center p-2"
                            aria-label="Share on Facebook"
                            title="Share on Facebook"
                            style={{ width: 40, height: 40, borderRadius: 8 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="20" height="20" fill="currentColor">
                                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H295V6.26S259.5 0 225.36 0C149.1 0 100.2 44.38 100.2 124.72v70.62H12v92.66h88.2V512h107.7V288z" />
                            </svg>
                        </a>

                        {/* Twitter (X) */}
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(popupLink)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-info d-flex align-items-center justify-content-center p-2"
                            aria-label="Share on Twitter"
                            title="Share on Twitter"
                            style={{ width: 40, height: 40, borderRadius: 8 }}
                        >
                            {/* Classic Twitter bird */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-52.108-84.143-103.3v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </a>
                    </div>

                </Modal.Body>
            </Modal>
        </div >
    );
};

export default SharePropertyPopup;
