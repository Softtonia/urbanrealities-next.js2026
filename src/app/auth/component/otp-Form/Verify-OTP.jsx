'use client';
import React from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";

const VerifyOTP = () => {
  const data = {
    heading: "Verification",
    subText: "We have sent you an OTP to verify your account",
    otpLabel: "OTP verification",
    otpPlaceholder: "Enter OTP",
    nextButton: "Verify",
  };

  return (
        <div>
      <h2 className={`formHeading  ${styles.formHeading}`}>{data.heading}</h2>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="otp" className={`formLabel ${styles.formLabel}`}>
          {data.otpLabel}
        </label>
        <input
          type="new-password"
          id="otp"
          className={`formInput ${styles.formInput}`}
          placeholder={data.otpPlaceholder}
        />
      </div>


   <Link href="/auth/login" className={`body-text-14 formGroupBtn ${styles.nextBtn}`}>
        {data.nextButton}
      </Link>
   </div>
  );
};

export default VerifyOTP;
