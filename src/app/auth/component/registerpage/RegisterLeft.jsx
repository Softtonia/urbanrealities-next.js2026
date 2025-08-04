import React from 'react';
import styles from "../loginform/LoginLeft.module.css"
const RegisterLeft = () => {
      const data = {
    heading: "Welcome to UrbanRealities!",
    subText: "To access your account:",
    loginEmailHeading: "Login with email & password",
    loginEmailSteps: [
      "Enter your registered email address or phone number",
      "Input your password in the password field",
      "Click the \"Login\" button to access your account"
    ],
  
  };
  return (
    <div>
      <p className={`authHeading  ${styles.authHeading}`}>{data.heading}</p>
      <p className={`authSubHeading  ${styles.authSubHeading}`}>{data.subText}</p>

      <h4 className={`authsmallHeading  ${styles.authsmallHeading}`}>{data.loginEmailHeading}</h4>
      <ul className={styles.authList}>
        {data.loginEmailSteps.map((step, index) => (
          <li key={index} className={styles.authListItem}>{step}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default RegisterLeft;
