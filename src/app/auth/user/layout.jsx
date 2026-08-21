"use client";
import React, { useEffect, useState } from "react";
import styles from "./components/All-list-Dashboard.module.css";
import SidebarDashboard from "./components/Sidebar-Dashboard";
import { usePathname, useRouter } from "next/navigation";
import ProtectedRoute from "@/Components/protectedRoute";
import {
  DashboardProvider,
  useDashboard,

} from "./DashboardContext/DashboardContext";
import checkAuth from "../checkAuth";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { toast } from "react-toastify";

function Layout({ children }) {
  const pathname = usePathname();
  const { showSidebar, pageHeading } = useDashboard();

  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState("desktop"); // Default desktop
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
  const { kycStatus } = useSiteSettings();

  const isKycComplete = !kycStatus ? true : ["submitted", "pending", "under review", "approved", "verified", "completed"].includes(kycStatus.toLowerCase());

  useEffect(() => {
    if (kycStatus !== null && !isKycComplete && pathname !== "/auth/user/dashboard" && !pathname.startsWith("/auth/user/dashboard/edit-profile")) {
      toast.error("Please complete your KYC first.");
      router.replace("/auth/user/dashboard");
    }
  }, [kycStatus, pathname, isKycComplete, router]);
  useEffect(() => {
    setHasMounted(true);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setMode(mobile ? "mobile-sidebar" : "desktop");
    };

    // Initial call and listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Switch to mobile content view when route changes
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
        <div className={styles.mainContainer}>
          {pageHeading && (
            <h1 className={`${styles.heading} top-heading`}>{pageHeading}</h1>
          )}

          <div className={styles.pagerow}>
            {/* ✅ Desktop Sidebar */}
            {showSidebar && mode === "desktop" && (
              <div className={styles.Sidebarcol}>
                <SidebarDashboard />
              </div>
            )}

            {/* ✅ Mobile Sidebar */}
            {showSidebar && isMobile && mode === "mobile-sidebar" && (
              <div className={styles.mobileSidebarTabs}>
                <SidebarDashboard />
              </div>
            )}

            {/* ✅ Main Content */}
            {(mode === "desktop" || mode === "mobile-content") && (
              <main
                className={`${styles.main} ${!showSidebar ? styles.fullWidth : ""
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
