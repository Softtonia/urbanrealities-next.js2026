'use client';
import React, { useEffect, useState } from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterForm } from "../../context/RegisterFormProvider";
import { useDebounce } from "@/hooks/useDebounce";

const Register = () => {
  const { formData, updateField } = useRegisterForm();
  const [roles, setRoles] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // Already logged in, redirect to dashboard
      router.replace("/");
    }
  }, []);

  // ✅ debounce userName from context
  const debounceUserName = useDebounce(formData.userName, 500);

  // --- Fetch roles from Laravel via Next.js API ---
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('/api/auth/role-listing');
        const data = await res.json();
        if (Array.isArray(data)) {
          setRoles(data);
        } else if (data?.data) {
          setRoles(data.data);
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };
    fetchRoles();
  }, []);

  // --- Username availability check ---
  useEffect(() => {
    const checkUsername = async () => {
      if (!debounceUserName) {
        setUsernameError("");
        return;
      }
      try {
        const res = await fetch('/api/auth/usernamecheck', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user_name: debounceUserName })
        });

        const data = await res.json();

        if (res.status && data?.data?.available) {
          setUsernameError(""); // ✅ available
        } else {
          setUsernameError("Username is already taken."); // ❌ not available
        }
      } catch (err) {
        console.error("Error checking username:", err);
      }
    };

    checkUsername();
  }, [debounceUserName]);

  // --- Next button handler ---
  const handleNext = () => {
    if (usernameError) return; // prevent navigation if username is taken
    const query = new URLSearchParams({
      email: formData.email,
      username: formData.userName,
      phone: formData.phone,
      role: formData.role,
      firstname: formData.firstName,
      lastname: formData.lastName
    }).toString();

    router.push(`/auth/login/setpassword?${query}`);
  };

  const data = {
    heading: "Sign Up",
    subText: "Start your journey with UrbanRealities",
    firstName: 'First Name',
    firstNamePlaceholder: "Enter First Name",
    lastName: "Last Name",
    lastNamePlaceholder: "Enter Last Name",
    usernameLabel: "Username",
    usernamePlaceholder: "Enter Username",
    emailLabel: "Email",
    emailPlaceholder: "Enter email",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter Phone Number",
    userTypeLabel: "I am",
    nextButton: "Next",
    loginText: "Already have an account?",
    loginLinkText: "Login",
    loginLink: "/auth/login",
    knowText: "Know More",
    guideText: "Sign Up Guide?",
  };

  return (
    <div>
      <h2 className={`formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

      {/* First Name */}
      <div className={styles.formGroup}>
        <label htmlFor="firstName" className={`formLabel ${styles.formLabel}`}>
          {data.firstName}
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          className={`formInput ${styles.formInput}`}
          placeholder={data.firstNamePlaceholder}
          onChange={(e) => updateField("firstName", e.target.value)}
        />
      </div>

      {/* Last Name */}
      <div className={styles.formGroup}>
        <label htmlFor="lastName" className={`formLabel ${styles.formLabel}`}>
          {data.lastName}
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          className={`formInput ${styles.formInput}`}
          placeholder={data.lastNamePlaceholder}
          onChange={(e) => updateField("lastName", e.target.value)}
        />
      </div>

      {/* Username */}
      <div className={styles.formGroup}>
        <label htmlFor="username" className={`formLabel ${styles.formLabel}`}>
          {data.usernameLabel}
        </label>
        <input
          type="text"
          id="username"
          value={formData.userName}
          className={`formInput ${styles.formInput}`}
          placeholder={data.usernamePlaceholder}
          onChange={(e) => updateField("userName", e.target.value)}
        />
        {usernameError && (
          <p style={{ color: "red", fontSize: "12px",marginBottom:"5px" }}>{usernameError}</p>
        )}
      </div>

      {/* Email */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={`formLabel ${styles.formLabel}`}>
          {data.emailLabel}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          className={`formInput ${styles.formInput}`}
          placeholder={data.emailPlaceholder}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={`formLabel ${styles.formLabel}`}>
          {data.phoneLabel}
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          className={`formInput ${styles.formInput}`}
          placeholder={data.phonePlaceholder}
          onChange={(e) => updateField("phone", e.target.value)}
        />
      </div>

      {/* Roles */}
      <div className={styles.formGroup}>
        <label className={`formLabel ${styles.formLabel}`}>
          {data.userTypeLabel}
        </label>
        <div className={styles.radioGroup}>
          {roles.map((role) => (
            <label key={role.id} className={styles.radioOption}>
              <input
                type="radio"
                name="userType"
                value={role.id}
                checked={formData.role === role.id}
                onChange={() => updateField("role", role.id)}
              />
              <span className={`body-text-14 ${styles.spanOption}`}>{role.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!!usernameError} // disable if username is taken
        className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
      >
        {data.nextButton}
      </button>

      {/* Links */}
      <div className={styles.formLinks}>
        <p className={`formLinkText ${styles.formLinkText}`}>
          {data.loginText}{" "}
          <Link href={data.loginLink} className={`formLink ${styles.formLink}`}>
            {data.loginLinkText}
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
};

export default Register;
