"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProfileDashboard.module.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import AboutUs from "../AboutUs/AboutUs";
import PropertyCard from "../PropertyCard/PropertyCard";
import FilesSection from "../FilesSection/FilesSection";
import OtherFilesSection from "../OtherFilesSection/OtherFilesSection";
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';


const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const { token, userId } = useSiteSettings();
  const [profile, setProfile] = useState({})

  const fetchProfile = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/user-profile?id=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLoading(false);
      console.log(data)
      if (data) {
        setProfile(data);
      } else {
        setProfile([]);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, []);

  console.log("profile", profile, userId, token)
  //   const [progress, setProgress] = useState(70);
  //   const [count, setCount] = useState(150);
  if (loading) return (
    <div className={styles.loadingOverlay}>
    <div className={styles.spinner}></div>
    <p></p>
  </div>)
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topSection}>
        <ProfileCard profile={profile} />
        <div className={styles.mainContent}>
          <AboutUs profile={profile} />
          <div className={styles.propertiesGrid}>
            <PropertyCard count={58} label="Properties Rent" percentage={40} color="#37D159" />
            <PropertyCard count={48} label="Properties Sell" percentage={80} color="#2B98D6" />
          </div>
        </div>
      </div>
      <div className={styles.propertiesGridmedia}>
        <PropertyCard count={58} label="Properties Rent" percentage={40} color="#37D159" />
        <PropertyCard count={48} label="Properties Sell" percentage={80} color="#2B98D6" />
      </div>
      {/* <FilesSection />
      <OtherFilesSection /> */}
    </div>
  );
};

export default Dashboard;

