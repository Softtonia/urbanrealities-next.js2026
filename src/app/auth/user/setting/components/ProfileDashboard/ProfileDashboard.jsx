"use client";
import React, { useState } from "react";
import styles from "./ProfileDashboard.module.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import AboutUs from "../AboutUs/AboutUs";
import PropertyCard from "../PropertyCard/PropertyCard";
import FilesSection from "../FilesSection/FilesSection";
import OtherFilesSection from "../OtherFilesSection/OtherFilesSection";

const Dashboard = () => {

  //   const [progress, setProgress] = useState(70);
//   const [count, setCount] = useState(150);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topSection}>
        <ProfileCard />
        <div className={styles.mainContent}>
          <AboutUs />
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
      <FilesSection />
      <OtherFilesSection />
    </div>
  );
};

export default Dashboard;

