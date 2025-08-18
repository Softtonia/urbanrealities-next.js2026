"use client"

import React, { useState } from 'react';
import styles from './AgentProfile.module.css'
import { FaPhoneAlt } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
const data = {
  heading: "Login your account",
  subText: "Continue your journey with UrbanRealities",
  emailLabel: "Email/Phone Number",
  emailPlaceholder: "Enter email id",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter password",
  loginButton: "Login",
  googleButton: "Sign in with Google",
  noAccountText: "Don't have an account?",
  signUpText: "Sign Up",
  troubleshootText: "Troubleshoot?",
  forgotPasswordText: "Forgot Password",
  knowText: "Know More",
  guideText: "Login Guide?",
};
const AboutForm = () => {
  const { token } = useSiteSettings();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values

    const form = e.target;
    const name = form.name?.value || "";
    const phone = form.phone?.value || "";
    const email = form.email?.value || "";
    const message = form.message?.value || "";

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone Number is required";
    if (!email) newErrors.email = "Email is required";

    setErrors(newErrors);
    // Stop if there are validation errors
    if (Object.keys(newErrors).length > 0) return;




    // Check if token exists
    if (token) {
      // Proceed with submission (send data to backend)
      console.log("Form submitted directly:", { name, phone, email, message });
      // TODO: API call here
    } else {
      // Open OTP modal
      setShow(true);
    }
  };

  return (
    <div>
      <div className={styles.right}>
        {/* <button className={styles.reportBtn}>
          <FaFlag className={styles.icon} /> Report
        </button> */}
        <div className={styles.quickEnquiry}>
          <h4 className={styles.icon}> Quick Enquiry</h4>
          <form>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="Name" required />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>
            <div className={styles.inputContainer}>
              <input type="tel" placeholder="Phone Number" required />
              {errors.phone && <div className={styles.error}>{errors.phone}</div>}
            </div>
            <div className={styles.inputContainer}>
              <input type="email" placeholder="Email" required />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            <div className={styles.inputContainer}>
              <textarea placeholder="Message" rows={3}></textarea>
            </div>
            <button type="submit" onClick={handleSubmit} className={styles.callBackBtn}>
              <FaPhoneAlt className={styles.icon} /> Request Call-back
            </button>
          </form>
          {/* <div className={styles.formGroup}>
        <label htmlFor="email" className={`formLabel ${styles.formLabel}`}>
          {data.emailLabel}
        </label>
        <input
          type="text"
          id="email"
          className={`formInput ${styles.formInput}`}
          placeholder={data.emailPlaceholder}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup} style={{ position: "relative" }}>
      <label htmlFor="password" className={styles.formLabel}>
        {data.passwordLabel}
      </label>

      <input
        type= "password"
        id="password"
        className={`formInput ${styles.formInput}`}
        placeholder={data.passwordPlaceholder}
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        required
      />
</div> */}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control type="tel" placeholder="Enter OTP" />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>

          <button className={`${styles.vygh} btn-AddTicket `}>
            Contact Agent
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AboutForm;
