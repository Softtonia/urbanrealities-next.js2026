"use client";
import { useState } from "react";
import styles from "./PropertyAmenities.module.css";
import {
  FaSwimmingPool,
  FaHome,
  FaHelicopter,
  FaGlassCheers,
  FaWineBottle,
  FaFire,
  FaMountain,
  FaWater,
  FaBed,
  FaUtensils,
  FaLock,
  FaUserShield,
} from "react-icons/fa";

const AMENITIES_DATA = {
  Crowdsourcing: [
    { icon: <FaLock />, label: "Fingerprint Access" },
    { icon: <FaGlassCheers />, label: "Jacuzzi" },
    { icon: <FaHome />, label: "Skydeck" },
    { icon: <FaWater />, label: "Sea Facing" },
    { icon: <FaBed />, label: "Golf Course" },
    { icon: <FaHelicopter />, label: "Helipad" },
    { icon: <FaWineBottle />, label: "Wine Cellar" },
    { icon: <FaUserShield />, label: "Theme Based Architectures" },
    { icon: <FaHome />, label: "Private Garage" },
    { icon: <FaSwimmingPool />, label: "Private Pool" },
    { icon: <FaHome />, label: "Wrap Around Balcony" },
    { icon: <FaGlassCheers />, label: "Full Glass Wall" },
    { icon: <FaUtensils />, label: "Island Kitchen Layout" },
    { icon: <FaHome />, label: "Sky Villa" },
    { icon: <FaBed />, label: "House Help" },
    { icon: <FaFire />, label: "Fireplace" },
    { icon: <FaHome />, label: "Smart Homes" },
    { icon: <FaMountain />, label: "Hilltop" },
    { icon: <FaWater />, label: "Water Front" },
  ],
  Convenience: [
    { icon: <FaHome />, label: "WiFi Enabled" },
    { icon: <FaGlassCheers />, label: "Daily Cleaning" },
  ],
  Environment: [
    { icon: <FaWater />, label: "Rainwater Harvesting" },
    { icon: <FaHome />, label: "Solar Panels" },
  ],
  Leisure: [
    { icon: <FaSwimmingPool />, label: "Infinity Pool" },
    { icon: <FaGlassCheers />, label: "Clubhouse" },
  ],
  Security: [
    { icon: <FaUserShield />, label: "CCTV Surveillance" },
    { icon: <FaLock />, label: "24x7 Security" },
  ],
  Sports: [
    { icon: <FaHome />, label: "Tennis Court" },
    { icon: <FaHome />, label: "Skating Rink" },
  ],
};

const TABS = Object.keys(AMENITIES_DATA);

const PropertyAmenities = () => {
  const [activeTab, setActiveTab] = useState("Crowdsourcing");

  return (
    <div className={styles.amenitiesBox}>
      <h4 className={`body-text-sb18 ${styles.sectionTitle}`}>Amenities</h4>
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`body-text-rg16 ${styles.tab} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {AMENITIES_DATA[activeTab].map((item, index) => (
          <div key={index} className={styles.amenityItem}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={`body-text-rg16 ${styles.label}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;
