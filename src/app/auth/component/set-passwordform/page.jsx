'use client';
import React, { Suspense, useEffect, useState } from "react";
import styles from "../loginform/Login.module.css";
import { useRegisterForm } from "../../context/RegisterFormProvider";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const SetPassword = () => {
  const { formData, updateField } = useRegisterForm();
  const { login } = useSiteSettings();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get values from URL
  const email = searchParams.get("email");
  const username = searchParams.get("username");
  const phone = searchParams.get("phone");
  const role = searchParams.get("role");
  const firstName = searchParams.get("firstname");
  const lastName = searchParams.get("lastname");

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

  // password validation function
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      uppercase.test(password) &&
      lowercase.test(password) &&
      number.test(password) &&
      specialChar.test(password)
    );
  };

  const handleSubmit = async () => {
    if (!validatePassword(formData.password)) {
      setError(
        "Password must be 8+ characters with upper, lower, number, and symbol"
      );
      return;
    }

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
        await login(result.api_token);
      }
      router.push(`/auth/login/verify-otp?email=${formData.email}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }) => (
    open ? (
      // Eye Open
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 
          0 8.268 2.943 9.542 7-1.274 4.057-5.065 
          7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ) : (
      // Eye Slash
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13" /></svg>

    )
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2 className={`formHeading ${styles.formHeading}`}>{data.heading}</h2>
        <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label htmlFor="Password" className={`formLabel ${styles.formLabel}`}>
            {data.passwordLabel}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="Password"
            className={`formInput ${styles.formInput}`}
            placeholder={data.passwordPlaceholder}
            onChange={(e) => updateField("password", e.target.value)}
            value={formData.password}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "60%",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            <EyeIcon open={showPassword} />
          </span>
        </div>

        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label htmlFor="confirmPassword" className={`formLabel ${styles.formLabel}`}>
            {data.confirmPasswordLabel}
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className={`formInput ${styles.formInput}`}
            placeholder={data.confirmPasswordPlaceholder}
            onChange={(e) => updateField("confirm_password", e.target.value)}
            value={formData.confirm_password}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "60%",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            <EyeIcon open={showConfirmPassword} />
          </span>
          {error && (
            <p className={`formLabel ${styles.errorText}`} style={{ color: "red", fontSize: "12px" }}>
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`body-text-14 mt-5 formGroupBtn ${styles.nextBtn}`}
        >
          {data.nextButton}
        </button>
      </div>
    </Suspense>
  );
};

export default SetPassword;
