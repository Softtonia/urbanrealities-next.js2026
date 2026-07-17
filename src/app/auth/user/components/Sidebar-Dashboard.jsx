'use client';
import styles from "./Sidebar-Dashboard.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaChartBar, FaBuilding, FaEnvelope, FaBook,
  FaCalendarAlt, FaLifeRing, FaSignOutAlt, FaThLarge
} from "react-icons/fa";
import { HiDocumentChartBar,HiOutlineTicket } from "react-icons/hi2";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const menuItems = [
  { icon: <FaThLarge />, label: "Dashboard", link: "/auth/user/dashboard" },
  { icon: <FaChartBar />, label: "Analytics", link: "/auth/user/account" },
  { icon: <FaBuilding />, label: "Listings", link: "/auth/user/listing" },
  { icon: <FaEnvelope />, label: "Inquiry", link: "/auth/user/inquiry" },
  { icon: <FaBook />, label: "Insights", link: "/auth/user/insight" },
  { icon: <HiOutlineTicket />, label: "Leads", link: "/auth/user/leads" },
  { icon: <HiDocumentChartBar />, label: "Document", link: "/auth/user/document" },
  { icon: <FaCalendarAlt />, label: "Appointment", link: "/auth/user/appointment" },
  { icon: <FaLifeRing />, label: "Support", link: "/auth/user/support" },
];

export default function SidebarDashboard({ onItemClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useSiteSettings();

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
                  <div className={styles.icon}>{item.icon}</div>
                  <span className={styles.label}>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </Link>
            );
          })}
          {/* Logout Button */}
          <div className={styles.menuItem} onClick={handleLogout}>
            <div className={styles.menuContent}>
              <div className={styles.icon}><FaSignOutAlt /></div>
              <span className={styles.label}>Logout</span>
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
            <div className={styles.gridIcon}>{item.icon}</div>
            <div className={styles.gridLabel}>{item.label}</div>
          </button>
        ))}
        <button className={styles.gridItem} onClick={handleLogout}>
          <div className={styles.gridIcon}><FaSignOutAlt /></div>
          <div className={styles.gridLabel}>Logout</div>
        </button>
      </div>
    </div>
  );
}
