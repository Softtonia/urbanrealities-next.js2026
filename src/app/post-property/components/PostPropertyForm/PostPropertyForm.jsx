'use client';
import React from "react";
import styles from "./PostPropertyForm.module.css";
import Link from "next/link";

export default function PostPropertyForm() {
  const postdata = {
    dummyUserTypes: ["Owner", "Buyer", "Agent", "Developer"],
    dummyListingPurposes: ["Rent", "Buy", "Sell"],
    postPropertyAdd: [
      "Get Access to 4 Lakh+ Buyers",
      "Sell Faster with Premium Service",
      "Get Expert Advice on Market Trends and Insights",
    ],
  };

  return (
    <div className={styles.postFormCard}>
      <img
        src="/Blob-Shape.png"
        alt="Decoration"
        className={styles.blobShape}
      />
      <h4 className={` formHeading ${styles.postformHeading}`}>
        Posting your property
      </h4>
      <p className={` formSubHeading ${styles.postFormSubtitle}`}>
        Fill the required details
      </p>
      <div className={styles.formGroup}>
        <label htmlFor="radio" className={` formLabel ${styles.formLabel}`}>
          you're
        </label>
        <div className={styles.postFormRadioGroup}>
          {postdata.dummyUserTypes.map((type) => (
            <label key={type} className={styles.radioOption}>
              <input type="radio" name="user" value={type} />
              <span className={`body-text-14 ${styles.spanOption}`}>
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="radio" className={` formLabel ${styles.formLabel}`}>
          Looking For
        </label>
        <div className={styles.postFormRadioGroup}>
          {postdata.dummyListingPurposes.map((purpose) => (
            <label key={purpose} className={styles.radioOption}>
              <input type="radio" name="looking" value={purpose} />
              <span className={`body-text-14 ${styles.spanOption}`}>
                {purpose}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="Phone" className={` formLabel ${styles.postformLabel}`}>
          Your contact details for the buyer to reach you
        </label>
        <input
          type="tel"
          placeholder="+91"
          className={` formInput ${styles.postFormInput}`}
        />
      </div>

      <Link
        href="/auth/post-property/basic-details"
        className={`  formGroupBtn ${styles.postFormButton} `}
      >
        Login
      </Link>

      <div className={styles.formLinks}>
        <p className={` formLinkText ${styles.postFormSignup}`}>
          Don’t have an account?
          <Link href="/auth/login" className={` formLink ${styles.formLink}`}>
            Sign Up{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
