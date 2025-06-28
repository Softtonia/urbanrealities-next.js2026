'use client';
import React from "react";
import styles from "../loginpage/Login.module.css";
import Link from "next/link";

const ResetPassword = () => {
  const data = {
    heading: "Set your password",
    subText: "Continue your journey with UrbanRealities",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter password",
    nextButton: "Confirm",
      knowText: "Know More",
    guideText: "Set Password?",
  };

  return (
        <div>
      <h2 className={` formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={` formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="Password" className={`formLabel ${styles.formLabel}`}>
          {data.passwordLabel}
        </label>
        <input
          type="new-password"
          id="Password"
          className={` formInput ${styles.formInput}`}
          placeholder={data.passwordPlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={`formLabel  ${styles.formLabel}`}>
          {data.confirmPasswordLabel}
        </label>
        <input
          type="new-password"
          id="confirmPassword"
          className={`${styles.formInput} formInput`}
          placeholder={data.confirmPasswordPlaceholder}
        />
      </div>
   <Link href="/auth/login" className={`body-text-14 formGroupBtn ${styles.nextBtn}`}>
        {data.nextButton}
      </Link>
            <div className={styles.formLinks}>
 <p className={`formLinkText ${styles.KnowLinkText}`}>
          {data.guideText}{" "}
          <Link href="#" className={`formLink ${styles.KnowLink}`}>
            {data.knowText}
          </Link>
        </p>
              </div>

   </div>
  );
};

export default ResetPassword;

