'use client';
import React, { useState } from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const ForgotPasswordVerify = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleNext = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    router.push(`/auth/forgot-password/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
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
        <label htmlFor="otp" className={ `formLabel ${styles.formLabel}`}>
          {data.otpLabel}
        </label>
        <input
          type="text"
          id="otp"
          className={`formInput ${styles.formInput}`}
          placeholder={data.otpPlaceholder}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

     
    <button onClick={handleNext} className={`body-text-14 formGroupBtn ${styles.nextBtn}`} style={{ width: '100%', cursor: 'pointer' }}>
        {data.nextButton}
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
