// MoreFiltersPanel.js
import React, { useState } from "react";
import styles from "./PropertyFilters.module.css";
import { FaTimes } from "react-icons/fa"; // क्रॉस आइकॉन के लिए

const MoreFiltersPanel = ({ onClose }) => {
  const [minCoveredArea, setMinCoveredArea] = useState(0);
  const [maxCoveredArea, setMaxCoveredArea] = useState(5000);
  const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([]);
  const [selectedSubPropertyType, setSelectedSubPropertyType] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  // बाकी स्टेट्स यहाँ जोड़ें

  const data = {
    coveredArea: {
      min: 0,
      max: 5000,
    },
    possessionStatus: ["Ready To Move", "Under Construction"],
    subPropertyType: [
      { group: "Residential", items: ["Flat", "House/ Villas", "Plot/Land"] },
      { group: "Commercial", items: ["Office", "Shop", "Godown"] },
    ],
    saleType: ["New", "Resale"],
    postedBy: ["Owner", "Broker", "Developer"],
  };

  const handleToggle = (state, setState, value) => {
    setState(
      state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
    );
  };

  return (
    <div className={styles.moreFiltersPanel}>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
      <div className={styles.panelContent}>
        {/* Left Section */}
        <div className={styles.leftPanel}>
          <ul className={styles.filterList}>
            <li>Covered Area</li>
            <li>Possession Status</li>
            <li>Sub Property Type</li>
            <li>Sale Type</li>
            <li>Posted By</li>
            {/* बाकी लिस्ट आइटम्स यहाँ जोड़ें */}
          </ul>
        </div>
        {/* Right Section */}
        <div className={styles.rightPanel}>
          <div className={styles.filterSection}>
            <h3>Covered Area (sqft)</h3>
            {/* यहाँ रेंज स्लाइडर कॉम्पोनेंट आएगा */}
          </div>

          <div className={styles.filterSection}>
            <h3>Possession Status</h3>
            <div className={styles.optionsWrapper}>
              {data.possessionStatus.map((item) => (
                <button
                  key={item}
                  className={`${styles.filterOption} ${
                    selectedPossessionStatus.includes(item) ? styles.active : ""
                  }`}
                  onClick={() =>
                    handleToggle(
                      selectedPossessionStatus,
                      setSelectedPossessionStatus,
                      item
                    )
                  }
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          {/* बाकी सेक्शन्स यहाँ जोड़ें (Sub Property Type, Posted By आदि) */}
        </div>
      </div>
    </div>
  );
};

export default MoreFiltersPanel;