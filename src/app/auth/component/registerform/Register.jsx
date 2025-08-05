'use client';
import React from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";

const Register = ({ selected, onChange }) => {
  const data = {
    heading: "Sign Up",
    subText: "Start your journey with UrbanRealities",
    nameLabel: "Name",
    namePlaceholder: "Enter Name",
    emailLabel: "Email",
    emailPlaceholder: "Enter email",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter Phone Number",
    userTypeLabel: "I am",
    userTypes: ['Owner', 'Buyer', 'Agent', 'Developer'],
    nextButton: "Next",
    loginText: "Already have an account?",
    loginLinkText: "Login",
    loginLink: "/auth/login",
      knowText: "Know More",
    guideText: "Sign Up Guide?",
  };

  return (
    <div>
      <h2 className={` formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={` formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="Name" className={` formLabel ${styles.formLabel}`}>
          {data.nameLabel}
        </label>
        <input
          type="text"
          id="Name"
          className={` formInput ${styles.formInput}`}
          placeholder={data.namePlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={` formLabel ${styles.formLabel}`}>
          {data.emailLabel}
        </label>
        <input
          type="email"
          id="email"
          className={` formInput ${styles.formInput}`}
          placeholder={data.emailPlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="Phone" className={` formLabel ${styles.formLabel}`}>
          {data.phoneLabel}
        </label>
        <input
          type="tel"
          id="Phone"
          className={` formInput ${styles.formInput}`}
          placeholder={data.phonePlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="radio" className={` formLabel ${styles.formLabel}`}>
          {data.userTypeLabel}
        </label>
        <div className={styles.radioGroup}>
          {data.userTypes.map((option) => (
            <label key={option} className={styles.radioOption}>
              <input
                type="radio"
                name="userType"
                value={option}
                checked={selected === option}
                onChange={() => onChange(option)}
              />
              <span className={`body-text-14 ${styles.spanOption}`}>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <Link href="/auth/login/setpassword" className={`body-text-14 formGroupBtn ${styles.nextBtn}`}>
        {data.nextButton}
      </Link>

      <div className={styles.formLinks}>
        <p className={` formLinkText ${styles.formLinkText}`}>
          {data.loginText}{" "}
          <Link href={data.loginLink} className={` formLink ${styles.formLink}`}>
            {data.loginLinkText}
          </Link>
        </p>
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

export default Register;
