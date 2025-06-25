'use client';
import React from "react";
import styles from "../loginpage/Login.module.css";
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
    loginLink: "/auth/login"
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

      <div className={styles.formGroup}>
        <label htmlFor="radio" className={styles.label}>
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

      <Link href="/auth/setpassword" className={`body-text-14 loginBtn ${styles.nextBtn}`}>
        {data.nextButton}
      </Link>

      <div className={styles.links}>
        <p className={styles.linkText}>
          {data.loginText}{" "}
          <Link href={data.loginLink} className={styles.link}>
            {data.loginLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
