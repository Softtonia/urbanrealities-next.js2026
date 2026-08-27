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
  FaSpinner,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera
} from "react-icons/fa";
import {
  LARAVEL_API_BASE_URL,
  LARAVEL_APPLICATION_PASSWORD,
  APP_TYPE,
} from "@/lib/config";
import { updatePersonalProfile, updateAddressProfile, updateProfilePhoto } from "@/services/auth.service";
import { toast } from "react-toastify";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const ApprovedProfileView = ({ formData, profileImage, token, isBusiness = false }) => {
  const { kycStatus } = useSiteSettings();

  // Inline editing state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [localData, setLocalData] = useState(formData);
  const [localProfileImage, setLocalProfileImage] = useState(profileImage);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoProgress, setPhotoProgress] = useState(0);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  useEffect(() => {
    setLocalProfileImage(profileImage);
  }, [profileImage]);

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalProfileImage(imageUrl);
      setIsUploadingPhoto(true);
      setPhotoProgress(10);

      const payload = new FormData();
      payload.append("profile_photo", file);

      try {
        const data = await updateProfilePhoto(token, payload);
        if (data && data.status) {
          if (data.upload_id) {
            const { checkUploadProgress } = await import("@/services/document.service");
            const pollInterval = setInterval(async () => {
              try {
                const progressRes = await checkUploadProgress(token, data.upload_id);
                if (progressRes.ok) {
                  const progressData = await progressRes.json();
                  const fileProgress = progressData?.progress?.files?.profile_photo;
                  if (fileProgress) {
                    setPhotoProgress(fileProgress.percent || 10);
                    if (fileProgress.percent >= 100 || fileProgress.status === "completed" || fileProgress.status === "verified") {
                      clearInterval(pollInterval);
                      setPhotoProgress(100);
                      setTimeout(() => {
                        setIsUploadingPhoto(false);
                        toast.success(data.message || "Profile photo updated successfully!");
                      }, 1000);
                    }
                  }
                }
              } catch (err) {
                console.error("Polling error", err);
              }
            }, 2000);
          } else {
            setPhotoProgress(100);
            setTimeout(() => {
              setIsUploadingPhoto(false);
              toast.success(data.message || "Profile photo updated successfully!");
            }, 1000);
          }
        } else {
          setIsUploadingPhoto(false);
          setPhotoProgress(0);
          toast.error(data?.message || "Failed to update profile photo.");
        }
      } catch (err) {
        console.error("Profile photo upload error:", err);
        setIsUploadingPhoto(false);
        setPhotoProgress(0);
        toast.error("An error occurred while uploading photo.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Update Personal & Business Info
      const personalDataToSend = new FormData();
      const personalKeys = [
        "first_name",
        "last_name",
        "user_name",
        "email",
        "phone",
        "alternate_number",
        "about_us",
        "business_name",
        "business_email",
        "business_phone",
        "no_of_employees",
        "aadhaar_number",
        "gst_number",
        "rera_number"
      ];

      personalKeys.forEach((key) => {
        let val = localData[key];
        if (key === "business_name") val = localData.bussiness_name || localData.business_name;
        if (key === "business_email") val = localData.bussiness_email || localData.business_email;

        if (val !== undefined && val !== null && val !== "N/A" && val !== "") {
          personalDataToSend.append(key, val);
        }
      });
      const personalRes = await updatePersonalProfile(token, personalDataToSend);

      // 2. Update Address Info
      const addressDataToSend = new FormData();
      const addressKeys = [
        "country_id",
        "state_id",
        "city_id",
        "street_address",
        "colony",
        "area_locality",
        "address",
        "pin_code",
        "business_country_id",
        "business_state_id",
        "business_city_id",
        "business_address",
        "business_street_address",
        "business_colony",
        "business_area_locality",
        "business_pin_code",
      ];
      addressKeys.forEach((key) => {
        let val = localData[key];
        if (key === "business_address") val = localData.bussiness_address || localData.business_address;

        if (val !== undefined && val !== null && val !== "N/A" && val !== "") {
          addressDataToSend.append(key, val);
        }
      });
      const addressRes = await updateAddressProfile(token, addressDataToSend);

      if (personalRes?.status && addressRes?.status) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Profile update failed. Please check the fields and try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (name, value, label, isReadOnly = false) => {
    if (!isEditing) {
      return <span className={styles.value}>{value || "-"}</span>;
    }
    return (
      <input 
        type="text" 
        name={name} 
        value={value || ""} 
        onChange={handleChange} 
        className={styles.editInput} 
        readOnly={isReadOnly}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          backgroundColor: isReadOnly ? '#f5f5f5' : 'white',
          cursor: isReadOnly ? 'not-allowed' : 'text'
        }}
        placeholder={label}
      />
    );
  };

  return (
    <div className={styles.approvedViewContainer}>
      {/* Header Section */}
      <div className={styles.headerCard}>
        <div className={styles.profileMeta}>
          <div 
            className={styles.avatarWrapper} 
            onClick={handleImageClick}
            style={{ cursor: isEditing ? 'pointer' : 'default', position: 'relative' }}
          >
            {localProfileImage ? (
              <img src={localProfileImage} alt="Profile" className={styles.avatarImg} />
            ) : (
              <FaUserCircle className={styles.defaultAvatar} />
            )}
            
            {isEditing && (
              <div style={{ position: 'absolute', bottom: '0px', right: '0px', background: '#ea580c', color: 'white', padding: '6px', borderRadius: '50%', display: 'flex', zIndex: 2 }}>
                <FaCamera size={14} />
              </div>
            )}
            
            {isUploadingPhoto && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', zIndex: 3 }}>
                <FaSpinner className="fa-spin" style={{ color: '#ea580c' }} />
                <span style={{ fontSize: '10px', marginTop: '2px', fontWeight: 'bold' }}>{photoProgress}%</span>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            
            {!isEditing && (
              <div className={styles.verifiedBadge}>
                <FaCheckCircle />
              </div>
            )}
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.badgeWrapper}>
              {(() => {
                const status = (kycStatus || localData.kyc_status || "pending").toString().toLowerCase();
                let statusText = "KYC Pending";
                let statusBg = "#fef08a"; // yellow
                let statusColor = "#b45309";
                
                if (["approved", "verified", "completed", "accepted", "2"].includes(status)) {
                  statusText = "KYC Verified";
                  statusBg = "#e0f2fe"; // blue
                  statusColor = "#0284c7";
                } else if (["rejected", "declined", "failed", "3"].includes(status)) {
                  statusText = "KYC Rejected";
                  statusBg = "#fee2e2"; // red
                  statusColor = "#b91c1c";
                } else if (["submitted", "under review"].includes(status)) {
                  statusText = "KYC Submitted";
                  statusBg = "#ffedd5"; // orange
                  statusColor = "#c2410c";
                }
                
                return (
                  <span className={styles.statusBadge} style={{ backgroundColor: statusBg, color: statusColor, border: 'none' }}>
                    {statusText}
                  </span>
                );
              })()}
              {isBusiness && <span className={styles.roleBadge}>Business Account</span>}
            </div>
            <h2>{localData.first_name} {localData.last_name}</h2>
            <p>Your profile has been fully verified and approved.</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)} 
                  style={{ padding: '8px 16px', background: 'var(--Orange-Red, #ea580c)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px' }}
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    style={{ padding: '8px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    {isSaving ? <FaSpinner className="fa-spin" /> : <FaSave />} Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setLocalData(formData);
                      setIsEditing(false);
                    }} 
                    disabled={isSaving}
                    style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    <FaTimes /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Left Column: Personal Info */}
        <div className={styles.infoColumn}>
          {/* Personal Info Card */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><FaUserCircle /></div>
              <h3>Personal Information</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <span className={styles.label}>First Name</span>
                {renderField('first_name', localData.first_name, 'First Name')}
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Last Name</span>
                {renderField('last_name', localData.last_name, 'Last Name')}
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email Address</span>
                {renderField('email', localData.email, 'Email Address', true)}
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Phone Number</span>
                {renderField('phone', localData.phone, 'Phone Number')}
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Aadhaar Number</span>
                {renderField('aadhaar_number', localData.aadhaar_number, 'Aadhaar Number')}
              </div>
            </div>
          </div>

          {/* Business Info Card (If Business) - Hidden per user request */}
        </div>

        {/* Right Column: Address Details */}
        <div className={styles.documentsColumn}>
          {/* Address Info Card */}
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><FaMapMarkerAlt /></div>
              <h3>Address Details</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Street Address</span>
                {renderField('street_address', localData.street_address, 'Street Address')}
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Area / Locality</span>
                {renderField('area_locality', localData.area_locality, 'Area / Locality')}
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Pincode</span>
                {renderField('pin_code', localData.pin_code, 'Pincode')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedProfileView;
