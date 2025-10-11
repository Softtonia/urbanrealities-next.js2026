"use client";

import React, { useEffect, useState } from "react";
import "./PropertyEnquiryFrom.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useParams } from "next/navigation";

const PropertyEnquiryFrom = ({ property, leadTypes }) => {
  const { token } = useSiteSettings();
  const params = useParams();
  const id = params?.id;

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});
  const [resendTimer, setResendTimer] = useState(60);


  // countdown for resend OTP
  useEffect(() => {
    let timer;
    if (showOTP && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showOTP, resendTimer]);

  // handle submit
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

    const payload = {
      name,
      phone,
      email,
      message,
      property_id: id,
      user_ids: [property.created_by.id],
      lead_type_id: '1', // add lead type id here
    };
    setFormValues(payload);

    try {
      setLoading(true);

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

        window.location.reload();
        return;
      }

      // if not logged in -> send OTP
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

  // otp submit
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
      window.location.reload();
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/agent/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formValues.phone,
          email: formValues.email,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to resend OTP");
      setResendTimer(60);
      alert("OTP resent successfully!");
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-form-container">
      <div className="enquiry-box m-0 p-0">
        <h3 className="enquiry-title body-text-20">Fill the enquiry form</h3>
      </div>

      <form className="enquiry-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" className="enquiry-form__input" />
        {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}

        <input type="email" name="email" placeholder="Email Address" className="enquiry-form__input" />
        {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>}

        <input type="text" name="phone" placeholder="Contact number" className="enquiry-form__input" />
        {errors.phone && <p style={{ color: "red", fontSize: "12px" }}>{errors.phone}</p>}

        {/* Dropdown for lead type */}
        
        <textarea name="message" placeholder="Message" rows="4" className="enquiry-form__textarea"></textarea>

        <div className=" d-flex justify-content-center">
          <button type="submit" className="enquiry-form__button" disabled={loading}>
            {loading ? "Submitting..." : "Send Enquiry"}
          </button>
        </div>
      </form>

      {/* OTP Modal */}
      <Modal show={showOTP} onHide={() => setShowOTP(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {resendTimer > 0 ? (
              <div style={{ marginTop: "28px", fontWeight: "bold" }}>{resendTimer}s</div>
            ) : (
              <button
                onClick={handleResendOTP}
                className="btn-AddTicket"
                style={{ marginTop: "29px" }}
              >
                Resend OTP
              </button>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleOtpSubmit} className="btn-AddTicket">
            Submit OTP
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyEnquiryFrom;
