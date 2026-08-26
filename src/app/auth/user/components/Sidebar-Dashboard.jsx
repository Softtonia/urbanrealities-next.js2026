'use client';
import styles from "./Sidebar-Dashboard.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import {
  FaChartBar, FaBuilding, FaEnvelope, FaBook,
  FaCalendarAlt, FaLifeRing, FaSignOutAlt, FaThLarge, FaCrown, FaPuzzlePiece, FaIdCard
} from "react-icons/fa";
import { HiDocumentChartBar,HiOutlineTicket } from "react-icons/hi2";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { toast } from "react-toastify";

const menuItems = [
  { icon: <FaThLarge />, label: "Dashboard", link: "/auth/user/dashboard" },
  { icon: <FaChartBar />, label: "Analytics", link: "/auth/user/account" },
  { icon: <FaBuilding />, label: "Listings", link: "/auth/user/listing" },
  // { icon: <FaEnvelope />, label: "Inquiry", link: "/auth/user/inquiry" },
  { icon: <FaBook />, label: "Insights", link: "/auth/user/insight" },
  { icon: <HiOutlineTicket />, label: "Leads", link: "/auth/user/leads" },
  { icon: <HiDocumentChartBar />, label: "Document", link: "/auth/user/document" },
  { icon: <FaIdCard />, label: "KYC", link: "/auth/user/kyc" },
  // { icon: <FaCalendarAlt />, label: "Appointment", link: "/auth/user/appointment" },
  { icon: <FaCrown />, label: "Membership", link: "/auth/user/my-current-plan" },
  { icon: <FaPuzzlePiece />, label: "Add-ons", link: "/auth/user/addons" },
  { icon: <FaLifeRing />, label: "Support", link: "/auth/user/support" },
];

export default function SidebarDashboard({ onItemClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, token, kycStatus } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [hasActiveMembership, setHasActiveMembership] = useState(false);

  const isKycComplete = !kycStatus || ["approved", "verified", "completed", "accepted", "2"].includes(String(kycStatus).trim().toLowerCase());

  useEffect(() => {
    let isMounted = true;
    const fetchStatus = async () => {
      if (token) {
        try {
          const { fetchMyStatus } = await import('@/services/membership.service');
          const result = await fetchMyStatus(token);
          if (isMounted && result?.status && result?.data) {
            setHasActiveMembership(result.data.has_active_membership);
          }
        } catch (error) {
          console.error("Failed to fetch membership status:", error);
        }
      }
    };
    fetchStatus();

    const timer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1000);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [token]);

  const handleMobileClick = (link) => {
    if (!isKycComplete && link !== "/auth/user/kyc") {
      if (kycStatus?.toLowerCase() === "submitted") {
        toast.error("Waiting for admin to approve KYC.");
      } else {
        toast.error("Please complete your KYC first.");
      }
      return;
    }
    if (pathname !== link) {
      router.push(link);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    router.push("/");
  };

  return (
    <div className={styles.sidebarContainer}>
      {/* Desktop Sidebar */}
      <div className={styles.sidebarDesktop}>
        <div className={styles.menuList}>
          {menuItems.map((item, index) => {
            if (item.label === "Add-ons" && !hasActiveMembership) return null;
            const isActive = pathname === item.link;

            if (!isKycComplete && item.link !== "/auth/user/kyc") {
              return (
                <div key={index} onClick={() => {
                  if (kycStatus?.toLowerCase() === "submitted") {
                    toast.error("Waiting for admin to approve KYC.");
                  } else {
                    toast.error("Please complete your KYC first.");
                  }
                }} className={`${styles.menuItem} ${isActive ? styles.active : ''}`} style={{ cursor: "pointer" }}>
                  <div className={styles.menuContent}>
                    <div className={styles.icon}>
                      {loading ? <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : item.icon}
                    </div>
                    <span className={styles.label}>
                      {loading ? <Skeleton variant="text" width={100} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : item.label}
                    </span>
                  </div>
                  {item.badge !== undefined && !loading && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </div>
              );
            }

            return (
              <Link href={item.link} key={index} className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>
                <div className={styles.menuContent}>
                  <div className={styles.icon}>
                    {loading ? <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : item.icon}
                  </div>
                  <span className={styles.label}>
                    {loading ? <Skeleton variant="text" width={100} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : item.label}
                  </span>
                </div>
                {item.badge !== undefined && !loading && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </Link>
            );
          })}
          {/* Logout Button */}
          <div className={styles.menuItem} onClick={handleLogout}>
            <div className={styles.menuContent}>
              <div className={styles.icon}>
                {loading ? <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : <FaSignOutAlt />}
              </div>
              <span className={styles.label}>
                {loading ? <Skeleton variant="text" width={100} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : "Logout"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Grid Sidebar */}
      <div className={styles.sidebarMobile}>
        {menuItems.map((item, index) => {
          if (item.label === "Add-ons" && !hasActiveMembership) return null;
          return (
          <button
            key={index}
            className={styles.gridItem} 
            onClick={() => handleMobileClick(item.link)}
          >
            <div className={styles.gridIcon}>
              {loading ? <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : item.icon}
            </div>
            <div className={styles.gridLabel}>
              {loading ? <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : item.label}
            </div>
          </button>
        )})}
        <button className={styles.gridItem} onClick={handleLogout}>
          <div className={styles.gridIcon}>
            {loading ? <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : <FaSignOutAlt />}
          </div>
          <div className={styles.gridLabel}>
            {loading ? <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> : "Logout"}
          </div>
        </button>
      </div>
    </div>
  );
}
