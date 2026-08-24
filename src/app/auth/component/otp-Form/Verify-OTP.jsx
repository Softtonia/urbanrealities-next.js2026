'use client';
import React, { useEffect, useState } from "react";
import styles from "../loginform/Login.module.css";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import AuthInput from "../AuthInput/AuthInput";
import { resendOtp, verifyOtp } from "@/services/auth.service";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const router = useRouter();
  const { token } = useSiteSettings();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);

  const finalToken = token || (typeof window !== "undefined" ? localStorage.getItem("tempAuthToken") : null);
  console.log('finalToken is:', finalToken)

  const data = {
    heading: "Verification",
    subText: "We have sent you an OTP to verify your account",
    otpLabel: "OTP verification",
    otpPlaceholder: "Enter OTP",
    nextButton: "Verify",
  };

  // ------------------ TIMER LOGIC ------------------
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    try {
      setIsResendVisible(false);
      setTimer(60);
      // 🔁 Call your Laravel resend API here
      await resendOtp(finalToken);
    } catch (err) {
      console.error("Failed to resend OTP", err);
      setError("Unable to resend OTP. Try again later.");
    }
  };

  // ------------------ VERIFY OTP ------------------
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.trim() === "") {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await verifyOtp(otp, finalToken);

      if (result && result.success !== false && result.status !== false) {
        toast.success(result.message || "Registration successful");
        localStorage.removeItem("tempAuthToken");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      } else {
        const errorMsg = result?.data?.message || result?.message || "Invalid OTP or session expired.";
        setError(errorMsg);
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
  }, [router]);

  // ------------------ UI ------------------
  return (
    <div>
      <h2 className={`formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <form onSubmit={handleVerify}>
        <div className={styles.formGroup}>
          <AuthInput
            label={data.otpLabel}
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder={data.otpPlaceholder}
            error={error}
          />

          {/* TIMER / RESEND TEXT */}
          {/* {isResendVisible ? (
            <span
              onClick={handleResendOtp}
              style={{
                color: 'var(--primary-color)',
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              Resend OTP
            </span>
          ) : (
            <span style={{ color: "#777", fontSize: "14px" }}>
              Resend OTP in {timer}s
            </span>
          )} */}
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
