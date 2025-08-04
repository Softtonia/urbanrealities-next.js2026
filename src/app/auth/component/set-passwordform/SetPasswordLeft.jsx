import React from 'react';
import styles from "../loginform/LoginLeft.module.css";

const SetPasswordLeft = () => {
      const data = {
    heading: "Verify your email/phone for  ",
    subText: "UrbanRealities account authentication",
    loginEmailHeading: "Login with email & password",
    loginEmailSteps: [
       "Click on the verification link provided in the email or follow the instructions sent to your phone.",
    "Once verified, your account will be authenticated, and you can log in to UrbanRealities.",
    "For any issues or assistance, contact our support team at support@urbanrealities.com. Thank you for choosing UrbanRealities!(edited)",
    ],

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

export default SetPasswordLeft;
