'use client';
import styles from "./Sidebar-Dashboard.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaChartBar, FaBuilding, FaEnvelope, FaBook,
  FaCalendarAlt, FaLifeRing, FaCog
} from "react-icons/fa";
import { HiDocumentChartBar } from "react-icons/hi2";

const menuItems = [
  { icon: <FaChartBar />, label: "Analytics", link: "/auth/user/account" },
  { icon: <FaBuilding />, label: "Listings", link: "/auth/user/listing" },
  { icon: <FaEnvelope />, label: "Inquiry", link: "/auth/user/inquiry" },
  { icon: <FaBook />, label: "Insights", link: "/auth/user/insight" },
  { icon: <HiDocumentChartBar />, label: "Document", link: "/auth/user/document" },
  { icon: <FaCalendarAlt />, label: "Appointment", link: "/auth/user/appointment" },
  { icon: <FaLifeRing />, label: "Support", link: "/auth/user/support" },
  { icon: <FaCog />, label: "Settings", link: "/auth/user/setting" },
];

export default function SidebarDashboard({onItemClick}) {
  const pathname = usePathname();
  const router = useRouter();

const handleMobileClick = (link) => {
  if (pathname !== link) {
    if (onItemClick) onItemClick();
    router.push(link);
  }
};

console.log(onItemClick);
  return (
    <div className={styles.sidebarContainer}>
      {/* Desktop Sidebar */}
      <div className={styles.sidebarDesktop}>
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index} className={`${styles.menuItem} ${pathname === item.link ? styles.active : ''}`}>
            <div className={styles.menuContent}>
              <div className={styles.icon}>{item.icon}</div>
              <span className={styles.label}>{item.label}</span>
            </div>
          </Link>
        ))}
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
      </div>
    </div>
  );
}
