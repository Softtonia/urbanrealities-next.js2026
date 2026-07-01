'use client';

import React from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
import AuthInput from "../AuthInput/AuthInput";

export default function ForgotPassword() {
  const data = {
    heading: "Forgot your account",
    subText: "Continue your journey with UrbanRealities",
    emailLabel: "Email/Phone Number",
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
        />
      </div>

    

      <div>
        <Link href="/auth/forgot-password/forgot-password-verify" className={`body-text-14 formGroupBtn ${styles.nextBtn}`}>
          {data.loginButton}
        </Link>
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
