import React from 'react';
import styles from "../loginpage/LoginLeft.module.css"
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
      <h2 className={styles.leftHeading}>{data.heading}</h2>
      <p className={styles.leftSubText}>{data.subText}</p>
      <h4 className={styles.leftSubHeading}>{data.loginEmailHeading}</h4>
      <ul className={styles.leftList}>
        {data.loginEmailSteps.map((step, index) => (
          <li key={index} className={styles.leftListItem}>{step}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default RegisterLeft;
