import React from 'react';
import styles from './AuthLayout.module.css';

const AuthLayout = ({ leftContent, children }) => {
  return (
    <div className="container p-0">
      <div className={styles.authContainer}>
        <div className={styles.loginContainer}>
          <div className={styles.leftPanel}>
        {leftContent}
      </div>

          <div className={styles.rightPanel}>
            <img src="/Blob-Shape.png" alt="Decoration" />
             <div className={styles.formWrapper}>
          {children}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
