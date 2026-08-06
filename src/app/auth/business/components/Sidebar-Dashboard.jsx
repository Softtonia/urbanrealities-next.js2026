'use client';
import styles from "./Sidebar-Dashboard.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import {
  FaChartBar, FaBuilding, FaEnvelope, FaBook,
  FaCalendarAlt, FaLifeRing, FaSignOutAlt, FaThLarge, FaCrown
} from "react-icons/fa";
import { HiDocumentChartBar,HiOutlineTicket } from "react-icons/hi2";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const menuItems = [
  { icon: <FaThLarge />, label: "Dashboard", link: "/auth/business/dashboard" },
  { icon: <FaChartBar />, label: "Analytics", link: "/auth/business/account" },
  { icon: <FaBuilding />, label: "Listings", link: "/auth/business/listing" },
  { icon: <FaEnvelope />, label: "Inquiry", link: "/auth/business/inquiry" },
  { icon: <FaBook />, label: "Insights", link: "/auth/business/insight" },
  { icon: <HiOutlineTicket />, label: "Leads", link: "/auth/business/leads" },
  { icon: <HiDocumentChartBar />, label: "Document", link: "/auth/business/document" },
  { icon: <FaCalendarAlt />, label: "Appointment", link: "/auth/business/appointment" },
  { icon: <FaCrown />, label: "Membership", link: "/auth/business/my-current-plan" },
  { icon: <FaLifeRing />, label: "Support", link: "/auth/business/support" },
];

export default function SidebarDashboard({ onItemClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useSiteSettings();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMobileClick = (link) => {
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
            const isActive = pathname === item.link;
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
        {menuItems.map((item, index) => (
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
        ))}
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
