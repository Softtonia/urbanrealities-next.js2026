"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle, FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaIdCard, FaClipboardList, FaUsers, FaComments, FaUpload, FaEdit
} from "react-icons/fa";
import { encodeId } from "@/lib/utils";
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import { useDashboard } from "../../../DashboardContext/DashboardContext";
import { getUserProfile } from '@/services/auth.service';
import styles from "./ProfileDashboard.module.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { token, userId } = useSiteSettings();
  const { setPageHeading } = useDashboard();
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getUserProfile(userId, token);
      setLoading(false);
      if (data) {
        setProfile(data);
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

  if (loading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const fullName = `${profile?.first_name} ${profile?.last_name}`;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerTitleBlock}>
        <h1 className={styles.welcomeHeading}>Welcome Back, {fullName}! 👋</h1>
        <p className={styles.welcomeSubtext}>Manage your profile, verify your account and grow your business.</p>
      </div>

      {/* Orange Banner Card */}
      <div className={styles.bannerCard}>
        <div className={styles.bannerLeft}>
          <div className={styles.avatarWrapper}>
            <Image
              src={profile?.profile_photo || "/profile-placeholder.png"}
              alt="Profile"
              width={100}
              height={100}
              className={styles.avatar}
            />
            <div className={styles.avatarBadge}>
              <FaCheckCircle className={styles.verifiedIcon} />
            </div>
          </div>
          
          <div className={styles.userInfo}>
            <div className={styles.nameRow}>
              <h2>{fullName}</h2>
              <span className={styles.statusPill}>
                <FaCheckCircle /> Approved
              </span>
            </div>
            
            <div className={styles.usernameRow}>
              <span>@{profile.user_name || "username"}</span>
              <span className={styles.rolePill}>{profile.role_name || "Owner"}</span>
            </div>
            
            <div className={styles.detailsRow}>
              <span>User ID: {profile.unique_id || "-"}</span>
              <span className={styles.dotSeparator}>•</span>
              <span>Member Since: {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "Jul 2024"}</span>
            </div>
            
            <div className={styles.contactRow}>
              <span><FaPhoneAlt /> {profile.phone || "Not provided"}</span>
              <span className={styles.divider}></span>
              <span><FaEnvelope /> {profile.email || "Not provided"}</span>
            </div>
          </div>
        </div>

        <div className={styles.bannerRight}>
          <div className={styles.statusBox}>
            <div className={styles.statusItem}>
              <FaCheckCircle className={styles.successIcon} />
              <span>Account Status<br/><strong>Approved</strong></span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.pendingDot}></div>
              <span>KYC Status<br/><strong>Pending</strong></span>
            </div>
            <Link href={`/auth/business/setting/edit-profile?id=${encodeId(profile.id)}`} className={styles.editBtn}>
              <FaEdit /> Edit Profile
            </Link>
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
                strokeDasharray="72, 100"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 'bold', color: '#111827' }}>
              72%
            </span>
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
            <h3>0</h3>
            <p>Active Properties</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: '#e6ffec', color: '#10b981'}}>
            <FaUsers />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Leads</h4>
            <h3>0</h3>
            <p>Potential Buyers</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: '#f3e8ff', color: '#8b5cf6'}}>
            <FaComments />
          </div>
          <div className={styles.statInfo}>
            <h4>Total Inquiries</h4>
            <h3>0</h3>
            <p>New Messages</p>
          </div>
        </div>
      </div>

      {/* Info Grid - Personal and Address only */}
      <div className={styles.infoGrid}>
        {/* Personal Info */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaUser className={styles.cardIcon} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}><span>Full Name</span><strong>{fullName}</strong></div>
            <div className={styles.infoRow}><span>Username</span><strong>{profile.user_name || "N/A"}</strong></div>
            <div className={styles.infoRow}><span>Mobile Number</span><strong>{profile.phone || "N/A"}</strong></div>
            <div className={styles.infoRow}><span>Email Address</span><strong>{profile.email || "N/A"}</strong></div>
            <div className={styles.infoRow}><span>Role</span><strong>{profile.role_name || "Owner"}</strong></div>
            <div className={styles.infoRow}><span>User ID</span><strong>{profile.unique_id || "-"}</strong></div>
          </div>
        </div>

        {/* Address Info */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaMapMarkerAlt className={styles.cardIcon} />
            <h3>Address Information</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}><span>Country</span><strong>{profile.country || "-"}</strong></div>
            <div className={styles.infoRow}><span>State</span><strong>{profile.state || "-"}</strong></div>
            <div className={styles.infoRow}><span>City</span><strong>{profile.city || "-"}</strong></div>
            <div className={styles.infoRow}><span>Area/Locality</span><strong>{profile.area || "-"}</strong></div>
            <div className={styles.infoRow}><span>Street Address</span><strong>{profile.street_address || "-"}</strong></div>
            <div className={styles.infoRow}><span>PIN Code</span><strong>{profile.pincode || "-"}</strong></div>
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
              <div className={styles.infoRow}><span>Account Status</span><span className={styles.statusApproved}>Approved</span></div>
              <div className={styles.infoRow}><span>KYC Status</span><span className={styles.statusPending}>Pending</span></div>
              <div className={styles.infoRow}><span>Aadhar Number</span><strong>{profile?.aadhaar_number || "-"}</strong></div>
    
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
              {profile.about ? (
                <p>{profile.about}</p>
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

