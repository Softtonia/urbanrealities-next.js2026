"use client";
import React from "react";
import styles from "./ContactUs.module.css";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className={styles.contactUsContainer}>
      <section className={`${styles.contactSection} container`}>
        {/* Left Image */}
        <div className={styles.imageWrapper}>
          <img
            src="/contact-img.png" // Replace with your image path
            alt="Contact Us"
          />
        </div>

        {/* Right Form */}
        <div className={styles.formCard}>
          <h2 className={styles.heading}>
            <span className={styles.line}></span>
            Contact Us
            <span className={styles.line}></span>
          </h2>
          <p className={styles.subText}>
            Have any queries? We’d love to hear from you.
          </p>

          <div className={styles.contactOptions}>
            <div>
              <FaPhoneAlt /> Call us
            </div>
            <div>
              <FaEnvelope /> Mail us
            </div>
          </div>

          <div className={styles.divider}>
            <span>Or</span>
          </div>
          <label htmlFor="mobile-number" className={styles.label}>
            Request a Call Back{" "}
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Mobile Number"
              className={styles.inputField}
            />
            <button className={styles.otpBtn}>Send OTP</button>
          </div>

          <p className={styles.errorText}>Please enter mobile number</p>

          <p className={styles.terms}>
            I agree to Home Loan T&C, Magicbricks T&C, Privacy
            <p className={`${styles.terms} m-0`}>Policy & Cookie Policy</p>
          </p>

          <button className={styles.submitBtn}>Send OTP</button>
        </div>
      </section>
    </div>
  );
}
