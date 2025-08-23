"use client";
import React, { useState } from "react";
import styles from "./ContactFormWithInfo.module.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const data = {
  heading: "Quick Enquiry",
  firstnamePlaceholder: "First Name",
  lastnamePlaceholder: "Last Name",
  emailPlaceholder: "Enter Email",
  phonePlaceholder: "Enter Phone Number",
  nextButton: "Send Message",
};

export default function ContactFormWithInfo() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        country_code: "+91",
        phone_number: formData.phone,
        message: formData.message,
      };

const res = await fetch(`/api/contact-us-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("✅ Your message has been sent successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setStatus("Error sending message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>{data.heading}</h2>
        <p>Your email address will not be published. Required fields are marked *</p>

        {status && <p className={styles.status}>{status}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.firstnamePlaceholder}
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.lastnamePlaceholder}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.phonePlaceholder}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`enquiryInput ${styles.formInput}`}
              placeholder={data.emailPlaceholder}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`enquiryInput ${styles.formInput}`}
              placeholder="Message"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className={`body-text-14 continueBtn ${styles.nextBtn}`}
            disabled={loading}
          >
            {loading ? "Sending..." : data.nextButton}
          </button>
        </form>
      </div>

      <div className={styles.infoWrapper}>
        <h2 className={styles.title}>Get in Touch</h2>
        <div className={styles.infoItem}>
          <FaPhoneAlt className={styles.icon} />
          <p>Phone number <span>123-456-7890</span></p>
        </div>
        <div className={styles.infoItem}>
          <FaEnvelope className={styles.icon} />
          <p>Email <span>info@yoursite.com</span></p>
        </div>
        <div className={styles.infoItem}>
          <FaMapMarkerAlt className={styles.icon} />
          <p>Location <span>123 Homes Street Chicago, IL 60606</span></p>
        </div>
      </div>
    </section>
  );
}
