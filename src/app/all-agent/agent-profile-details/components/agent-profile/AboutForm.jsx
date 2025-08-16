import React from 'react';
import styles from './AgentProfile.module.css'
import { FaPhoneAlt } from "react-icons/fa";
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
const AboutForm = () => {
  return (
    <div>
      <div className={styles.right}>
        {/* <button className={styles.reportBtn}>
          <FaFlag className={styles.icon} /> Report
        </button> */}
        <div className={styles.quickEnquiry}>
          <h4 className={styles.icon}> Quick Enquiry</h4>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="tel" placeholder="Phone Number" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" rows={3}></textarea>
            <button type="submit" className={styles.callBackBtn}>
              <FaPhoneAlt className={styles.icon} /> Request Call-back
            </button>
          </form>
                {/* <div className={styles.formGroup}>
        <label htmlFor="email" className={`formLabel ${styles.formLabel}`}>
          {data.emailLabel}
        </label>
        <input
          type="text"
          id="email"
          className={`formInput ${styles.formInput}`}
          placeholder={data.emailPlaceholder}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup} style={{ position: "relative" }}>
      <label htmlFor="password" className={styles.formLabel}>
        {data.passwordLabel}
      </label>

      <input
        type= "password"
        id="password"
        className={`formInput ${styles.formInput}`}
        placeholder={data.passwordPlaceholder}
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        required
      />
</div> */}
        </div>
      </div>
    </div>
  );
}

export default AboutForm;
