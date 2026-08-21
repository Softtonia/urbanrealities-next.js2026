import React from "react";
import { FaCheck, FaClock, FaClipboardList, FaExclamationCircle } from "react-icons/fa";
import styles from "./VerificationStep.module.css";

const VerificationStep = ({ formData, profile, setActiveTab }) => {
  const isSubmitted = ["Submitted", "Pending", "Under Review", "Approved", "Verified", "Completed"].includes(profile?.kyc_status);

  if (!isSubmitted) {
    return (
      <div className={styles.verificationContainer}>
        {/* Illustration */}
        <div className={styles.illustration} style={{ background: 'transparent' }}>
          <FaExclamationCircle style={{ fontSize: "64px", color: "#f37021" }} />
        </div>

        {/* Headings */}
        <h2 className={styles.heading}>Please Complete Your KYC First</h2>
        <p className={styles.subHeading} style={{ marginBottom: "2rem" }}>
          You must upload your KYC documents and submit them for review before tracking verification status.
        </p>

        {/* Button */}
        <button 
          onClick={(e) => { e.preventDefault(); setActiveTab('document'); }}
          style={{ padding: '12px 24px', backgroundColor: '#f37021', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Go to Document Upload
        </button>
      </div>
    );
  }

  return (
    <div className={styles.verificationContainer}>
      {/* Illustration */}
      <div className={styles.illustration}>
        <FaClipboardList />
        <div className={styles.statusBadge}>
          <FaClock style={{ fontSize: "20px" }} />
        </div>
      </div>

      {/* Headings */}
      <h2 className={styles.heading}>Your KYC is Submitted!</h2>
      <p className={styles.subHeading}>
        Thank you! We have received your KYC details and documents. <br />
        Our team will review them and update you soon.
      </p>

      {/* Horizontal Timeline */}
      <div className={styles.timeline}>
        {/* Lines */}
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineLineProgress}></div>

        {/* Step 1: Submitted */}
        <div className={styles.timelineStep}>
          <div className={`${styles.stepIcon} ${styles.completed}`}>
            <FaCheck />
          </div>
          <span className={`${styles.stepLabel} ${styles.completed}`}>Submitted</span>
        </div>

        {/* Step 2: Under Review */}
        <div className={styles.timelineStep}>
          <div className={`${styles.stepIcon} ${styles.active}`}>
            <FaClock />
          </div>
          <span className={`${styles.stepLabel} ${styles.active}`}>Under Review</span>
        </div>

        {/* Step 3: Approved */}
        <div className={styles.timelineStep}>
          <div className={styles.stepIcon}>
            <FaCheck />
          </div>
          <span className={styles.stepLabel}>Approved</span>
        </div>
      </div>

      {/* Notification Box */}
      <div className={styles.notificationBox}>
        You will be notified on <strong>{formData?.email || "your email"}</strong>
        <br />
        and <strong>{formData?.phone || "your mobile number"}</strong> once your KYC is verified.
      </div>
    </div>
  );
};

export default VerificationStep;
