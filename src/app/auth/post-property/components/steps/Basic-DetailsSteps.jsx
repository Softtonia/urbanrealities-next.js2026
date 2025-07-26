"use client";
import styles from "./Basic-DetailsSteps.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StepContent() {
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedCategory, setExpandedCategory] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");

  const router = useRouter();

  const purposes = ["Sell", "Rent / Lease", "PG"];

  const residentialCategories = [
    { label: "Flat/Apartment" },
    { label: "Independent House / Villa" },
    { label: "Independent / Builder Floor" },
    { label: "Plot / Land" },
    { label: "1 RK/ Studio Apartment" },
    { label: "Serviced Apartment" },
    { label: "Farmhouse" },
    { label: "Other" },
  ];

  const commercialCategories = [
    {
      label: "Office Space",
        subtext: [
        "What kind of office is it?",
       
      ],
      subOptions: [
        "Ready to Move",
        "Furnished",
        "Under Construction",
        "Bare Shell",
      ],

    },
    { label: "Shop" },
    { label: "Showroom" },
    { label: "Commercial Land" },
    { label: "Warehouse / Godown" },
    { label: "Industrial Building" },
    { label: "Co-working Space" },
    { label: "Other" },
  ];

  const categories =
    selectedPropertyType === "Residential"
      ? residentialCategories
      : commercialCategories;

  const handleContinue = () => {
    router.push("/auth/post-property/location-details");
  };

  return (
    <div className={styles.content}>
      <h3>Welcome back Manmeet,</h3>
      <h3>Fill out basic details</h3>

      {/* Purpose Selection */}
      <div className={styles.optionGroup}>
        <p className={` body-text-md18 ${styles.subPara} `} >I'm looking to</p>
        <div className={styles.optionButtons}>
          {purposes.map((p) => (
            <button
              key={p}
              className={`${styles.optionBtn} ${
                selectedPurpose === p ? styles.selected : ""
              }`}
              onClick={() => setSelectedPurpose(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Selection */}
      <div className={styles.optionGroup}>
        <p className={` body-text-md18 ${styles.subPara} `} >What kind of property do you have?</p>
        <div className={styles.radioGroup}>
          {["Residential", "Commercial"].map((type) => (
            <label
              key={type}
              className={`${styles.radioLabel} ${
                selectedPropertyType === type ? styles.selected : ""
              }`}
            >
              <input
                type="radio"
                name="propertyType"
                value={type}
                checked={selectedPropertyType === type}
                onChange={() => {
                  setSelectedPropertyType(type);
                  setSelectedCategory("");
                  setExpandedCategory("");
                  setSelectedSubOption("");
                }}
                className={styles.radioInput}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Category Buttons */}
      <div className={styles.optionButtons}>
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={`${styles.optionBtn} ${
              selectedCategory === cat.label ? styles.selected : ""
            }`}
            onClick={() => {
              setSelectedCategory(cat.label);
              if (cat.subOptions) {
                setExpandedCategory(cat.label);
              } else {
                setExpandedCategory("");
                setSelectedSubOption("");
              }
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sub-options shown separately below */}
      {expandedCategory &&
        categories.find((c) => c.label === expandedCategory)?.subOptions && (
                <div className={styles.optionGroup}>
        <p className={` body-text-md18 ${styles.subPara} `} > 
        {
          categories.find((c) => c.label === expandedCategory)?.subtext?.[0] ||
          "Select an option"
        }          </p>

          <div className={styles.optionButtons}>
            {categories
              .find((c) => c.label === expandedCategory)
              .subOptions.map((sub) => (
                <button
                  key={sub}
                  className={`${styles.optionBtn} ${
                    selectedSubOption === sub ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedSubOption(sub)}
                >
                  {sub}
                </button>
              ))}
          </div>
          </div>
        )}

      {/* Continue Button */}
      <button className={` continueBtn ${styles.continueBtn}`} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
