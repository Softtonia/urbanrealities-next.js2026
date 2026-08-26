"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { encodeId } from "@/lib/utils";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaClipboardList,
  FaUsers,
  FaComments,
  FaUpload,
  FaEdit,
  FaBriefcase,
  FaShieldAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Skeleton } from "@mui/material";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useDashboard } from "../../../DashboardContext/DashboardContext";
import { getUserProfile } from "@/services/auth.service";
import { getKycDetails } from "@/services/document.service";
import styles from "./ProfileDashboard.module.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { token, userId } = useSiteSettings();
  const { setPageHeading } = useDashboard();
  const [profile, setProfile] = useState({});
  const [dashboardCounts, setDashboardCounts] = useState({
    total_listings: 0,
    total_leads: 0,
    total_inquiries: 0,
  });
  const [profileCompletion, setProfileCompletion] = useState({ percentage: 0 });
  const [kycDetails, setKycDetails] = useState({});
  const [showKycSuccess, setShowKycSuccess] = useState(false);
  const [showKycRejected, setShowKycRejected] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const [profileRes, kycRes] = await Promise.all([
        getUserProfile(userId, token),
        getKycDetails(token)
          .then((res) => res.json())
          .catch(() => null),
      ]);

      if (profileRes && profileRes.status && profileRes.data) {
        const rawProfile = profileRes.data.raw || {};
        setProfile(rawProfile);
        if (profileRes.data.dashboard_counts)
          setDashboardCounts(profileRes.data.dashboard_counts);
        if (profileRes.data.profile_completion)
          setProfileCompletion(profileRes.data.profile_completion);

        const kycStatus = rawProfile.kyc_status ? rawProfile.kyc_status.toLowerCase() : "";

        if (["approved", "verified", "completed"].includes(kycStatus)) {
          localStorage.removeItem(`hasSeenKycRejected_${userId}`);
          const hasSeen = localStorage.getItem(`hasSeenKycSuccess_${userId}`);
          if (!hasSeen) {
            setShowKycSuccess(true);
          }
        } else if (["rejected", "declined"].includes(kycStatus)) {
          localStorage.removeItem(`hasSeenKycSuccess_${userId}`);
          const hasSeen = localStorage.getItem(`hasSeenKycRejected_${userId}`);
          if (!hasSeen) {
            setShowKycRejected(true);
          }
        } else {
          localStorage.removeItem(`hasSeenKycSuccess_${userId}`);
          localStorage.removeItem(`hasSeenKycRejected_${userId}`);
        }
      }

      if (kycRes && kycRes.status && kycRes.data) {
        setKycDetails(kycRes.data);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchProfile();
    }
    setPageHeading("");
  }, [token, userId]);

  const fullName = `${profile?.first_name} ${profile?.last_name}`;

  const handleCloseKycSuccess = () => {
    localStorage.setItem(`hasSeenKycSuccess_${userId}`, "true");
    setShowKycSuccess(false);
  };

  const handleCloseKycRejected = () => {
    localStorage.setItem(`hasSeenKycRejected_${userId}`, "true");
    setShowKycRejected(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerTitleBlock}>
        <h1 className={styles.welcomeHeading} style={{ textTransform: "capitalize" }}>
          Welcome Back,{" "}
          {loading ? (
            <Skeleton
              variant="text"
              width={200}
              sx={{ display: "inline-block" }}
            />
          ) : (
            fullName
          )}
          ! 👋
        </h1>
        <p className={styles.welcomeSubtext}>
          Manage your profile, verify your account and grow your business.
        </p>
      </div>

      {/* KYC Alert Banner */}
      {!loading && (
        (() => {
          const statusStr = profile?.kyc_status || "";
          const isRejected = statusStr.toLowerCase() === "rejected";
          const isPendingOrApproved = ["submitted", "pending", "under review", "approved", "verified", "completed"].includes(statusStr.toLowerCase());
          
          if (isRejected) {
            return (
              <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaExclamationCircle style={{ color: '#ef4444', fontSize: '24px' }} />
                  <div>
                    <h4 style={{ margin: 0, color: '#991b1b', fontSize: '16px' }}>Your KYC was Rejected</h4>
                    <p style={{ margin: 0, color: '#b91c1c', fontSize: '14px', marginTop: '4px' }}>Please update your documents and re-submit your KYC.</p>
                  </div>
                </div>
                <Link 
                  href={`/auth/user/dashboard/edit-profile?id=${encodeId(userId)}&tab=document`}
                  style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap' }}
                >
                  Re-submit KYC Now
                </Link>
              </div>
            );
          } else if (!isPendingOrApproved) {
            return (
              <div style={{ backgroundColor: '#fff4e5', borderLeft: '4px solid #f37021', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaIdCard style={{ color: '#f37021', fontSize: '24px' }} />
                  <div>
                    <h4 style={{ margin: 0, color: '#b95000', fontSize: '16px' }}>Complete Your KYC First</h4>
                    <p style={{ margin: 0, color: '#d97706', fontSize: '14px', marginTop: '4px' }}>You must upload your KYC documents to verify your account and unlock full features.</p>
                  </div>
                </div>
                <Link 
                  href={`/auth/user/dashboard/edit-profile?id=${encodeId(userId)}`}
                  style={{ backgroundColor: '#f37021', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap' }}
                >
                  Complete KYC Now
                </Link>
              </div>
            );
          }
          return null;
        })()
      )}

      {/* Orange Banner Card */}
      <div className={styles.bannerCard}>
        <div className={styles.bannerLeft}>
          <div className={styles.avatarWrapper}>
            {loading ? (
              <Skeleton
                variant="circular"
                width={100}
                height={100}
                className={styles.avatar}
              />
            ) : (
              <Image
                src={profile?.profile_photo || "/profile-placeholder.png"}
                alt="Profile"
                width={100}
                height={100}
                className={styles.avatar}
              />
            )}
            {!loading &&
              ["Approved", "Verified", "Completed"].includes(
                profile.kyc_status,
              ) && (
                <div className={styles.avatarBadge}>
                  <FaCheckCircle className={styles.verifiedIcon} />
                </div>
              )}
          </div>

          <div className={styles.userInfo}>
            <div className={styles.nameRow}>
              <h2 style={{ textTransform: "capitalize" }}>
                {loading ? <Skeleton variant="text" width={150} /> : fullName}
              </h2>
              {!loading && (
                <span className={styles.statusPill}>
                  {["Approved", "Verified", "Completed"].includes(
                    profile.kyc_status,
                  ) && (
                    <MdVerified
                      style={{ color: "var(--UFO-Green)", fontSize: "16px" }}
                    />
                  )}
                  {profile.kyc_status === "Approved"
                    ? "Verified"
                    : "Unverified"}
                </span>
              )}
            </div>

            <div className={styles.usernameRow}>
              <span>
                {loading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  `@${profile.user_name || "username"}`
                )}
              </span>
              {!loading && (
                <span className={styles.rolePill}>
                  {profile.role_name || "Owner"}
                </span>
              )}
            </div>

            <div className={styles.detailsRow}>
              <span>
                {loading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  `User ID: ${profile.unique_id || "-"}`
                )}
              </span>
              {!loading && <span className={styles.dotSeparator}>•</span>}
              <span>
                {loading ? (
                  <Skeleton variant="text" width={150} />
                ) : (
                  `Member Since: ${profile.created_at ? new Date(profile.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}`
                )}
              </span>
            </div>

            <div className={styles.contactRow}>
              <span>
                {loading ? (
                  <Skeleton variant="text" width={120} />
                ) : (
                  <>
                    <FaPhoneAlt /> {profile.phone || "Not provided"}
                  </>
                )}
              </span>
              {!loading && <span className={styles.divider}></span>}
              <span>
                {loading ? (
                  <Skeleton variant="text" width={200} />
                ) : (
                  <>
                    <FaEnvelope /> {profile.email || "Not provided"}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bannerRight}>
          <div className={styles.statusBox}>
            <div className={styles.statusItem}>
              <div
                className={
                  profile.kyc_status === "Approved" ||
                  profile.kyc_status === "Verified"
                    ? styles.successDot
                    : styles.pendingDot
                }
              ></div>
              <span>
                KYC Status
                <br />
                <strong>
                  {loading ? (
                    <Skeleton variant="text" width={60} />
                  ) : (
                    profile.kyc_status || "Pending"
                  )}
                </strong>
              </span>
            </div>
            {!loading && (
              <div className="d-flex flex-column gap-2 mt-2">
                <Link
                  href={`/auth/user/dashboard/edit-profile?id=${encodeId(profile.id)}`}
                  className={styles.editBtn}
                >
                  <FaEdit /> Edit Profile
                </Link>
                <Link
                  href={`/auth/user/dashboard/manage-password`}
                  className={styles.editBtn}
                >
                  Manage Password
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div 
            className={styles.progressCircle} 
            style={{ 
              background: 'transparent',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px'
            }}
          >
            {loading ? (
              <Skeleton variant="circular" width={56} height={56} />
            ) : (
              <>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f37021"
                    strokeWidth="4"
                    strokeDasharray={`${profileCompletion.percentage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 'bold', color: '#111827' }}>
                  {profileCompletion.percentage}%
                </span>
              </>
            )}
          </div>
          <div className={styles.statInfo}>
            <h4>Profile Completion</h4>
            <p>Almost there! Keep going</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#e6f0ff", color: "#3b82f6" }}
          >
            <FaClipboardList />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Listings</h4>
            <h3>
              {loading ? (
                <Skeleton variant="text" width={30} />
              ) : (
                dashboardCounts.total_listings
              )}
            </h3>
            <p>Active Properties</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#e6ffec", color: "#10b981" }}
          >
            <FaUsers />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Leads</h4>
            <h3>
              {loading ? (
                <Skeleton variant="text" width={30} />
              ) : (
                dashboardCounts.total_leads
              )}
            </h3>
            <p>Potential Buyers</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#f3e8ff", color: "#8b5cf6" }}
          >
            <FaComments />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Inquiries</h4>
            <h3>
              {loading ? (
                <Skeleton variant="text" width={30} />
              ) : (
                dashboardCounts.total_inquiries
              )}
            </h3>
            <p>New Messages</p>
          </div>
        </div>
      </div>

      {/* Info Grid - Personal, Business (Optional), and Address */}
      <div
        className={`${styles.infoGrid} ${profile.role_name && profile.role_name.toLowerCase() !== "owner" ? styles.infoGridThree : ""}`}
      >
        {/* Personal Info */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaUser className={styles.cardIcon} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span>Full Name</span>
              <strong>{loading ? <Skeleton width={120} /> : fullName}</strong>
            </div>
            <div className={styles.infoRow}>
              <span>Username</span>
              <strong>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  profile.user_name || "N/A"
                )}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>Mobile Number</span>
              <strong>
                {loading ? <Skeleton width={110} /> : profile.phone || "N/A"}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>Email Address</span>
              <strong>
                {loading ? <Skeleton width={150} /> : profile.email || "N/A"}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>Role</span>
              <strong>
                {loading ? (
                  <Skeleton width={80} />
                ) : (
                  profile.role_name || "Owner"
                )}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>User ID</span>
              <strong>
                {loading ? <Skeleton width={90} /> : profile.unique_id || "-"}
              </strong>
            </div>
          </div>
        </div>

        {/* Business Info - Only if not Owner */}
        {profile.role_name && profile.role_name.toLowerCase() !== "owner" && (
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <FaBriefcase className={styles.cardIcon} />
              <h3>Business Information</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <span>Business Name</span>
                <strong>
                  {loading ? (
                    <Skeleton width={120} />
                  ) : (
                    profile.bussiness_name || "Not Added Yet"
                  )}
                </strong>
              </div>
              <div className={styles.infoRow}>
                <span>Business Email</span>
                <strong>
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    profile.bussiness_email || "Not Added Yet"
                  )}
                </strong>
              </div>
              <div className={styles.infoRow}>
                <span>Business Phone</span>
                <strong>
                  {loading ? (
                    <Skeleton width={110} />
                  ) : (
                    profile.business_phone || "Not Added Yet"
                  )}
                </strong>
              </div>
              <div className={styles.infoRow}>
                <span>Business Address</span>
                <strong>
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    profile.bussiness_address || "Not Added Yet"
                  )}
                </strong>
              </div>
              <div className={styles.infoRow}>
                <span>No. of Employees</span>
                <strong>
                  {loading ? (
                    <Skeleton width={80} />
                  ) : (
                    profile.no_of_employees || "Not Added Yet"
                  )}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* Address Info */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaMapMarkerAlt className={styles.cardIcon} />
            <h3>Address Information</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span>Country</span>
              <strong>
                {loading ? <Skeleton width={100} /> : profile.country || "-"}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>State</span>
              <strong>
                {loading ? <Skeleton width={100} /> : profile.state || "-"}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>City</span>
              <strong>
                {loading ? <Skeleton width={100} /> : profile.city || "-"}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>Area/Locality</span>
              <strong>
                {loading ? (
                  <Skeleton width={120} />
                ) : (
                  profile.area_locality || "-"
                )}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>Street Address</span>
              <strong>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  profile.street_address || "-"
                )}
              </strong>
            </div>
            <div className={styles.infoRow}>
              <span>PIN Code</span>
              <strong>
                {loading ? <Skeleton width={80} /> : profile.pin_code || "-"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className={styles.bottomGrid}>
        {/* Verification & KYC */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaIdCard className={styles.cardIcon} />
            <h3>Verification & KYC</h3>
          </div>
          <div className={styles.kycBody}>
            <div className={styles.kycDetails}>
              <div className={styles.infoRow}>
                <span>Account Status</span>
                <span
                  className={
                    profile.account_status === "Approved"
                      ? styles.statusApproved
                      : styles.statusPending
                  }
                >
                  {profile.account_status || "Pending"}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span>KYC Status</span>
                <span
                  className={
                    ["Verified", "Approved", "Completed"].includes(
                      profile.kyc_status,
                    )
                      ? styles.statusApproved
                      : styles.statusPending
                  }
                >
                  {profile.kyc_status || "Pending"}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span>Aadhar Number</span>
                <strong>
                  {kycDetails?.aadhaar_number || profile.aadhaar_number || "-"}
                </strong>
              </div>
              {["Verified", "Approved", "Completed"].includes(profile.kyc_status) && (
                <>
                  <div className={styles.infoRow}>
                    <span>KYC ID</span>
                    <strong>{kycDetails?.kyc_id || profile?.kyc_id || `#KYC-${String(userId).padStart(4, '0')}`}</strong>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Approved on</span>
                    <strong>
                      {kycDetails?.approved_at ? new Date(kycDetails.approved_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : (kycDetails?.updated_at ? new Date(kycDetails.updated_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }))}
                    </strong>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaUser className={styles.cardIcon} />
            <h3>About Me</h3>
          </div>
          <div className={styles.aboutMeBody}>
            <div className={styles.aboutIcon}>
              <FaClipboardList />
            </div>
            <div className={styles.aboutText}>
              {profile.about_us ? (
                <p>{profile.about_us}</p>
              ) : (
                <>
                  <h4>You haven't added a description yet.</h4>
                  {/* <p>Tell buyers and sellers more about yourself and your business.</p> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showKycSuccess && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.successIconWrapper} style={{ height: '150px', background: 'transparent' }}>
              <FaCheckCircle style={{ width: '100px', height: '100px', color: '#28a745', margin: '25px auto', display: 'block' }} />
            </div>
            <h2 className={styles.successTitle}>Congratulations!</h2>
            <h3 className={styles.successSubtitle}>Your KYC has been Approved</h3>
            <p className={styles.successText}>
              You can now access all features and start listing properties.
            </p>
            <button className={styles.successBtn} onClick={handleCloseKycSuccess}>
              Go to Dashboard →
            </button>
            <div className={styles.successDetailsBox}>
              <div className={styles.successDetailRow}>
                <span className={styles.successDetailLabel}>KYC ID:</span>
                <span className={styles.successDetailValue}>{kycDetails?.kyc_id || profile?.kyc_id || `#KYC-${String(userId).padStart(4, '0')}`}</span>
              </div>
              <div className={styles.successDetailRow}>
                <span className={styles.successDetailLabel}>Approved on:</span>
                <span className={styles.successDetailValue}>
                  {kycDetails?.approved_at ? new Date(kycDetails.approved_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : (kycDetails?.updated_at ? new Date(kycDetails.updated_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKycRejected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.successIconWrapper} style={{ height: '150px', background: 'transparent' }}>
              <FaTimesCircle style={{ width: '100px', height: '100px', color: '#dc3545', margin: '25px auto', display: 'block' }} />
            </div>
            <h2 className={styles.successTitle} style={{ color: '#dc3545' }}>KYC Rejected</h2>
            <h3 className={styles.successSubtitle} style={{ color: '#dc3545' }}>Action Required for Verification</h3>
            <p className={styles.successText}>
              Unfortunately, your KYC application has been rejected. Please update your documents and try again.
            </p>
            <button className={styles.successBtn} style={{ background: '#dc3545' }} onClick={handleCloseKycRejected}>
              Review and Update →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
