import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheckCircle, FaLock, FaIdCard, FaBuilding, FaSpinner } from "react-icons/fa";
import styles from "./ReviewSubmit.module.css";
import {
  LARAVEL_API_BASE_URL,
  LARAVEL_APPLICATION_PASSWORD,
  APP_TYPE,
} from "@/lib/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ReviewSubmit = ({ formData, setActiveTab, token, fetchProfile }) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUploadedDocuments = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${LARAVEL_API_BASE_URL}/api/kyc/documents`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE,
          },
        });
        
        if (res.ok) {
          const result = await res.json();
          if (result.status && result.data) {
            setDocuments(result.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch KYC documents:", err);
      } finally {
        setIsLoadingDocs(false);
      }
    };

    fetchUploadedDocuments();
  }, [token]);

  const handleSubmit = async () => {
    if (!isChecked) {
      toast.error("Please agree to the declaration before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Depending on the exact API flow, a final submission API might be called here.
      // If the submission is just for UX and KYC was already submitted in the previous step,
      // we can just show a success message and navigate.
      
      if (fetchProfile) {
        await fetchProfile();
      }
      
      toast.success("Profile submitted for verification successfully!");
      setActiveTab("verification");
      
    } catch (error) {
      toast.error("Failed to submit profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDocIconAndColor = (type) => {
    if (type.includes("aadhaar") || type.includes("gst")) {
      return { icon: <FaIdCard />, color: "orange" };
    }
    return { icon: <FaBuilding />, color: "green" };
  };

  const getDocTitle = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewHeader}>
        <h3>Review Your Information</h3>
        <p>Please review all your details and documents before submitting.</p>
      </div>

      <div className={styles.panelsGrid}>
        {/* Personal Details Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h4>Personal Details</h4>
            <button className={styles.editBtn} onClick={() => setActiveTab("personal")}>
              Edit
            </button>
          </div>
          
          <div className={styles.detailsList}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Full Name</span>
              <span className={styles.detailValue}>
                {formData.first_name} {formData.last_name}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{formData.email || "-"}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Mobile Number</span>
              <span className={styles.detailValue}>{formData.phone || "-"}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Role</span>
              <span className={styles.detailValue} style={{textTransform: "capitalize"}}>
                {formData.role_id || "User"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Aadhaar Number</span>
              <span className={styles.detailValue}>
                {formData.aadhaar_number 
                  ? "XXXXXXXX" + formData.aadhaar_number.slice(-4) 
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Uploaded Documents Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h4>Uploaded Documents</h4>
            <button className={styles.editBtn} onClick={() => setActiveTab("document")}>
              Edit
            </button>
          </div>
          
          <div className={styles.documentsList}>
            {isLoadingDocs ? (
              <div className={styles.loadingWrapper}>
                <FaSpinner className="fa-spin" style={{ color: "#ea580c", fontSize: "24px" }} />
              </div>
            ) : documents.length > 0 ? (
              documents.map((doc, idx) => {
                const { icon, color } = getDocIconAndColor(doc.document_type);
                return (
                  <div key={idx} className={styles.documentItem}>
                    <div className={styles.docLeft}>
                      <div className={`${styles.docIconWrap} ${styles[color]}`}>
                        {icon}
                      </div>
                      <div className={styles.docInfo}>
                        <span className={styles.docName}>{getDocTitle(doc.document_type)}</span>
                        <span className={styles.docFilename}>{doc.file_original_name || "Document.png"}</span>
                      </div>
                    </div>
                    <div className={styles.docRight}>
                      <FaCheckCircle />
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: "#6b7280", fontSize: "14px" }}>No documents uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.declaration}>
        <input 
          type="checkbox" 
          id="declareCheck"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="declareCheck">
          I hereby declare that all the information provided is true, correct and complete.
        </label>
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => setActiveTab("document")}
        >
          <FaArrowLeft /> Back
        </button>
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={!isChecked || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : (
            <>
              <FaLock style={{ fontSize: "12px" }} /> Submit for Verification
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
