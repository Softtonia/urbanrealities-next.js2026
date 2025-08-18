import React from "react";
import styles from "./AgentProfile.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";

const data = {
  heading: " Quick Enquiry",
  usernameLabel: "Username",
  usernamePlaceholder: "Enter Username",
  emailLabel: "Email",
  emailPlaceholder: "Enter email",
  phoneLabel: "Phone Number",
  phonePlaceholder: "Enter Phone Number",
  nextButton: "Request Call-back",
};
const AboutForm = () => {
  return (
    <div>
      <div className={styles.right}>
        {/* <button className={styles.reportBtn}>
          <FaFlag className={styles.icon} /> Report
        </button> */}
 

        <div className={styles.quickEnquiry}>

          <h2 className={` ${styles.enquiryHeading}`}>
            {data.heading}
          </h2>
          {/* Username */}
          <div className={styles.formGroup}>
            <input
              type="text"
              id="username"
              // value={formData.userName}
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.usernamePlaceholder}
              // onChange={(e) => updateField("userName", e.target.value)}
            />
            {/* {usernameError && (
          <p className="formLabel" style={{ color: "red", fontSize: "12px" }}>{usernameError}</p>
        )} */}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              // value={formData.email}
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.emailPlaceholder}
              // onChange={(e) => updateField("email", e.target.value)}
            />
            {/* {emailError && (
          <p className="formLabel" style={{ color: "red", fontSize: "12px" }}>{emailError}</p>
        )} */}
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <input
              type="tel"
              id="phone"
              // value={formData.phone}
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.phonePlaceholder}
              // onChange={(e) => {
              //   let value = e.target.value.replace(/\D/g, ""); // Remove all non-digits
              //   value = value.replace(/^0+/, ""); // Remove leading zeros
              //   if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
              //   updateField("phone", value);
              // }}
            />
            {/* {phoneError && (
          <p className="formLabel" style={{ color: "red", fontSize: "12px" }}>{phoneError}</p>
        )} */}
          </div>

          <div className={styles.formGroup}>
            <textarea
              type="text"
              id="username"
              className={`enquiryInput ${styles.formInput}`}
              placeholder="Message"
              rows={3}
            />
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className={`body-text-14 continueBtn ${styles.nextBtn}`}
          >
            <FaPhoneAlt className={styles.icon} /> {data.nextButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutForm;
