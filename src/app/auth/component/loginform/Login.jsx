'use client';

import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSiteSettings();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLink, setGoogleLink] = useState('')

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // Already logged in, redirect to dashboard
      router.replace("/");
    }
  }, []);

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
  const handgoogleredirect = async () => {
    try {
      const res = await fetch('/api/auth/googlelogin/getlink');
      const data = await res.json();

      if (data?.url) {
        console.log(data)
        // Redirect browser to Google login
        window.location.href = data.url;
      } else {
        console.error('Google login URL not found in response');
      }
    } catch (err) {
      console.error('Error while redirecting:', err);
    }
  };


  // ✅ Form submit handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }
      console.log("login", result)
      if (result.token) {
        // Store token in sessionStorage
        login(result.token)
      }
      // Redirect user or do something else

      // ✅ Success: redirect or store token
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h5 className={`formHeading ${styles.formHeading}`}>{data.heading}</h5>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={`formLabel ${styles.formLabel}`}>
          {data.emailLabel}
        </label>
        <input
          type="text"
          id="email"
          className={`formInput ${styles.formInput}`}
          placeholder={data.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup} style={{ position: "relative" }}>
      <label htmlFor="password" className={styles.formLabel}>
        {data.passwordLabel}
      </label>

      <input
        type={showPassword ? "text" : "password"}
        id="password"
        className={`formInput ${styles.formInput}`}
        placeholder={data.passwordPlaceholder}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Eye icon */}
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "10px",
          top: "57%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      >
        {showPassword ? (
          // Eye Open
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          // Eye Slash
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/></svg>
        )}
      </span>
      {error && <p style={{ color: "red", fontSize: "14px" }} className={`${styles.error}`}>{error}</p>}
    </div>
      

      <div>
        <button
          type="submit"
          className={`body-text-14 mt-4 formGroupBtn ${styles.formGroupBtn}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : data.loginButton}
        </button>
      </div>

      <button
        type="button"
        className={`body-text-14 googleBtn ${styles.googleBtn}`}
        onClick={handgoogleredirect}
      >
        <img src="/Google.png" alt="Google" className={styles.googleIcon} />
        {data.googleButton}
      </button>


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
    </form>
  );
}
