'use client';
import React, { useEffect, useState } from "react";
import styles from "../loginform/Login.module.css";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import AuthInput from "../AuthInput/AuthInput";
const VerifyOTP = () => {
  const router = useRouter();
  const { token } = useSiteSettings();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);

  const finalToken = token || localStorage.getItem("tempAuthToken");
  console.log('finalToken', token)

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
      await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: finalToken }),
      });
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
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${finalToken}`,
        },
        body: JSON.stringify({ email_otp: otp, }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.removeItem("tempAuthToken");

        if (
          ["company", "consultancy", "agent", "developer"].includes(result.role)
        ) {
          window.location.href = `${process.env.NEXT_PUBLIC_BUSINESS_DOMAIN}?authtoken=${result.token}&id=${result.user_id}`;
        } else {
          router.push("/");
        }
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
