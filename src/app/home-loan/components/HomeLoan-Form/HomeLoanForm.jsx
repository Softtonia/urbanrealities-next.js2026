"use client";
import React, { useState } from "react";
import styles from "./HomeLoanForm.module.css"; // CSS Module import
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function HomeLoan() {
  const [formData, setFormData] = useState({
    loanAmount: "",
    mobile: "",
    city: "",
    propertyFinalized: "yes",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // API call yaha karna hai agar backend connect ho
  };

  return (
    <div className={styles.homeLoanContainer}>
      <div className={` ${styles.homeContainer} container`}>
        {/* Left Content */}
        <div className={styles.loanInfo}>
          <h1>
            Apply Home Loan Online at UrbanRealities
          </h1>
          <ul>
            <li><IoIosCheckmarkCircleOutline className={styles.icon} /> Loan Offers from 34+ Banks</li>
            <li><IoIosCheckmarkCircleOutline className={styles.icon}/> Dedicated RM for Property Search</li>
          {/* </ul>
          <ul> */}
            <li><IoIosCheckmarkCircleOutline className={styles.icon}/> Highest Loan Value & Lowest ROI</li>
            <li><IoIosCheckmarkCircleOutline className={styles.icon}/> Fastest Loan Disbursal</li>
            </ul>
          <a href="#">View All Documents →</a>

          <button className={` ${styles.ApplyBtn} `}> Apply Now </button>
        </div>

        {/* Right Side Form */}
        <div className={styles.loanForm}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="loanAmount"
              placeholder="Enter Loan Amount"
              value={formData.loanAmount}
              className={styles["loanForm-input"]}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              className={styles["loanForm-input"]}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Property City"
              value={formData.city}
              className={styles["loanForm-input"]}
              onChange={handleChange}
              required
            />

            <label className={styles.propertyCheck}>
              Is Property Finalized?
            </label>
            <div className={styles.radioOptions}>
              <label>
                <input
                  type="radio"
                  name="propertyFinalized"
                  value="yes"
                  className={styles["radio-input"]}
                  checked={formData.propertyFinalized === "yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="propertyFinalized"
                  value="no"
                  className={styles["radio-input"]}
                  checked={formData.propertyFinalized === "no"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Check Eligibility
            </button>
            <p className={styles.disclaimer}>
              By continuing I agree to <b>Mundeshwari</b>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
