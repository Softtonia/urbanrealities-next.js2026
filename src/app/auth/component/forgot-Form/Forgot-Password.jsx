'use client';

import React, { useState } from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";
import AuthInput from "../AuthInput/AuthInput";
import { generateEmailOtp } from "@/services/auth.service";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email or phone number.");
      return;
    }
    
    try {
      setLoading(true);
      const res = await generateEmailOtp(email);
      
      if (res) {
        toast.success(res.message || "OTP sent successfully!");
        router.push(`/auth/forgot-password/forgot-password-verify?email=${encodeURIComponent(email)}`);
      } 
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const data = {
    heading: "Forgot your account",
    subText: "Continue your journey with UrbanRealities",
    emailLabel: "Email",
    emailPlaceholder: "Enter email id",
    loginButton: "Reset Password",
    noAccountText: "",
    signUpText: "Back to Login",
    troubleshootText: "Troubleshoot?",
    forgotPasswordText: "Forgot Password",
      knowText: "Know More",
    guideText: "Forgot Account?",
  };

  return (
    <div>
      <h2 className={`formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <AuthInput
          label={data.emailLabel}
          type="text"
          id="email"
          placeholder={data.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

    

      <div>
        <button 
          onClick={handleSubmit} 
          disabled={loading} 
          className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
          style={{ width: "100%", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Sending..." : data.loginButton}
        </button>
      </div>

      

      <div className={styles.formLinks}>
        <p className={`formLinkText mt ${styles.formLinkText}`}>
          {data.noAccountText}{" "}
          <IoArrowBackSharp/> 
          <Link href="/auth/login" className={`formLink ${styles.formLink}`}>
           {data.signUpText}
          </Link>
        </p>
         <p className={`formLinkText ${styles.KnowLinkText}`}>
          {data.guideText}{" "}
          <Link href="#" className={`formLink ${styles.KnowLink}`}>
            {data.knowText}
          </Link>
        </p>
       
      </div>
    </div>
  );
}
