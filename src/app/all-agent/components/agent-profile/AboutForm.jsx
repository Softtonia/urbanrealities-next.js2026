"use client";

import React, { useEffect, useState } from "react";
import styles from "./AgentProfile.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { Modal, Form } from "react-bootstrap";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useParams, useRouter } from "next/navigation";



const AboutForm = ({data}) => {
  const { token } = useSiteSettings();
  const router = useRouter();
  const params = useParams(); // get id from URL
  const id = params?.id;

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});
  const [resendTimer, setResendTimer] = useState(60);

  // Countdown for resend OTP
  useEffect(() => {
    let timer;
    if (showOTP && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showOTP, resendTimer]);

  // Handle initial form submission and send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name?.value.trim() || "";
    const phone = form.phone?.value.trim() || "";
    const email = form.email?.value.trim() || "";
    const message = form.message?.value.trim() || "";

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone Number is required";
    if (!email) newErrors.email = "Email is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = { name, phone, email, message, user_ids: [id] };
    setFormValues(payload);

    try {
      setLoading(true);

      // If user is logged in, send data directly with token
      if (token) {
        const res = await fetch(`/api/agent/create-lead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Submission failed");

        window.location.reload()

        return;
      }

      // If user is not logged in, send OTP
      const res = await fetch(`/api/agent/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to send OTP");
      setShowOTP(true);
      setResendTimer(60);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification and lead creation
  const handleOtpSubmit = async () => {
    if (!otp) return alert("Please enter OTP");

    try {
      setLoading(true);
      const res = await fetch(`/api/agent/create-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, otp }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Submission failed");
      setShowOTP(false);
      window.location.reload()
    } catch (err) {
      console.error(err.message);

    } finally {
      setLoading(false);
    }
  };

  // resend otp
  const handleResendOTP = async () => {
    if (resendTimer > 0) return; // Prevent resend until timer reaches 0
    try {
      setLoading(true);
      const res = await fetch(`/api/agent/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formValues.phone, email: formValues.email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to resend OTP");
      setResendTimer(60); // restart timer
      alert("OTP resent successfully!");
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.right}>
        <div className={styles.quickEnquiry}>
          <h2 className={`${styles.enquiryHeading}`}>{data.heading}</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                className={`enquiryInput ${styles.formInput}`}
                placeholder={data.usernamePlaceholder}
              />
              {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                className={`enquiryInput ${styles.formInput}`}
                placeholder={data.emailPlaceholder}
              />
              {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>}
            </div>

            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                className={`enquiryInput ${styles.formInput}`}
                placeholder={data.phonePlaceholder}
              />
              {errors.phone && <p style={{ color: "red", fontSize: "12px" }}>{errors.phone}</p>}
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                className={`enquiryInput ${styles.formInput}`}
                placeholder="Message"
                rows={3}
              />
            </div>

            <button type="submit" className={`body-text-14 continueBtn ${styles.nextBtn}`}>
              <FaPhoneAlt className={styles.icon} /> {data.nextButton}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      <Modal show={showOTP} onHide={() => setShowOTP(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>


            {resendTimer > 0 ? (
              <div style={{ marginTop: '28px', fontWeight: 'bold' }}>
                {resendTimer}s
              </div>
            ) : (
              <button
                onClick={handleResendOTP}
                className={`${styles.vygh} btn-AddTicket`}
                style={{ marginTop: '29px' }}
              >
                Resend OTP
              </button>
            )}
          </Form.Group>
        </Modal.Body>


        <Modal.Footer>
          <button onClick={handleOtpSubmit} className={`${styles.vygh} btn-AddTicket`}>
            Submit OTP
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AboutForm;
