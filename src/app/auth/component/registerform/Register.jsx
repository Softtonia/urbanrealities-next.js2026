'use client';
import React, { useEffect, useState } from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterForm } from "../../context/RegisterFormProvider";
import AuthInput from "../AuthInput/AuthInput";
import { useDebounce } from "@/hooks/useDebounce";
import { FaGoogle } from "react-icons/fa";
import { getRoleListing, checkUsername, checkEmail, checkPhone } from "@/services/auth.service";

const Register = ({ roles = [] }) => {
  const { formData, updateField } = useRegisterForm();
  const [formError, setFormError] = useState("");
  const [roleList, setRoleList] = useState(roles);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState("");


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
  const debounceEmail = useDebounce(formData.email, 1000)
  const debouncePhone = useDebounce(formData.phone, 1000)

  // --- Fetch roles from Laravel via Next.js API ---
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoleListing();
        console.log(data , "role goes here")
        if (Array.isArray(data)) {
          setRoleList(data);
        } else if (data?.roles && Array.isArray(data.roles)) {
          setRoleList(data.roles);
        } else if (data?.data && Array.isArray(data.data)) {
          setRoleList(data.data);
        } else {
          setRoleList([]);
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };
    if (roleList.length === 0) {
      fetchRoles();
    }
  }, []);

  // --- Username availability check ---
  useEffect(() => {
    const checkUsername = async () => {
      if (!debounceUserName) {
        setUsernameError("");
        return;
      }
      try {
        const data = await checkUsername(debounceUserName);
        console.log(data.user_name)

        if (!data?.user_name?.exists) {
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

  // ---email check
  useEffect(() => {
    const checkEmail = async () => {
      if (!debounceEmail) {
        setEmailError("");
        return;
      }
      try {
        const data = await checkEmail(debounceEmail);
        console.log(data)

        if (!data.email?.exists) {
          setEmailError(""); // ✅ available
        } else {
          setEmailError("email is already taken."); // ❌ not available
        }
      } catch (err) {
        console.error("Error checking email:", err);
      }
    };

    checkEmail();
  }, [debounceEmail]);
  // -------------phone check
  useEffect(() => {
    const checkphone = async () => {
      if (!debouncePhone) {
        setPhoneError("");
        return;
      }
      try {
        const data = await checkPhone(debouncePhone);
        console.log(data)

        if (!data.phone?.exists) {
          setPhoneError(""); // ✅ available
        } else {
          setPhoneError("phone number is already taken."); // ❌ not available
        }
      } catch (err) {
        console.error("Error checking phone:", err);
      }
    };

    checkphone();
  }, [debouncePhone]);


  // --- Next button handler ---
  console.log(formData.role)
  const validateForm = () => {
    let isValid = true;

    if (!formData.firstName?.trim()) {
      setFirstNameError("First name is required.");
      isValid = false;
    } else setFirstNameError("");

    if (!formData.lastName?.trim()) {
      setLastNameError("Last name is required.");
      isValid = false;
    } else setLastNameError("");

    if (!formData.userName?.trim()) {
      setUsernameError("Username is required.");
      isValid = false;
    } else setUsernameError("");

    if (!formData.email?.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else setEmailError("");

    if (!formData.phone?.trim()) {
      setPhoneError("Phone number is required.");
      isValid = false;
    } else setPhoneError("");

    if (!isAgreed) {
      setAgreeError("You must agree to the terms and conditions.");
      isValid = false;
    } else setAgreeError("");
  
    return isValid;
  };


  const handleNext = () => {
    setFormError(""); // clear previous error

    if (usernameError) return; // already handled elsewhere
    if (emailError) return; //email taken
    if (phoneError) return; //phone taken

    // ✅ Required field validation
    if (!validateForm()) return;

    const query = new URLSearchParams({
      email: formData.email,
      username: formData.userName,
      phone: formData.phone,
      role: formData.role,
      firstname: formData.firstName,
      lastname: formData.lastName
    }).toString();

    sessionStorage.setItem("registration_step", "1");

    router.push(`/auth/login/setpassword?${query}`);
  };


  const data = {
    heading: "Create your account",
    subText: "Enter your details below to get started with UrbanRealities.",
    firstName: 'First Name',
    firstNamePlaceholder: "Enter First Name",
    lastName: "Last Name",
    lastNamePlaceholder: "Enter Last Name",
    usernameLabel: "Username",
    usernamePlaceholder: "Enter Username",
    emailLabel: "Email",
    emailPlaceholder: "Enter Email Address",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter Phone Number",
    userTypeLabel: "I am",
    nextButton: "Create Account",
    loginText: "Already have an account?",
    loginLinkText: "Log in",
    loginLink: "/auth/login",
    knowText: "Know More",
    guideText: "Sign Up Guide?",
  };

  return (
    <div>
      <h2 className={`formHeading ${styles.formHeading}`}>{data.heading}</h2>
      <p className={styles.formSubText}>{data.subText}</p>

      {/* Name Row */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* First Name */}
        <div style={{ flex: 1 }}>
          <AuthInput
            label={data.firstName}
            id="firstName"
            value={formData.firstName}
            placeholder={data.firstNamePlaceholder}
            onChange={(e) => updateField("firstName", e.target.value)}
            error={firstNameError}
          />
        </div>

        {/* Last Name */}
        <div style={{ flex: 1 }}>
          <AuthInput
            label={data.lastName}
            id="lastName"
            value={formData.lastName}
            placeholder={data.lastNamePlaceholder}
            onChange={(e) => updateField("lastName", e.target.value)}
            error={lastNameError}
          />
        </div>
      </div>
      <AuthInput
        label={data.usernameLabel}
        id="username"
        value={formData.userName}
        placeholder={data.usernamePlaceholder}
        onChange={(e) => updateField("userName", e.target.value)}
        error={usernameError}
      />

      <AuthInput
        label={data.emailLabel}
        type="email"
        id="email"
        value={formData.email}
        placeholder={data.emailPlaceholder}
        onChange={(e) => updateField("email", e.target.value)}
        error={emailError}
      />

      <AuthInput
        label={data.phoneLabel}
        type="tel"
        id="phone"
        value={formData.phone}
        placeholder={data.phonePlaceholder}
        onChange={(e) => {
          let value = e.target.value.replace(/\D/g, "");
          value = value.replace(/^0+/, "");
          if (value.length > 10) value = value.slice(0, 10);
          updateField("phone", value);
        }}
        error={phoneError}
      />


      {/* Roles */}
      <div className={styles.formGroup}>
        <label className={`formLabel ${styles.formLabel}`}>
          {data.userTypeLabel}
        </label>
        <div className={styles.radioGroup}>
          {(Array.isArray(roleList) ? roleList : []).map((role) => (
            <label key={role.id} className={styles.radioOption}>
              <input
                type="radio"
                name="userType"
                value={role.id}
                checked={formData.role == role.id}
                onChange={() => updateField("role", role.id)}
              />
              <span className={`body-text-14 ${styles.spanOption}`}>{role.name}</span>
            </label>
          ))}
        </div>
      </div>
      {formError && (
        <p className="formLabel" style={{ color: "red" }}>
          {formError}
        </p>
      )}

      {/* Agree Checkbox */}
      <div className={styles.formGroup} style={{ height: 'auto', marginBottom: '25px', flexDirection: 'row', alignItems: 'flex-start', gap: '10px' }}>
        <input
          type="checkbox"
          id="agreeTerms"
          checked={isAgreed}
          onChange={(e) => {
            setIsAgreed(e.target.checked);
            if (e.target.checked) setAgreeError("");
          }}
          style={{ marginTop: '3px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="agreeTerms" style={{ fontSize: '12px', color: 'var(--Eerie-Black)', fontFamily: 'var(--font-inter-regular)', lineHeight: '1.4' }}>
            I agree to <Link href="/terms" style={{ color: 'var(--Orange-Red)', textDecoration: 'none' }}>urbanrealities.com</Link>, <Link href="/privacy-policy" style={{ color: 'var(--Orange-Red)', textDecoration: 'none' }}>privacy policy</Link> and <Link href="/terms-and-conditions" style={{ color: 'var(--Orange-Red)', textDecoration: 'none' }}>terms and condition</Link>
          </label>
          {agreeError && (
            <p style={{ color: "var(--Tart-Orange)", fontSize: "12px", marginTop: "4px" }}>{agreeError}</p>
          )}
        </div>
      </div>


      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!!usernameError} // disable if username is taken
        className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
        style={{ marginTop: '20px' }}
      >
        {data.nextButton}
      </button>

      {/* Or Divider */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
         <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
         <span style={{ padding: '0 10px', color: '#888', fontSize: '12px' }}>or</span>
         <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className={`body-text-14 googleBtn ${styles.googleBtn}`}
        style={{ marginBottom: '30px' }}
      >
        <FaGoogle color="#555" size={16} style={{ marginRight: '8px' }} />
        Sign up with Google
      </button>

      {/* Links */}
      <div className={styles.formLinks}>
        <p className={`formLinkText ${styles.formLinkText}`} style={{ color: '#555' }}>
          {data.loginText}{" "}
          <Link href={data.loginLink} className={`formLink ${styles.formLink}`} style={{ color: 'var(--Orange-Red)', fontWeight: '500', textDecoration: 'none' }}>
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
