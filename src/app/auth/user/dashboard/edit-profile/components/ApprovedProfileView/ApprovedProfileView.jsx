import React, { useState, useEffect } from "react";
import styles from "./ApprovedProfileView.module.css";
import { 
  FaUserCircle, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaIdCard, 
  FaCheckCircle, 
  FaSpinner 
} from "react-icons/fa";
import {
  LARAVEL_API_BASE_URL,
  LARAVEL_APPLICATION_PASSWORD,
  APP_TYPE,
} from "@/lib/config";

const ApprovedProfileView = ({ formData, profileImage, token, isBusiness = false }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);

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
    <div className={styles.approvedViewContainer}>
      {/* Header Section */}
      <div className={styles.headerCard}>
        <div className={styles.profileMeta}>
          <div className={styles.avatarWrapper}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className={styles.avatarImg} />
            ) : (
              <FaUserCircle className={styles.defaultAvatar} />
            )}
            <div className={styles.verifiedBadge}>
              <FaCheckCircle />
            </div>
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.badgeWrapper}>
              <span className={styles.statusBadge}>KYC Verified</span>
              {isBusiness && <span className={styles.roleBadge}>Business Account</span>}
            </div>
            <h2>{formData.first_name} {formData.last_name}</h2>
            <p>Your profile has been fully verified and approved.</p>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Left Column: Personal & Address Info */}
        <div className={styles.infoColumn}>
          {/* Personal Info Card */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><FaUserCircle /></div>
              <h3>Personal Information</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Full Name</span>
                <span className={styles.value}>{formData.first_name} {formData.last_name}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email Address</span>
                <span className={styles.value}><FaEnvelope className={styles.inlineIcon} /> {formData.email || "-"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Phone Number</span>
                <span className={styles.value}><FaPhone className={styles.inlineIcon} /> {formData.phone || "-"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Aadhaar Number</span>
                <span className={styles.value}>
                  {formData.aadhaar_number ? `XXXXXXXX${formData.aadhaar_number.slice(-4)}` : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Business Info Card (If Business) */}
          {isBusiness && (
            <div className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}><FaBuilding /></div>
                <h3>Business Details</h3>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Business Name</span>
                  <span className={styles.value}>{formData.bussiness_name || "-"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Business Email</span>
                  <span className={styles.value}>{formData.bussiness_email || "-"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>GST Number</span>
                  <span className={styles.value}>{formData.gst_number || "-"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>RERA Number</span>
                  <span className={styles.value}>{formData.rera_number || "-"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Address Info Card */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><FaMapMarkerAlt /></div>
              <h3>Address Details</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Street Address</span>
                <span className={styles.value}>{formData.street_address || "-"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Area / Locality</span>
                <span className={styles.value}>{formData.area_locality || "-"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Pincode</span>
                <span className={styles.value}>{formData.pin_code || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Documents */}
        <div className={styles.documentsColumn}>
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><FaCheckCircle style={{ color: "#10b981" }} /></div>
              <h3>Verified Documents</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.documentsList}>
                {isLoadingDocs ? (
                  <div className={styles.loadingWrapper}>
                    <FaSpinner className="fa-spin" style={{ color: "#ea580c", fontSize: "24px" }} />
                    <p>Loading documents...</p>
                  </div>
                ) : documents.length > 0 ? (
                  documents.map((doc, idx) => {
                    const { icon, color } = getDocIconAndColor(doc.document_type);
                    return (
                      <div key={idx} className={styles.documentItem}>
                        <div className={`${styles.docIconWrap} ${styles[color]}`}>
                          {icon}
                        </div>
                        <div className={styles.docInfo}>
                          <span className={styles.docName}>{getDocTitle(doc.document_type)}</span>
                          <span className={styles.docStatus}><FaCheckCircle /> Verified</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className={styles.emptyState}>No documents found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedProfileView;
