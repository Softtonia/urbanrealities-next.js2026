'use client';
import React, { useEffect, useState } from "react";
import styles from "../loginform/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterForm } from "../../context/RegisterFormProvider";
import { useDebounce } from "@/hooks/useDebounce";

const Register = ({roles=[]}) => {
  const { formData, updateField } = useRegisterForm();
  const [formError, setFormError] = useState("");
  // const [roles, setRoles] = useState(roles);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
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
  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const res = await fetch('/api/auth/role-listing');
  //       const data = await res.json();
  //       if (Array.isArray(data)) {
  //         setRoles(data);
  //       } else if (data?.data) {
  //         setRoles(data.data);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching roles:', err);
  //     }
  //   };
  //   fetchRoles();
  // }, []);

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
        const res = await fetch('/api/auth/register/checkmail', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: debounceEmail })
        });

        const data = await res.json();
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
        const res = await fetch('/api/auth/register/checkphone', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ phone: debouncePhone })
        });

        const data = await res.json();
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
  const handleNext = () => {
    setFormError(""); // clear previous error

    if (usernameError) return; // already handled elsewhere
    if (emailError) return; //email taken
    if (phoneError) return; //phone taken

    // ✅ Required field validation
    if (
      !formData.firstName?.trim() ||
      !formData.lastName?.trim() ||
      !formData.userName?.trim() ||
      !formData.email?.trim() ||
      !formData.phone?.trim() ||
      !formData.role
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

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
          <p className="formLabel" style={{ color: "red", fontSize: "12px" }}>{usernameError}</p>
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
        />{emailError && (
          <p className="formLabel" style={{ color: "red", fontSize: "12px" }}>{emailError}</p>
        )}
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
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // Remove all non-digits
            value = value.replace(/^0+/, ""); // Remove leading zeros
            if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
            updateField("phone", value);
          }}
        />
        {phoneError && (
          <p className="formLabel" style={{ color: "red", fontSize: "12px" }}>{phoneError}</p>
        )}
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
      {formError && (
        <p className="formLabel" style={{ color: "red" }}>
          {formError}
        </p>
      )}


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
