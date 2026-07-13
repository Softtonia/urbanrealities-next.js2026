'use client';
import React, { useState } from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/auth.service";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPassword({
        email,
        new_password: password,
        new_password_confirmation: confirmPassword,
        otp
      });

      if (res.status === true) {
        toast.success(res.message || "Password reset successfully!");
        router.push("/auth/login");
      } else {
        toast.error(res.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const data = {
    heading: "Set your password",
    subText: "Continue your journey with UrbanRealities",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter password",
    nextButton: "Confirm",
      knowText: "Know More",
    guideText: "Set Password?",
  };

  return (
        <div>
      <h2 className={` formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={` formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="Password" className={`formLabel ${styles.formLabel}`}>
          {data.passwordLabel}
        </label>
        <input
          type="password"
          id="Password"
          className={` formInput ${styles.formInput}`}
          placeholder={data.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={`formLabel  ${styles.formLabel}`}>
          {data.confirmPasswordLabel}
        </label>
        <input
          type="password"
          id="confirmPassword"
          className={`${styles.formInput} formInput`}
          placeholder={data.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    <button 
      onClick={handleSubmit} 
      disabled={loading} 
      className={`body-text-14 formGroupBtn ${styles.nextBtn}`} 
      style={{ width: "100%", cursor: loading ? "not-allowed" : "pointer" }}
    >
      {loading ? "Confirming..." : data.nextButton}
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

export default ResetPassword;

