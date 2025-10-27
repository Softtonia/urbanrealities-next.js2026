"use client";
import { useState } from "react";
import styles from "./PropertyAmenities.module.css";
import {
  FaSwimmingPool,
  FaHome,
  FaGlassCheers,
  FaLock,
  FaUserShield,
} from "react-icons/fa";

const ICON_MAP = {
  pool: <FaSwimmingPool />,
  reception: <FaHome />,
  safety: <FaUserShield />,
  lock: <FaLock />,
  banquet: <FaGlassCheers />,
};

const getIcon = (label = "") => {
  const l = label.toLowerCase();

  if (l.includes("pool")) return ICON_MAP.pool;
  if (l.includes("fire") || l.includes("safety")) return ICON_MAP.safety;
  if (l.includes("banquet") || l.includes("hall")) return ICON_MAP.banquet;
  if (l.includes("reception")) return ICON_MAP.reception;
  if (l.includes("lock") || l.includes("intercom")) return ICON_MAP.lock;

  return <FaHome />; // default icon
};

const PropertyAmenities = ({ property }) => {
  const repeaterFields = property?.repeater_fields
    ? Object.values(property.repeater_fields)
    : [];

  const residentialAmenities = repeaterFields.filter((val) =>
    val?.template?.slug?.startsWith(
      `${property.property_id_name?.toLowerCase()}property`
    )
  );

  const [activeTab, setActiveTab] = useState(
    residentialAmenities?.[0]?.field_label || ""
  );

  if (!residentialAmenities || residentialAmenities.length === 0) return null
  return (
    <div className={styles.amenitiesBox}>
      <h4 className={`body-text-sb18 ${styles.sectionTitle}`}>Amenities</h4>

      <div className={styles.tabs}>
        {residentialAmenities.map((item) => (
          <button
            key={item.custom_field_id}
            className={`body-text-rg16 ${styles.tab} ${activeTab === item.field_label ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab(item.field_label)}
          >
            {item.field_label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {residentialAmenities
          .find((x) => x.field_label === activeTab)
          ?.field_value?.map((value, index) => (
            <div key={index} className={styles.amenityItem}>
              <span className={styles.icon}>{getIcon(value)}</span>
              <span className={`body-text-rg16 ${styles.label}`}>
                {value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;
