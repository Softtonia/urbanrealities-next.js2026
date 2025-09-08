'use client';
import React, { useState } from "react";
import styles from "../loginform/Login.module.css";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const VerifyOTP = () => {
  const router = useRouter();
  const { token } = useSiteSettings();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("tokens", sessionStorage.getItem('token'))

  const data = {
    heading: "Verification",
    subText: "We have sent you an OTP to verify your account",
    otpLabel: "OTP verification",
    otpPlaceholder: "Enter OTP",
    nextButton: "Verify",
  };

  const handleVerify = async (e) => {
    e.preventDefault();
  
    // ✅ check if OTP is missing
    if (!otp || otp.trim() === "") {
      setError("Please enter the OTP");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_otp: otp, token }),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        // OTP is correct
        router.push("/");
      } else {
        setError(result.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const step = sessionStorage.getItem("registration_step");
    if (step !== "2") {
      router.replace("/auth/login/register");
    }
  }, []);
  

  return (
    <div>
      <h2 className={`formHeading  ${styles.formHeading}`}>{data.heading}</h2>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <form onSubmit={handleVerify}>
        <div className={styles.formGroup}>
          <label htmlFor="otp" className={`formLabel ${styles.formLabel}`}>
            {data.otpLabel}
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`formInput ${styles.formInput}`}
            placeholder={data.otpPlaceholder}
          />{error && <p className="formLabel" style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        </div>



        <button
          type="submit"
          disabled={loading}
          className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
        >
          {loading ? "Verifying..." : data.nextButton}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
