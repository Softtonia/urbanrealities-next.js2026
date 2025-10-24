"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./featurepricing.module.css"; // Ensure this path is correct
import { ToWords } from "to-words";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const PricingAndOthers = () => {
  const router = useRouter();
  const { formData, updateFormData, setFormData } = useContext(PostPropertyContext);
  const [errors, setErrors] = useState({})


  const [pricingData, setPricingData] = useState(formData.custom_field || {});

  const selectedPurpose = formData.basicDetails?.purpose || "";
  const selectedCategory = formData.basicDetails?.category || "";

 const priceFields = (Array.isArray(formData.custom_field) ? formData.custom_field : [])
  .filter(field =>
    /price/i.test(field.field_label) ||
    /price/i.test(field.field_name_slug)
  );


console.log("fields", priceFields)
const { token } = useSiteSettings();
const [rentInWords, setRentInWords] = useState("");

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: true,
    ignoreZeroCurrency: false,
  },
});

const convertNumberToWords = (num) => {
  if (!num || isNaN(num)) return '';
  return toWords.convert(num);
};

useEffect(() => {
  setRentInWords(convertNumberToWords(parseInt(pricingData.expectedRent)));
}, [pricingData.expectedRent]);

const prevPricePerSqFtRef = useRef();

useEffect(() => {
  const rent = parseFloat(pricingData.expectedRent);
  const propertyProfile = formData.propertyProfile || {};

  let areaValue = 0;
  let calculatedPrice = "";

  if (pricingData.basedOn === "Carpet Area" && propertyProfile.carpetArea?.value) {
    areaValue = parseFloat(propertyProfile.carpetArea.value);
  } else if (pricingData.basedOn === "Built-up Area" && propertyProfile.builtUpArea?.value) {
    areaValue = parseFloat(propertyProfile.builtUpArea.value);
  } else if (pricingData.basedOn === "Super Built-up Area" && propertyProfile.superBuiltupArea?.value) {
    areaValue = parseFloat(propertyProfile.superBuiltupArea.value);
  } else if (pricingData.basedOn === "Plot Area" && propertyProfile.plotArea?.value) {
    areaValue = parseFloat(propertyProfile.plotArea.value);
  }

  if (!isNaN(rent) && rent > 0 && !isNaN(areaValue) && areaValue > 0) {
    calculatedPrice = (rent / areaValue).toFixed(2);
  }

  if (calculatedPrice !== prevPricePerSqFtRef.current) {
    setPricingData(prev => ({ ...prev, pricePerSqFt: calculatedPrice }));
    updateFormData("pricingDetails", { ...pricingData, pricePerSqFt: calculatedPrice });
    prevPricePerSqFtRef.current = calculatedPrice;
  }

  console.log("PricingAndOthers - Property Profile Areas:", {
    carpetArea: propertyProfile.carpetArea?.value,
    builtUpArea: propertyProfile.builtUpArea?.value,
    superBuiltupArea: propertyProfile.superBuiltupArea?.value,
    plotArea: propertyProfile.plotArea?.value,
    basedOn: pricingData.basedOn,
    areaValueUsed: areaValue,
    calculatedPricePerSqFt: calculatedPrice,
    selectedCategoryForProfile: selectedCategory,
    selectedPurposeForProfile: selectedPurpose
  });

}, [
  pricingData.expectedRent,
  pricingData.basedOn,
  formData.propertyProfile,
  updateFormData,
  selectedCategory,
  selectedPurpose,
]);

useEffect(() => {
  console.log("PricingAndOthers - formData:", formData);
  console.log("PricingAndOthers - selectedPurpose from Context:", selectedPurpose);
  console.log("PricingAndOthers - selectedCategory from Context:", selectedCategory);
}, [formData, selectedPurpose, selectedCategory]);

const handleChange = (fieldName, value, field_id, field_type) => {
  // Update pricing data state
  setPricingData(prev => {
    const updatedFields = {
      ...prev,
      [fieldName]: value,
    };
    updateFormData("pricingDetails", updatedFields);
    return updatedFields;
  });

  // Update repeater_fields inside formData
  setFormData(prevFormData => {
    const repeater = [...(prevFormData.repeater_fields || [])];
    const existingIndex = repeater.findIndex(item => item.custom_field_id === field_id);

    if (existingIndex !== -1) {
      // Update existing entry
      repeater[existingIndex] = {
        ...repeater[existingIndex],
        field_value: value
      };
    } else {
      // Add new entry
      repeater.push({
        custom_field_id: field_id,
        field_type: field_type,
        field_value: value
      });
    }

    return { ...prevFormData, repeater_fields: repeater };
  });
};




const toggleBoolean = (fieldName) => {
  handleChange(fieldName, !pricingData[fieldName]);
};

const dynamicFieldsMap = {
  "Sell": {
    "Flat/Apartment": [
      { name: "totalPrice", label: "₹ Total Price", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "electricityWaterExcluded", type: "checkbox", label: "Electricity & Water charges excluded" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "lockInPeriod", label: "Lock-in Period (Months)", type: "number" },
      { name: "yearlyRentIncrease", label: "Yearly Rent Increase (%)", type: "number" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Independent House / Villa": [
      { name: "totalPrice", label: "₹ Total Price", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Plot / Land": [
      { name: "totalPrice", label: "₹ Total Price", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Office Space": [
      { name: "totalPrice", label: "₹ Total Price", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "lockInPeriod", label: "Lock-in Period (Months)", type: "number" },
      { name: "yearlyRentIncrease", label: "Yearly Rent Increase (%)", type: "number" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Shop": [
      { name: "totalPrice", label: "₹ Total Price", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Warehouse / Godown": [
      { name: "totalPrice", label: "₹ Total Price", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
  },
  "Rent / Lease": {
    "Flat/Apartment": [
      { name: "expectedRent", label: "₹ Expected Rent", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "electricityWaterExcluded", type: "checkbox", label: "Electricity & Water charges excluded" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "lockInPeriod", label: "Lock-in Period (Months)", type: "number" },
      { name: "yearlyRentIncrease", label: "Yearly Rent Increase (%)", type: "number" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Independent House / Villa": [
      { name: "expectedRent", label: "₹ Expected Rent", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Plot / Land": [
      { name: "expectedRent", label: "₹ Expected Rent", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Office Space": [
      { name: "expectedRent", label: "₹ Expected Rent", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "lockInPeriod", label: "Lock-in Period (Months)", type: "number" },
      { name: "yearlyRentIncrease", label: "Yearly Rent Increase (%)", type: "number" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Shop": [
      { name: "expectedRent", label: "₹ Expected Rent", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
    "Warehouse / Godown": [
      { name: "expectedRent", label: "₹ Expected Rent", type: "number" },
      { name: "pricePerSqFt", label: "₹ Price per sq.ft.", type: "readonly-text", basedOn: true },
      { name: "maintenanceCharges", label: "Maintenance Charges (Monthly)", type: "number", showIf: "showMaintenanceBooking" },
      { name: "bookingAmount", label: "Booking Amount", type: "number", showIf: "showMaintenanceBooking" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
  },
  "PG": {
    "1 RK/ Studio Apartment": [
      { name: "expectedRent", label: "₹ Expected Rent (per bed/room)", type: "number" },
      { name: "priceNegotiable", type: "checkbox", label: "Price Negotiable" },
      { name: "securityDepositType", type: "security-deposit" },
      { name: "securityDepositValue", type: "number", placeholder: "No. of months (Max 30)", showIf: "pricingData.securityDepositType === 'Multiple of Rent'" },
      { name: "propertyUniqueDescription", label: "What makes your property unique", type: "textarea" },
    ],
  }
};

const fieldsToRender = (dynamicFieldsMap[selectedPurpose] && dynamicFieldsMap[selectedPurpose][selectedCategory]) || [];

const handleContinue = () => {
  router.push("/auth/post-property/amenities");
};




console.log(errors)

const goBack = () => {
  if (typeof window !== "undefined") {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  }
};

// Extract primary pricing fields for the grid layout
const primaryPricingFields = fieldsToRender.filter(
  (field) => field.name === "expectedRent" || field.name === "totalPrice" || field.name === "pricePerSqFt"
);

return (
  <div className={styles.wrapper}>
    <div className={styles.backWrapper}>
      <IoArrowBackSharp size={20} onClick={goBack} />
      <p className="m-0">Back</p>
    </div>

    <h2 className={styles.sectionTitle}>Add pricing and details...</h2>

    <div className={styles.warningBox}>
      You might get <strong className={styles.warningHighlight}>Low responses</strong>, as your listing has no photos. Rank up your listing by adding pictures{" "}
      <span className={styles.uploadNowLink}>Upload Now</span>
      <button className={styles.closeWarningButton}>&times;</button>
    </div>

    {priceFields.length === 0 && (
      <p className={styles.formQuestion}>
        Please go back to Basic Details and select a Purpose and Property Type/Category to see pricing options.
      </p>
    )}

    {/* Primary Pricing Section: Expected Rent/Total Price and Price per Sq.Ft. */}
    {(primaryPricingFields.length > 0) && (
      <>
        <p className={styles.formQuestion}>
          What price you are expecting for this property?
        </p>
        <div className={styles.formGroup}>
          <div className={styles.priceInputsGrid}>
            {primaryPricingFields.map((field) => {
              if (field.name === "expectedRent" || field.name === "totalPrice") {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name} className={styles.formLabel}>
                      {field.label}
                    </label>
                    <input
                      type="number"
                      id={field.name}
                      className={styles.formInput}
                      value={pricingData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder || field.label}
                    />
                    {field.name === "expectedRent" && (
                      <p className={styles.amountInWords}>₹ {rentInWords}</p>
                    )}
                  </div>
                );
              } else if (field.name === "pricePerSqFt") {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name} className={styles.formLabel}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      id={field.name}
                      className={styles.formInput}
                      value={pricingData[field.name] || ""}
                      readOnly
                      placeholder={field.placeholder || field.label}
                    />
                    {field.basedOn && (
                      <div className={styles.basedOnDropdown}>
                        Based on{" "}
                        <span className={styles.dropdownValue}>
                          {pricingData.basedOn || "Carpet Area"}
                        </span>{" "}
                        <select
                          className={styles.hiddenSelect}
                          value={pricingData.basedOn || "Carpet Area"}
                          onChange={(e) => handleChange("basedOn", e.target.value)}
                        >
                          <option value="Carpet Area">Carpet Area</option>
                          <option value="Built-up Area">Built-up Area</option>
                          <option value="Super Built-up Area">Super Built-up Area</option>
                          <option value="Plot Area">Plot Area</option>
                        </select>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </>
    )}

    {/* Render remaining fields dynamically */}
    {priceFields.filter(f => !primaryPricingFields.includes(f)).map((field) => {
      let shouldShow = true;
      if (field.showIf) {
        try {
          const evaluateCondition = new Function('pricingData', `return ${field.showIf};`);
          shouldShow = evaluateCondition(pricingData);
        } catch (e) {
          console.error(`Error evaluating showIf condition for ${field.name}:`, e);
          shouldShow = false;
        }
      }

      if (!shouldShow) return null;

      if (field.field_type === "checkbox") {
        return (
          <div className={styles.checkboxGroup} key={field.name}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.formCheckbox}
                checked={pricingData[field.name] || false}
                onChange={() => toggleBoolean(field.name)}
              />
              {field.label}
            </label>
          </div>
        );
      } else if (field.field_type === "security-deposit") {
        return (
          <React.Fragment key={field.name}>
            <p className={styles.securityDepositTitle}>
              Security deposit <span className={styles.optionalText}>(Optional)</span>
            </p>
            <div className={styles.securityDepositOptions}>
              {["Fixed", "Multiple of Rent", "None"].map((type) => (
                <button
                  key={type}
                  className={`${styles.depositButton} ${pricingData.securityDepositType === type
                    ? styles.selectedDeposit
                    : ""
                    }`}
                  onClick={() => handleChange("securityDepositType", type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </React.Fragment>
        );
      } else if (field.field_type === "textarea") {
        return (
          <div className={styles.formGroup} key={field.field_name_slug}>
            <p className={styles.formQuestion}>{field.field_label}</p>
            <p className={styles.descriptionHint}>
              Adding description will increase your listing visibility
            </p>
            <textarea
              className={styles.formTextarea}
              value={pricingData[field.field_name_slug] || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field.id, field.field_type)}
              placeholder="Share some details about your property like spacious area, nearby markets, metro connectivity and more"
              rows="5"
            ></textarea>
            <p className={styles.charCount}>
              Minimum 30 characters required{" "}
              {pricingData[field.name]?.length || 0}/5000
            </p>

          </div>
        );
      } else if (field.field_type === "text") {
        return (
          <div className={styles.formGroup} key={field.field_name_slug}>
            <label htmlFor={field.field_name_slug} className={styles.formLabel}>
              {field.field_label}{" "} <span style={{ color: "red" }}>{field.required === "yes" ? "*" : ""}</span>
            </label>
            <input
              type="text"
              id={field.field_name_slug}
              className={styles.formInput}
              value={pricingData[field.field_name_slug] || ""}
              onChange={(e) => handleChange(field.field_name_slug, e.target.value, field.id, field.field_type)}
              placeholder={field.field_placeholder || `Enter ${field.field_label}`}
            />
            {errors[field.field_name_slug] && (
              <p className={styles.error}>{errors[field.field_name_slug]}</p>
            )}
          </div>
        );


      } else if (field.field_type === "number") {
        return (
          <div className={styles.formGroup} key={field.field_name_slug}>
            <label htmlFor={field.field_name_slug} className={styles.formLabel}>
              {field.field_label}{" "} <span style={{ color: "red" }}>{field.required === "yes" ? "*" : ""}</span>
            </label>
            <input
              type="number"
              id={field.field_name_slug}
              min={0}
              onKeyDown={(e) => {
                // prevent typing 'e', '+', '-', or '.'
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className={styles.formInput}
              value={pricingData[field.field_name_slug] || ""}
              onChange={(e) => handleChange(field.field_name_slug, e.target.value, field.id, field.field_type)}
              placeholder={field.field_placeholder || `Enter ${field.field_label}`}
            />
            {errors[field.field_name_slug] && (
              <p className={styles.error}>{errors[field.field_name_slug]}</p>
            )}
          </div>
        );


      } else if (field.field_type === "number" && (field.name !== "expectedRent" && field.name !== "totalPrice" && field.name !== "pricePerSqFt")) {
        // Render other number fields not part of the primary pricing grid
        return (
          <div className={styles.formGroup} key={field.field_name_slug}>
            <label htmlFor={field.field_name_slug} className={styles.formLabel}>
              {field.field_label}
            </label>
            <input
              type="number"
              min={0}
              onKeyDown={(e) => {
                // prevent typing 'e', '+', '-', or '.'
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              id={field.field_name_slug}
              className={styles.formInput}
              value={pricingData[field.field_name_slug] || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field.id, field.field_type)}
              placeholder={field.field_placeholder || `Enter ${field.field_label}`}
            />
          </div>
        );
      }
      return null;
    })}

    {/* Maintenance and Booking Section - conditionally rendered based on showMaintenanceBooking */}
    {pricingData.showMaintenanceBooking && (
      <div className={styles.maintenanceBookingSection}>
        {fieldsToRender.find(f => f.name === "maintenanceCharges") && (
          <div className={styles.formGroup}>
            <label htmlFor="maintenanceCharges" className={styles.formLabel}>
              Maintenance Charges (Monthly)
            </label>
            <input
              type="number"
              id="maintenanceCharges"
              className={styles.formInput}
              value={pricingData.maintenanceCharges || ""}
              onChange={(e) => handleChange("maintenanceCharges", e.target.value)}
              placeholder="Enter monthly maintenance"
            />
          </div>
        )}
        {fieldsToRender.find(f => f.name === "bookingAmount") && (
          <div className={styles.formGroup}>
            <label htmlFor="bookingAmount" className={styles.formLabel}>
              Booking Amount
            </label>
            <input
              type="number"
              id="bookingAmount"
              className={styles.formInput}
              value={pricingData.bookingAmount || ""}
              onChange={(e) => handleChange("bookingAmount", e.target.value)}
              placeholder="Enter booking amount"
            />
          </div>
        )}
      </div>
    )}

    <div className={styles.navigationButtons}>
      <button
        className={`${styles.continueBtn} continueBtn`} // Added direct class "continueBtn"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  </div>
);
};

export default PricingAndOthers;
