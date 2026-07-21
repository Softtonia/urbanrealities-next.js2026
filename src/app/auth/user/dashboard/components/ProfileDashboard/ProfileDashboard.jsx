"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle, FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaIdCard, FaClipboardList, FaUsers, FaComments, FaUpload, FaEdit, FaBriefcase
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Skeleton } from '@mui/material';
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import { useDashboard } from "../../../DashboardContext/DashboardContext";
import { getUserProfile } from '@/services/auth.service';
import styles from "./ProfileDashboard.module.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { token, userId } = useSiteSettings();
  const { setPageHeading } = useDashboard();
  const [profile, setProfile] = useState({});
  const [dashboardCounts, setDashboardCounts] = useState({ total_listings: 0, total_leads: 0, total_inquiries: 0 });
  const [profileCompletion, setProfileCompletion] = useState({ percentage: 0 });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getUserProfile(userId, token);
      setLoading(false);
      if (data && data.status && data.data) {
        setProfile(data.data.raw || {});
        if (data.data.dashboard_counts) setDashboardCounts(data.data.dashboard_counts);
        if (data.data.profile_completion) setProfileCompletion(data.data.profile_completion);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
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

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerTitleBlock}>
        <h1 className={styles.welcomeHeading}>Welcome Back, {loading ? <Skeleton variant="text" width={200} sx={{ display: 'inline-block' }} /> : fullName}! 👋</h1>
        <p className={styles.welcomeSubtext}>Manage your profile, verify your account and grow your business.</p>
      </div>

      {/* Orange Banner Card */}
      <div className={styles.bannerCard}>
        <div className={styles.bannerLeft}>
          <div className={styles.avatarWrapper}>
            {loading ? (
              <Skeleton variant="circular" width={100} height={100} className={styles.avatar} />
            ) : (
              <Image
                src={profile?.profile_photo || "/profile-placeholder.png"}
                alt="Profile"
                width={100}
                height={100}
                className={styles.avatar}
              />
            )}
            {!loading && ['Approved', 'Verified', 'Completed'].includes(profile.kyc_status) && (
              <div className={styles.avatarBadge}>
                <FaCheckCircle className={styles.verifiedIcon} />
              </div>
            )}
          </div>
          
          <div className={styles.userInfo}>
            <div className={styles.nameRow}>
              <h2>{loading ? <Skeleton variant="text" width={150} /> : fullName}</h2>
              {!loading && (
                <span className={styles.statusPill}>
                  {['Approved', 'Verified', 'Completed'].includes(profile.kyc_status) && <MdVerified style={{ color: 'var(--UFO-Green)', fontSize: '16px' }} />}
                  {profile.kyc_status || 'Pending'}
                </span>
              )}
            </div>
            
            <div className={styles.usernameRow}>
              <span>{loading ? <Skeleton variant="text" width={100} /> : `@${profile.user_name || "username"}`}</span>
              {!loading && <span className={styles.rolePill}>{profile.role_name || "Owner"}</span>}
            </div>
            
            <div className={styles.detailsRow}>
              <span>{loading ? <Skeleton variant="text" width={100} /> : `User ID: ${profile.unique_id || "-"}`}</span>
              {!loading && <span className={styles.dotSeparator}>•</span>}
              <span>{loading ? <Skeleton variant="text" width={150} /> : `Member Since: ${profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "Jul 2024"}`}</span>
            </div>
            
            <div className={styles.contactRow}>
              <span>{loading ? <Skeleton variant="text" width={120} /> : <><FaPhoneAlt /> {profile.phone || "Not provided"}</>}</span>
              {!loading && <span className={styles.divider}></span>}
              <span>{loading ? <Skeleton variant="text" width={200} /> : <><FaEnvelope /> {profile.email || "Not provided"}</>}</span>
            </div>
          </div>
        </div>

        <div className={styles.bannerRight}>
          <div className={styles.statusBox}>

            <div className={styles.statusItem}>
              <div className={profile.kyc_status === 'Approved' || profile.kyc_status === 'Verified' ? styles.successDot : styles.pendingDot}></div>
              <span>KYC Status<br/><strong>{loading ? <Skeleton variant="text" width={60} /> : (profile.kyc_status || 'Pending')}</strong></span>
            </div>
            {!loading && (
              <Link href={`/auth/user/dashboard/edit-profile?id=${profile.id}`} className={styles.editBtn}>
                <FaEdit /> Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.progressCircle}>
            {loading ? <Skeleton variant="circular" width={50} height={50} /> : <span>{profileCompletion.percentage}%</span>}
          </div>
          <div className={styles.statInfo}>
            <h4>Profile Completion</h4>
            <p>Almost there! Keep going</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: '#e6f0ff', color: '#3b82f6'}}>
            <FaClipboardList />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Listings</h4>
            <h3>{loading ? <Skeleton variant="text" width={30} /> : dashboardCounts.total_listings}</h3>
            <p>Active Properties</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: '#e6ffec', color: '#10b981'}}>
            <FaUsers />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Leads</h4>
            <h3>{loading ? <Skeleton variant="text" width={30} /> : dashboardCounts.total_leads}</h3>
            <p>Potential Buyers</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: '#f3e8ff', color: '#8b5cf6'}}>
            <FaComments />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Inquiries</h4>
            <h3>{loading ? <Skeleton variant="text" width={30} /> : dashboardCounts.total_inquiries}</h3>
            <p>New Messages</p>
          </div>
        </div>
      </div>

      {/* Info Grid - Personal, Business (Optional), and Address */}
      <div className={`${styles.infoGrid} ${profile.role_name && profile.role_name.toLowerCase() !== 'owner' ? styles.infoGridThree : ''}`}>
        {/* Personal Info */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaUser className={styles.cardIcon} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}><span>Full Name</span><strong>{loading ? <Skeleton width={120} /> : fullName}</strong></div>
            <div className={styles.infoRow}><span>Username</span><strong>{loading ? <Skeleton width={100} /> : (profile.user_name || "N/A")}</strong></div>
            <div className={styles.infoRow}><span>Mobile Number</span><strong>{loading ? <Skeleton width={110} /> : (profile.phone || "N/A")}</strong></div>
            <div className={styles.infoRow}><span>Email Address</span><strong>{loading ? <Skeleton width={150} /> : (profile.email || "N/A")}</strong></div>
            <div className={styles.infoRow}><span>Role</span><strong>{loading ? <Skeleton width={80} /> : (profile.role_name || "Owner")}</strong></div>
            <div className={styles.infoRow}><span>User ID</span><strong>{loading ? <Skeleton width={90} /> : (profile.unique_id || "-")}</strong></div>
          </div>
        </div>

        {/* Business Info - Only if not Owner */}
        {profile.role_name && profile.role_name.toLowerCase() !== 'owner' && (
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <FaBriefcase className={styles.cardIcon} />
              <h3>Business Information</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}><span>Business Name</span><strong>{loading ? <Skeleton width={120} /> : (profile.bussiness_name || "Not Added Yet")}</strong></div>
              <div className={styles.infoRow}><span>Business Email</span><strong>{loading ? <Skeleton width={150} /> : (profile.bussiness_email || "Not Added Yet")}</strong></div>
              <div className={styles.infoRow}><span>Business Phone</span><strong>{loading ? <Skeleton width={110} /> : (profile.business_phone || "Not Added Yet")}</strong></div>
              <div className={styles.infoRow}><span>Business Address</span><strong>{loading ? <Skeleton width={150} /> : (profile.bussiness_address || "Not Added Yet")}</strong></div>
              <div className={styles.infoRow}><span>No. of Employees</span><strong>{loading ? <Skeleton width={80} /> : (profile.no_of_employees || "Not Added Yet")}</strong></div>
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
            <div className={styles.infoRow}><span>Country</span><strong>{loading ? <Skeleton width={100} /> : (profile.country || "-")}</strong></div>
            <div className={styles.infoRow}><span>State</span><strong>{loading ? <Skeleton width={100} /> : (profile.state || "-")}</strong></div>
            <div className={styles.infoRow}><span>City</span><strong>{loading ? <Skeleton width={100} /> : (profile.city || "-")}</strong></div>
            <div className={styles.infoRow}><span>Area/Locality</span><strong>{loading ? <Skeleton width={120} /> : (profile.area_locality || "-")}</strong></div>
            <div className={styles.infoRow}><span>Street Address</span><strong>{loading ? <Skeleton width={150} /> : (profile.street_address || "-")}</strong></div>
            <div className={styles.infoRow}><span>PIN Code</span><strong>{loading ? <Skeleton width={80} /> : (profile.pin_code || "-")}</strong></div>
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
                <span className={profile.account_status === 'Approved' ? styles.statusApproved : styles.statusPending}>
                  {profile.account_status || "Pending"}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span>KYC Status</span>
                <span className={['Verified', 'Approved', 'Completed'].includes(profile.kyc_status) ? styles.statusApproved : styles.statusPending}>
                  {profile.kyc_status || "Pending"}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span>Aadhar Number</span>
                <strong>{profile.aadhaar_number || "-"}</strong>
              </div>

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
    </div>
  );
};

export default Dashboard;

