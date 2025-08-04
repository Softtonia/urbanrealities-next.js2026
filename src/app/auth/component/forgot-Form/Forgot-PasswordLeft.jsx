'use client';

import styles from "../loginform/LoginLeft.module.css";

const ForgotPasswordLeft = () => {
  // Dummy data variable
  const data = {
    subText: "Forgot Password ",
    loginEmailSteps: [
     "Go to www.urbanrealities.com.",
      "Click on 'Forgot Password' on the login page.",
      "Enter your email/phone associated with your account.",
      "Check your email for a password reset link.",
      "Click the link and follow the instructions to set a new password.",
      "If you need further assistance, contact our support team at support@urbanrealities.com."
    ],

  };

  return (
    <div>
      <p className={`authSubHeading  ${styles.authSubHeading}`}>{data.subText}</p>

      <h4 className={`authsmallHeading  ${styles.authsmallHeading}`}>{data.loginEmailHeading}</h4>
      <ol className={styles.authList}>
        {data.loginEmailSteps.map((step, index) => (
          <li key={index} className={styles.authListItem}>{step}</li>
        ))}
      </ol>

    
    </div>
  );
};

export default ForgotPasswordLeft;
