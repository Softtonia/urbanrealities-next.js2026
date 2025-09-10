"use client";
import React, { useEffect, useState } from "react";
import styles from "./components/All-list-Dashboard.module.css";
import SidebarDashboard from "./components/Sidebar-Dashboard";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(false);
        setShowContent(true);
      } else {
        setShowSidebar(true);
        setShowContent(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowContent(true);
    }
  }, [pathname, isMobile]);

  const handleSidebarItemClick = () => {
    setShowContent(true);
    setShowSidebar(false);
  };

  const handleBackClick = () => {
    setShowContent(false);
    setShowSidebar(true);
  };

  if (!hasMounted) return null;

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.mainContainer} container`}>
        <h1 className={`${styles.heading} top-heading`}>
          Welcome Back! Urbanrealities
        </h1>

        <div className={styles.pagerow}>
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className={styles.Sidebarcol}>
              <SidebarDashboard onItemClick={handleSidebarItemClick} />
            </div>
          )}

          {/* Mobile Sidebar Fullscreen with Slide */}
          {isMobile && showSidebar && (
            <div className={styles.mobileSidebar}>
              <SidebarDashboard onItemClick={handleSidebarItemClick} />
            </div>
          )}

          {/* Main Content */}
          {showContent && (
            <main className={styles.main}>
              {isMobile && (
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
  );
}
