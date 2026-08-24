"use client";
import { useState } from "react";
import styles from "./Propertyareadata.module.css";
import AreaUnitDropdown from "@/Components/AreaUnitDropdown/AreaUnitDropdown";
import Link from "next/link";

// utils/propertyHelpers.ts
export function getRepeaterValue(property, slugStart) {
  const field = property.repeater_fields?.find((f) => f.template.slug.startsWith(slugStart));
  return field || null;
}

const Propertyareadata = ({ property }) => {
  const [showMore, setShowMore] = useState(false);

  // Filter repeater fields
  const repeaterFields = property?.repeater_fields
  ? Object.values(property.repeater_fields)
  : [];
 const areaFields = Array.isArray(repeaterFields)
  ? repeaterFields?.filter(
      (val) =>
        val?.template?.slug?.startsWith("overview") &&
        // val?.template?.slug?.includes("area") &&
        !val?.template?.slug?.includes("bedroom") &&
        !val?.template?.slug?.includes("bathroom") &&
        !val?.template?.slug?.includes("balconies") &&
        !val?.template?.slug?.includes("lift") &&
         !val?.template?.slug?.includes("furnish") &&
        !val?.template?.slug?.includes("parking") &&
        !val?.template?.slug?.includes("price")
    )
  : [];
  // const areaFields = Array.isArray(property?.repeater_fields) ? property?.repeater_fields?.filter(
  //   (f) =>
  //     f?.template?.name?.startsWith("property.area") ||
  //     f?.template?.name?.startsWith("property.furnishing")
  // ) || [] : [];

  // Map filtered fields to displayable structure
  const repeaterData = areaFields.map((f) => ({
    label: f.field_label,
    value: f?.template?.slug?.includes("area") ? (
      <AreaUnitDropdown baseSqft={f.field_value} />
    ) : (
      f.field_value
    ),
  }));

  // Always include project, developer, and location
  const staticData = [
    { label: "Project", value: property?.project_id_name, link: `/project-details?name=${property?.project_id_name}&id=${property?.project_id}` },
    { label: "Developer", value: property?.Developer_id_name },
    {
      label: "Address",
      value: (
        <>
          {property?.city?.name}, {property?.state?.name}
        </>
      ),
    },
    // Add this temporary field to see the dropdown!
    {
      label: "Test Area",
      value: <AreaUnitDropdown baseSqft={1500} />
    }
  ];

  // Combine all fields
  const allFields = [...repeaterData, ...staticData].filter(
    (item) => item.value !== null && item.value !== "" && item.value !== undefined
  );

  const showButton = allFields.length > 6;
  const visibleFields = showMore ? allFields : allFields.slice(0, 6);

  return (
    <div className={`text-dark ${styles.propertyDetailsBox}`}>
      <h4 className={styles.sectionTitle}>Property Details</h4>
      <div className={styles.propertyDetailsGrid}>
        {visibleFields.map((item, index) => (
          <div key={index}>
            <p className={styles.label}>{item.label}</p>
            <div className={styles.value}>
              {item.link ? <Link href={item.link} style={{color:'black'}}>{item.value}</Link> : item.value}
            </div>
          </div>
        ))}
      </div>
      {showButton && (
        <button className={styles.viewMore} onClick={() => setShowMore(!showMore)}>
          {showMore ? "View less Details" : "View more Details"}
        </button>
      )}
    </div>
  );
};

export default Propertyareadata;
