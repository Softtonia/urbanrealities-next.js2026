'use client';
import React from "react";
import styles from "../loginpage/Login.module.css";

const SetPassword = ({ selected, onChange }) => {
  const data = {
    heading: "Set your password",
    subText: "Continue your journey with UrbanRealities",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter password",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter Phone Number",
    userTypeLabel: "I am",
    userTypes: ['Owner', 'Buyer', 'Agent', 'Developer'],
    nextButton: "Next",
    loginText: "Already have an account?",
    loginLinkText: "Login",
    // loginLink: "/auth/login"
  };

  return (
    <div>
      <h2 className={styles.rightHeading}>{data.heading}</h2>
      <p className={styles.rightSubText}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="Name" className={styles.label}>
          {data.nameLabel}
        </label>
        <input
          type="text"
          id="Name"
          className={styles.input}
          placeholder={data.namePlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          {data.emailLabel}
        </label>
        <input
          type="email"
          id="email"
          className={styles.input}
          placeholder={data.emailPlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="Phone" className={styles.label}>
          {data.phoneLabel}
        </label>
        <input
          type="tel"
          id="Phone"
          className={styles.input}
          placeholder={data.phonePlaceholder}
        />
      </div>

    

      <button className={`body-text-14 loginBtn ${styles.nextBtn}`}>
        {data.nextButton}
      </button>

   
    </div>
  );
};

export default SetPassword;
