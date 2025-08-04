import React from 'react';
import styles from "../loginform/LoginLeft.module.css";

const ResetPasswordLeft = () => {
      const data = {
    heading: "To set a new password for  ",
    subText: "your UrbanRealities account",
    loginEmailHeading: "Login with email & password",
    loginEmailSteps: [
    "Set New password for your account",
    "Confirm your new, secure password.",
    "Save or submit the changes."    ],

  };
  return (
     <div>
      <p className={`authHeading  ${styles.authHeading}`}>{data.heading}</p>
      <p className={`authSubHeading  ${styles.authSubHeading}`}>{data.subText}</p>

      <h4 className={`authsmallHeading  ${styles.authsmallHeading}`}>{data.loginEmailHeading}</h4>
      <ol className={styles.authList}>
        {data.loginEmailSteps.map((step, index) => (
          <li key={index} className={styles.authListItem}>{step}</li>
        ))}
      </ol>

    
    </div>
  );
}

export default ResetPasswordLeft;

