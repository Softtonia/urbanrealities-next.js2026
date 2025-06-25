'use client';

import styles from './LoginLeft.module.css';

const LoginLeft = () => {
  // Dummy data variable
  const data = {
    heading: "Welcome to UrbanRealities!",
    subText: "To access your account:",
    loginEmailHeading: "Login with email & password",
    loginEmailSteps: [
      "Enter your registered email address or phone number",
      "Input your password in the password field",
      "Click the \"Login\" button"
    ],
    loginGoogleHeading: "Login with Google account",
    loginGoogleSteps: [
      "Choose your Google account and grant the permissions",
      "Seamless login to your UrbanRealities account"
    ]
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

      <h4 className={styles.leftSubHeading}>{data.loginGoogleHeading}</h4>
      <ul className={styles.leftList}>
        {data.loginGoogleSteps.map((step, index) => (
          <li key={index} className={styles.leftListItem}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoginLeft;
