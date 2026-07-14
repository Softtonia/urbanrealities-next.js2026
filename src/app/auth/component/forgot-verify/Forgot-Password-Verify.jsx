'use client';
import React, { useState } from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthInput from "../AuthInput/AuthInput";
import { verifyEmailOtp } from "@/services/auth.service";
import { toast } from "react-toastify";

const ForgotPasswordVerify = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    
    try {
      setLoading(true);
      const res = await verifyEmailOtp(email, otp);
      
      if (res.success === false) {
        toast.error(res.data?.message || res.message || res.data?.error?.message);
      } else if (res.status === true || res.success === true || res.message) {
        toast.success(res.message || "OTP verified successfully!");
        router.push(`/auth/forgot-password/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Invalid OTP or an error occurred.");

    } finally {
      setLoading(false);
    }
  };
  const data = {
    heading: "Verification",
    subText: "We have sent you an OTP to verify your account",
    otpLabel: "OTP verification",
    otpPlaceholder: "Enter OTP",
    nextButton: "Verify",
      knowText: "Know More",
    guideText: "Verify Account?",
  };

  return (
        <div>
      <h2 className={`formHeading  ${styles.formHeading}`}>{data.heading}</h2>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <AuthInput
          label={data.otpLabel}
          type="text"
          id="otp"
          placeholder={data.otpPlaceholder}
          value={otp}
          maxLength={4}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,4}$/.test(val)) {
              setOtp(val);
            }
          }}
        />
      </div>

     
    <button onClick={handleNext} disabled={loading} className={`body-text-14 formGroupBtn ${styles.nextBtn}`} style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? "Verifying..." : data.nextButton}
      </button>

       <div className={styles.formLinks}>
       <p className={`formLinkText ${styles.KnowLinkText}`}>
          {data.guideText}{" "}
          <Link href="#" className={`formLink ${styles.KnowLink}`}>
            {data.knowText}
          </Link>
        </p>
        </div>
   </div>
  );
};

export default ForgotPasswordVerify;
