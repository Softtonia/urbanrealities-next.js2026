'use client';

import React from "react";
import styles from "./Login.module.css";
import Link from "next/link";

export default function LoginPage() {
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

  return (
    <div>
      <h5 className={` formHeading ${styles.formHeading}`}>{data.heading}</h5>
      <p className={` formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={`formLabel ${styles.formLabel}`}>
          {data.emailLabel}
        </label>
        <input
          type="text"
          id="email"
          className={`formInput ${styles.formInput}`}
          placeholder={data.emailPlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>
          {data.passwordLabel}
        </label>
        <input
          type="password"
          id="password"
          className={`formInput ${styles.formInput}`}
          placeholder={data.passwordPlaceholder}
        />
      </div>

      <div>
        <Link href="/auth/user/account" className={`body-text-14 formGroupBtn ${styles.formGroupBtn}`}>
          {data.loginButton}
        </Link>
      </div>

      <Link href="#" className={`body-text-14 googleBtn ${styles.googleBtn}`}>
        <img src="/Google.png" alt="Google" className={styles.googleIcon} />
        {data.googleButton}
      </Link>

      <div className={styles.formLinks}>
        <p className={`formLinkText ${styles.formLinkText}`}>
          {data.noAccountText}{" "}
          <Link href="/auth/login/register" className={`formLink ${styles.formLink}`}>
            {data.signUpText}
          </Link>
        </p>
        <p className={`formLinkText ${styles.formLinkText}`}>
          {data.troubleshootText}{" "}
          <Link href="/auth/forgot-password" className={`formLink ${styles.formLink}`}>
            {data.forgotPasswordText}
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
