"use client";
import React, { useEffect, useState } from "react";
// import styles from './components/My-Account-Dashboard.module.css';
import styles from "./components/All-list-Dashboard.module.css";
import SidebarDashboard from "./components/Sidebar-Dashboard";
import { usePathname, useRouter } from "next/navigation";
import ProtectedRoute from "@/Components/protectedRoute";
import {
  DashboardProvider,
  useDashboard,
} from "./DashboardContext/DashboardContext";

function Layout({ children }) {
  const pathname = usePathname();
  const { showSidebar, pageHeading } = useDashboard();

  const [isMobile, setIsMobile] = useState(true);
  const [mode, setMode] = useState("mobile-sidebar"); // 'desktop', 'mobile-sidebar', 'mobile-content'
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const mobile = window.innerWidth < 768;
  //     setIsMobile(mobile);
  //     if (!mobile) {
  //       setMode("desktop");
  //     } else {
  //       setMode("mobile-sidebar");
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // Jab route change ho, mobile me content dikhaye
  useEffect(() => {
    if (isMobile && mode === "mobile-sidebar") {
      setMode("mobile-content");
    }
  }, [pathname]);

  const handleBackClick = () => {
    setMode("mobile-sidebar");
  };

  if (!hasMounted) return null;

  return (
    <ProtectedRoute>
      <div className={styles.dashboard}>
        <div className={`${styles.mainContainer} container`}>
          {pageHeading && (
            <h1 className={`${styles.heading} top-heading`}>{pageHeading}</h1>
          )}

          <div className={styles.pagerow}>
            {/* Desktop Sidebar */}
            {showSidebar && mode === "desktop" && (
              <div className={styles.Sidebarcol}>
                <SidebarDashboard />
              </div>
            )}

            {/* Mobile Sidebar */}
            {showSidebar && isMobile && mode === "mobile-sidebar" && (
              <div className={styles.mobileSidebarTabs}>
                <SidebarDashboard />
              </div>
            )}

            {/* Main Content */}
            {(mode === "desktop" || mode === "mobile-content") && (
              <main
                className={`${styles.main} ${
                  !showSidebar ? styles.fullWidth : ""
                }`}
              >
                {isMobile && mode === "mobile-content" && (
                  <button className={styles.backBtn} onClick={handleBackClick}>
                    ← Back
                  </button>
                )}
                {children}
              </main>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
export default function UserLayout({ children }) {
  return (
    <DashboardProvider>
      <Layout>{children}</Layout>
    </DashboardProvider>
  );
}
