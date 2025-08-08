'use client';
import React, { useEffect, useState } from "react";
import styles from "../loginform/Login.module.css";
import { useRegisterForm } from "../../context/RegisterFormProvider";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const SetPassword = () => {
  const { formData, updateField } = useRegisterForm();
  const { login } = useSiteSettings()
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get values from URL
  const email = searchParams.get("email");
  const username = searchParams.get("username");
  const phone = searchParams.get("phone");
  const role = searchParams.get("role");
  const lastName = searchParams.get("firstname");
  const firstName = searchParams.get("lastname");

  useEffect(() => {
    if (email) updateField("email", email);
    if (username) updateField("userName", username);
    if (firstName) updateField("firstName", firstName);
    if (lastName) updateField("lastName", lastName);
    if (phone) updateField("phone", phone);
    if (role) updateField("role", role);
  }, [email, username, firstName, lastName, phone, role]);

  const data = {
    heading: "Set your password",
    subText: "Continue your journey with UrbanRealities",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter password",
    nextButton: loading ? "Submitting..." : "Next",
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/user-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.userName,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          role_id: formData.role,
          password: formData.password,


        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }
      if (result.api_token) {
        await login(result.api_token)
      }
      // Success - navigate to OTP verification page
      router.push(`/auth/login/verify-otp?email=${formData.email}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className={`formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      <div className={styles.formGroup}>
        <label htmlFor="Password" className={`formLabel ${styles.formLabel}`}>
          {data.passwordLabel}
        </label>
        <input
          type="password"
          id="Password"
          className={`formInput ${styles.formInput}`}
          placeholder={data.passwordPlaceholder}
          onChange={(e) => updateField("password", e.target.value)}
          value={formData.password}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={`formLabel ${styles.formLabel}`}>
          {data.confirmPasswordLabel}
        </label>
        <input
          type="password"
          id="confirmPassword"
          className={`formInput ${styles.formInput}`}
          placeholder={data.confirmPasswordPlaceholder}
          onChange={(e) => updateField("confirm_password", e.target.value)}
          value={formData.confirm_password}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
      >
        {data.nextButton}
      </button>
    </div>
  );
};

export default SetPassword;
