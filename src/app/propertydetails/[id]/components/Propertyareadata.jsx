"use client";
import { useState } from "react";
import styles from "./Propertyareadata.module.css";
import AreaUnitDropdown from "@/Components/AreaUnitDropdown/AreaUnitDropdown";

const Propertyareadata = () => {
  const [showMore, setShowMore] = useState(false);

  const propertyData = [
    { label: "Carpet Area", value: <AreaUnitDropdown /> },
    { label: "Developer", value: "Ganesh Property.pvt.ltd" },
    { label: "Property Type", value: "New Property" },
    { label: "Additional Room", value: "1 Playing Room" },
    { label: "Facing", value: "East" },
    { label: "Floor", value: "07 (out of 20 floors)" },
    { label: "Available from", value: "Nxt Month" },
    {
      label: "Address",
      value: (
        <>
          Ganesh Ernakulam,<br />
          Kerela<br />
          Pincode: 4785211
        </>
      ),
    },
    { label: "Lifts", value: "Four" },
    { label: "Available", value: "Family" },
  ];

  const morePropertyData = [
    { label: "Water Supply", value: "24x7" },
    { label: "Furnishing", value: "Semi-Furnished" },
    { label: "Age of Property", value: "Under Construction" },
  ];

  return (
    <div className={` text-dark  ${styles.propertyDetailsBox}`}>
      <h4 className={styles.sectionTitle}>Property Details</h4>
      <div className={`${styles.propertyDetailsGrid}`}>
        {propertyData.map((item, index) => (
          <div key={index}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.value}>{item.value}</p>
          </div>
        ))}

        {showMore &&
          morePropertyData.map((item, index) => (
            <div key={index}>
              <p className={styles.label}>{item.label}</p>
              <p className={styles.value}>{item.value}</p>
            </div>
          ))}
      </div>
      <button
        className={styles.viewMore}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "View less Details" : "View more Details"}
      </button>
    </div>
  );
};

export default Propertyareadata;
