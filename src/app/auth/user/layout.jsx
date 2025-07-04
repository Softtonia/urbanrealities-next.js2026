'use client'
import React from "react";
import styles from "./components/My-Account-Dashboard.module.css"
import SidebarDashboard from "./components/Sidebar-Dashboard";

const Layout = ({ children }) => {

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.mainContainer} container`}>
          <h1 className={`${styles.heading} top-heading`}>
            Welcome Back! Urbanrealities
          </h1>
             {/* Desktop Layout */}
        <div className={`${styles.pagerow} `}>
          <div className={`${styles.Sidebarcol}`}>
            <SidebarDashboard />
          </div>
          <main className={`${styles.main} `}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
