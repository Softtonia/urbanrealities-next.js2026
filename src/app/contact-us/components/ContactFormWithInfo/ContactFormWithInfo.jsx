"use client";
import React from "react";
import styles from "./ContactFormWithInfo.module.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const data = {
  heading: " Quick Enquiry",
  usernamePlaceholder: "Enter Username",
  emailPlaceholder: "Enter email",
  phonePlaceholder: "Enter Phone Number",
  nextButton: "send message",
};
export default function ContactFormWithInfo() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Send a Message</h2>
        <p>
          Your email address will not be published. Required fields are marked *
        </p>
        <form>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.usernamePlaceholder}
            />
            {/* </div>

            <div className={styles.formGroup}> */}
            <input
              type="email"
              name="email"
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.emailPlaceholder}
            />
          </div>

          {/* <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                className={`enquiryInput ${styles.formInput}`}
                placeholder={data.phonePlaceholder}
              />
            </div> */}

          <div className={styles.formGroup}>
            <textarea
              name="message"
              className={`enquiryInput ${styles.formInput}`}
              placeholder="Message"
              rows={5}
            />
          </div>

          <button
            type="submit"
            className={`body-text-14 continueBtn ${styles.nextBtn}`}
          >
            {data.nextButton}
          </button>
        </form>
      </div>

      <div className={`{styles.infoWrapper} col-4 `}>
        <h2 className={styles.title}>Get in Touch</h2>
        <div className={styles.infoItem}>
          <FaPhoneAlt className={styles.icon} />
          <p>
            Phone number
             <span> 123-456-7890</span>
          </p>
        </div>
        <div className={styles.infoItem}>
          <FaEnvelope className={styles.icon}  />
          <p>
            Email
            <span>info@yoursite.com</span>
          </p>
        </div>
        <div className={styles.infoItem}>
          <FaMapMarkerAlt className={styles.icon} />
          <p>
            Location
            <span>123 Homes Street Chicago, IL 60606</span>
          </p>
        </div>
      </div>
    </section>
  );
}
