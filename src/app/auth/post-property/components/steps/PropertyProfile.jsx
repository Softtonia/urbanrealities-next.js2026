"use client";
import React, { useState } from "react";
// import { usePostProperty } from "@/app/auth/post-property/context/PostPropertyContext";
import styles from "./PropertyProfile.module.css";
import Select from "react-select";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";


export default function PropertyProfileStep() {
  // const { formData, updateFormData } = usePostProperty();
  const [localFields, setLocalFields] = useState({});
  const selectedCategory = "Flat/Apartment";
  const handleChange = (fieldName, value) => {
    setLocalFields((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const router = useRouter();

  const handleContinue = () => {
    console.log("Saved Profile Data:", localFields);
    // updateFormData("propertyProfile", localFields);
        router.push('/auth/post-property/photodetails');

  };

  const profileFieldsMap = {
    "Flat/Apartment": [
      {
        label: "carpet Built-up Area (sq.ft.)",
        name: "carpetBuiltupArea",
        type: "text",
        options: areaUnitOptions(),
      },
      {
        label: "Super Built-up Area (sq.ft.)",
        name: "superBuiltupArea",
        type: "text",
        options: areaUnitOptions(),
      },
      {
        label: "BHK",
        name: "bhk",
        type: "select",
        options: ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK+"],
      },
      {
        label: "Furnishing",
        name: "furnishing",
        type: "select",
        options: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
      },
      {
        label: "Floor No.",
        name: "floorNo",
        type: "select",
        options: generateFloorOptions(),
      },
      { label: "Total Floors", name: "totalFloors", type: "text" },
    ],
    "Independent House / Villa": [
      {
        label: "BHK",
        name: "bhk",
        type: "select",
        options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK+"],
      },
      { label: "Plot Area (sq.ft.)", name: "plotArea", type: "text" },
      {
        label: "Furnishing",
        name: "furnishing",
        type: "select",
        options: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
      },
      { label: "Floors in House", name: "floors", type: "text" },
    ],
    "Plot / Land": [
      { label: "Plot Area (sq.ft.)", name: "plotArea", type: "text" },
      {
        label: "Boundary Wall?",
        name: "boundaryWall",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        label: "Corner Plot?",
        name: "cornerPlot",
        type: "radio",
        options: ["Yes", "No"],
      },
    ],
    "Office Space": [
      { label: "Carpet Area (sq.ft.)", name: "carpetArea", type: "text" },
      {
        label: "Furnishing",
        name: "furnishing",
        type: "select",
        options: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
      },
      {
        label: "Pantry Available?",
        name: "pantry",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        label: "Washrooms",
        name: "washroom",
        type: "radio",
        options: ["Attached", "Common"],
      },
    ],
    Shop: [
      { label: "Built-up Area (sq.ft.)", name: "builtUpArea", type: "text" },
      {
        label: "Furnishing",
        name: "furnishing",
        type: "select",
        options: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
      },
      {
        label: "Corner Shop?",
        name: "cornerShop",
        type: "radio",
        options: ["Yes", "No"],
      },
    ],
    "Warehouse / Godown": [
      { label: "Carpet Area (sq.ft.)", name: "carpetArea", type: "text" },
      { label: "Ceiling Height (ft.)", name: "ceilingHeight", type: "text" },
      {
        label: "Loading Dock?",
        name: "loadingDock",
        type: "radio",
        options: ["Yes", "No"],
      },
    ],
  };
  const goBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };
  // const selectedCategory = formData.category;
  const fieldsToRender = profileFieldsMap[selectedCategory] || [];

  return (
    <div className={styles.selectedCategory}>
      <div className={` ${styles.backWrapper} d-flex align-item-center`}>
        <IoArrowBackSharp className="back-btn" size={20} onClick={goBack} />
        <p className="m-0">Back</p>
      </div>
      <h3>Tell us about your property</h3>

      {fieldsToRender.length === 0 ? (
        <p>No fields available for this category.</p>
      ) : (
        fieldsToRender.map((field) => (
          <div className={styles.formGroup} key={field.name}>
            <label>{field.label}</label>

            {/* Text input with unit dropdown */}
            {field.type === "text" && field.options ? (
              <div className={styles.areaInputWrapper}>
                <input
                  type="text"
                  placeholder="Enter area"
                  value={localFields[field.name]?.value || ""}
                  onChange={(e) =>
                    handleChange(field.name, {
                      ...localFields[field.name],
                      value: e.target.value,
                    })
                  }
                  className={styles.areaInput}
                />

                <Select
                  className={styles.unitSelect}
                  classNamePrefix="unit"
                  value={field.options.find(
                    (opt) => opt.value === localFields[field.name]?.unit
                  )}
                  onChange={(selected) =>
                    handleChange(field.name, {
                      ...localFields[field.name],
                      unit: selected.value,
                    })
                  }
                  options={field.options}
                  placeholder="sq.ft"
                />
              </div>
            ) : field.type === "text" ? (
              <input
                type="text"
                value={localFields[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={styles.input}
              />
            ) : null}

            {/* Select dropdown */}
            {field.type === "select" && (
              <Select
                className={styles.select}
                classNamePrefix="react-select"
                value={
                  field.options.find(
                    (opt) => opt === localFields[field.name]
                  ) || null
                }
                onChange={(selected) => handleChange(field.name, selected)}
                options={field.options.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
                placeholder="Select"
              />
            )}

            {field.type === "radio" && (
              <div className={styles.radioGroup}>
                {field.options.map((option) => (
                  <label key={option} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name={field.name}
                      value={option}
                      checked={localFields[field.name] === option}
                      onChange={() => handleChange(field.name, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      <button
        className={`continueBtn ${styles.continueBtn}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

function areaUnitOptions() {
  return [
    { label: "sq.ft", value: "sq.ft" },
    { label: "sq.yd", value: "sq.yd" },
    { label: "sq.m", value: "sq.m" },
    { label: "acre", value: "acre" },
    { label: "bigha", value: "bigha" },
    { label: "hectare", value: "hectare" },
    { label: "marla", value: "marla" },
    { label: "kanal", value: "kanal" },
    { label: "biswa1", value: "biswa1" },
    { label: "biswa2", value: "biswa2" },
    { label: "ground", value: "ground" },
    { label: "aankadam", value: "aankadam" },
    { label: "rood", value: "rood" },
    { label: "chatak", value: "chatak" },
    { label: "kottah", value: "kottah" },
    { label: "cent", value: "cent" },
    { label: "perch", value: "perch" },
    { label: "guntha", value: "guntha" },
    { label: "are", value: "are" },
    { label: "katha", value: "katha" },
    { label: "gaj", value: "gaj" },
    { label: "killa", value: "killa" },
    { label: "kyncham", value: "kyncham" },
  ];
}

function generateFloorOptions() {
  const specialFloors = [
    "Lower Basement",
    "Basement",
    "Lower Ground",
    "Ground",
  ];
  const numberedFloors = Array.from({ length: 50 }, (_, i) =>
    (i + 1).toString()
  );
  return [...specialFloors, ...numberedFloors];
}
