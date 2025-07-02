import styles from "./Sidebar-Dashboard.module.css";
import {
  FaChartBar,
  FaBuilding,
  FaEnvelope,
  FaBook,
  FaCalendarAlt,
  FaLifeRing,
  FaCog,
} from "react-icons/fa";
import { HiDocumentChartBar } from "react-icons/hi2";

const menuItems = [
  { icon: <FaChartBar />, label: "Analytics" },
  { icon: <FaBuilding />, label: "Listings" },
  { icon: <FaEnvelope />, label: "Inquiry" },
  { icon: <FaBook />, label: "Insights" },
  { icon: <HiDocumentChartBar />, label: "Document" },
  { icon: <FaCalendarAlt />, label: "Appointment" },
  { icon: <FaLifeRing />, label: "Support" },
  { icon: <FaCog />, label: "Settings" },
];

export default function SidebarDashboard() {
  return (
    <div className={styles.sidebar}>
      {menuItems.map((item, index) => (
        <div key={index} className={styles.menuItem}>
          <div className={styles.menuContent}>
          <div className={styles.icon}>{item.icon}</div>
          <span className={styles.label}>{item.label}</span>
        </div>
        </div>
      ))}
    </div>
  );
}
