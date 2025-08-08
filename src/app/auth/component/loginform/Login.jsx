'use client';

import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

export default function LoginPage() {
  const router = useRouter();
  const {login} = useSiteSettings(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      console.log("login",result)
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

      {error && <p className={styles.error}>{error}</p>}

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

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>
          {data.passwordLabel}
        </label>
        <input
          type="password"
          id="password"
          className={`formInput ${styles.formInput}`}
          placeholder={data.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <div>
        <button
          type="submit"
          className={`body-text-14 formGroupBtn ${styles.formGroupBtn}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : data.loginButton}
        </button>
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
    </form>
  );
}
