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
    forgotPasswordText: "Forgot Password"
  };

  return (
    <div>
      <h2 className={styles.rightHeading}>{data.heading}</h2>
      <p className={styles.rightSubText}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          {data.emailLabel}
        </label>
        <input
          type="text"
          id="email"
          className={styles.input}
          placeholder={data.emailPlaceholder}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          {data.passwordLabel}
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          placeholder={data.passwordPlaceholder}
        />
      </div>

      <div>
        <button className={`body-text-14 loginBtn ${styles.loginBtn}`}>
          {data.loginButton}
        </button>
      </div>

      <button className={`body-text-14 ${styles.googleBtn}`}>
        <img src="/Google.png" alt="Google" className={styles.googleIcon} />
        {data.googleButton}
      </button>

      <div className={styles.links}>
        <p className={styles.linkText}>
          {data.noAccountText}{" "}
          <Link href="/auth/register" className={styles.link}>
            {data.signUpText}
          </Link>
        </p>
        <p className={styles.linkText}>
          {data.troubleshootText}{" "}
          <Link href="#" className={styles.link}>
            {data.forgotPasswordText}
          </Link>
        </p>
      </div>
    </div>
  );
}
