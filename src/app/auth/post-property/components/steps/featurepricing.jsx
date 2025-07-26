"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./featurepricing.module.css";
import { ToWords } from 'to-words';



const PricingAndOthers = () => {
  const router = useRouter();
  const [expectedRent, setExpectedRent] = useState("");
  const [pricePerSqFt, setPricePerSqFt] = useState("");
  const [rentInWords, setRentInWords] = useState(""); // This would ideally be generated
  const [basedOn, setBasedOn] = useState("Carpet Area");
  const [electricityWaterExcluded, setElectricityWaterExcluded] = useState(false);
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [showMaintenanceBooking, setShowMaintenanceBooking] = useState(false);
  const [maintenanceCharges, setMaintenanceCharges] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");
  const [securityDepositType, setSecurityDepositType] = useState("Fixed"); // Fixed, Multiple of Rent, None
  const [securityDepositValue, setSecurityDepositValue] = useState("");
  const [lockInPeriod, setLockInPeriod] = useState("");
  const [yearlyRentIncrease, setYearlyRentIncrease] = useState("");
  const [propertyUniqueDescription, setPropertyUniqueDescription] = useState("");


  const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: true,
    ignoreZeroCurrency: false,
  },
});
  // Placeholder for converting number to words (would need a more robust library in a real app)
 const convertNumberToWords = (num) => {
  if (!num || isNaN(num)) return '';
  return toWords.convert(num); // This will return like: "Rupees Two Thousand Six Hundred Only"
};


  React.useEffect(() => {
    setRentInWords(convertNumberToWords(parseInt(expectedRent)));
  }, [expectedRent]);

  const handleContinue = () => {
    console.log("Pricing and Others Details:", {
      expectedRent,
      pricePerSqFt,
      electricityWaterExcluded,
      priceNegotiable,
      maintenanceCharges,
      bookingAmount,
      securityDepositType,
      securityDepositValue,
      lockInPeriod,
      yearlyRentIncrease,
      propertyUniqueDescription,
    });
    router.push("/auth/post-property/summary"); // Next step
  };

  const handleBack = () => {
    router.push("/auth/post-property/photo-details"); // Previous step
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>Add pricing and details...</h2>

      {/* Warning Box (from Screenshot 1) */}
      <div className={styles.warningBox}>
        You might get <strong className={styles.warningHighlight}>Low responses</strong>, as your listing has no photos. Rank up your listing by adding pictures{" "}
        <span className={styles.uploadNowLink}>Upload Now</span>
        <button className={styles.closeWarningButton}>&times;</button>
      </div>

      <p className={styles.formQuestion}>What price you are expecting for this property?</p>
      <div className={styles.priceInputsGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="expectedRent" className={styles.formLabel}>₹ Expected Rent</label>
          <input
            type="number"
            id="expectedRent"
            className={styles.formInput}
            value={expectedRent}
            onChange={(e) => setExpectedRent(e.target.value)}
            placeholder="₹ Expected Rent"
          />
          <p className={styles.amountInWords}>₹ {rentInWords}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pricePerSqFt" className={styles.formLabel}>₹ Price per sq.ft.</label>
          <input
            type="number"
            id="pricePerSqFt"
            className={styles.formInput}
            value={pricePerSqFt}
            onChange={(e) => setPricePerSqFt(e.target.value)}
            placeholder="pricePerSqFt"
          />
          <div className={styles.basedOnDropdown}>
            Based on <span className={styles.dropdownValue}>{basedOn}</span>{" "}
            <select
              className={styles.hiddenSelect}
              value={basedOn}
              onChange={(e) => setBasedOn(e.target.value)}
            >
              <option value="Carpet Area">Carpet Area</option>
              <option value="Built-up Area">Built-up Area</option>
              <option value="Super Built-up Area">Super Built-up Area</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.formCheckbox}
            checked={electricityWaterExcluded}
            onChange={(e) => setElectricityWaterExcluded(e.target.checked)}
          />
          Electricity & Water charges excluded
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.formCheckbox}
            checked={priceNegotiable}
            onChange={(e) => setPriceNegotiable(e.target.checked)}
          />
          Price Negotiable
        </label>
      </div>

      <div className={styles.addMaintenanceLink} onClick={() => setShowMaintenanceBooking(!showMaintenanceBooking)}>
        + Add Maintenance and Booking Amount
      </div>

      {showMaintenanceBooking && (
        <div className={styles.maintenanceBookingSection}>
          <div className={styles.formGroup}>
            <label htmlFor="maintenanceCharges" className={styles.formLabel}>Maintenance Charges (Monthly)</label>
            <input
              type="number"
              id="maintenanceCharges"
              className={styles.formInput}
              value={maintenanceCharges}
              onChange={(e) => setMaintenanceCharges(e.target.value)}
              placeholder="Enter monthly maintenance"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bookingAmount" className={styles.formLabel}>Booking Amount</label>
            <input
              type="number"
              id="bookingAmount"
              className={styles.formInput}
              value={bookingAmount}
              onChange={(e) => setBookingAmount(e.target.value)}
              placeholder="Enter booking amount"
            />
          </div>
        </div>
      )}

      <p className={styles.securityDepositTitle}>Security deposit <span className={styles.optionalText}>(Optional)</span></p>
      <div className={styles.securityDepositOptions}>
        <button
          className={`${styles.depositButton} ${securityDepositType === "Fixed" ? styles.selectedDeposit : ""}`}
          onClick={() => setSecurityDepositType("Fixed")}
        >
          Fixed
        </button>
        <button
          className={`${styles.depositButton} ${securityDepositType === "Multiple of Rent" ? styles.selectedDeposit : ""}`}
          onClick={() => setSecurityDepositType("Multiple of Rent")}
        >
          Multiple of Rent
        </button>
        <button
          className={`${styles.depositButton} ${securityDepositType === "None" ? styles.selectedDeposit : ""}`}
          onClick={() => setSecurityDepositType("None")}
        >
          None
        </button>
      </div>

      {securityDepositType === "Multiple of Rent" && (
        <div className={styles.formGroup}>
          <input
            type="number"
            className={styles.formInput}
            value={securityDepositValue}
            onChange={(e) => setSecurityDepositValue(e.target.value)}
            placeholder="No. of months (Max 30)"
          />
        </div>
      )}

      <p className={styles.formQuestion}>Lock - in Period <span className={styles.optionalText}>(Optional)</span></p>
      <div className={styles.formGroup}>
        <input
          type="number"
          className={styles.formInput}
          value={lockInPeriod}
          onChange={(e) => setLockInPeriod(e.target.value)}
          placeholder="Enter Number of Months"
        />
      </div>

      <p className={styles.formQuestion}>Yearly rent is expected to increase by <span className={styles.optionalText}>(Optional)</span></p>
      <div className={styles.formGroup}>
        <input
          type="number"
          className={styles.formInput}
          value={yearlyRentIncrease}
          onChange={(e) => setYearlyRentIncrease(e.target.value)}
          placeholder="Percentage (%) of increase in rent"
        />
      </div>

      <p className={styles.formQuestion}>What makes your property unique <span className={styles.optionalText}></span></p>
      <p className={styles.descriptionHint}>Adding description will increase your listing visibility</p>
      <div className={styles.formGroup}>
        <textarea
          className={styles.formTextarea}
          value={propertyUniqueDescription}
          onChange={(e) => setPropertyUniqueDescription(e.target.value)}
          placeholder="Share some details about your property like spacious area, nearby markets, metro connectivity and more"
          // rows="5"
        ></textarea>
        <p className={styles.charCount}>Minimum 30 characters required {propertyUniqueDescription.length}/5000</p>
      </div>


        <button
          className={` continueBtn ${styles.continueBtn}`}
          onClick={handleContinue}
        >
          Continue
        </button>
    </div>
  );
};

export default PricingAndOthers;
