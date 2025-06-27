import React from 'react';
import styles from './AuthLayout.module.css';
import { CiCircleRemove } from "react-icons/ci";
const AuthLayout = ({ leftContent, children }) => {
  return (
    // <div className="container p-0">
      <div className={styles.authContainer}>
        <div className={styles.loginContainer}>


          <div className={styles.leftPanel}>
        {leftContent}
      </div>

          <div className={styles.rightPanel}>
            <img src="/Blob-Shape.png" alt="Decoration"className={styles.blobShape} />
              {/* <CiCircleRemove className={styles.closeIcon}/> */}
             <div className={styles.formWrapper}>
              {/* <div className="">
              <h2 className={styles.rightHeading}>UrbanRealities</h2>
              </div> */}
          {children}
        </div>
        </div>



          </div>
        </div>
      // </div>
  );
};

export default AuthLayout;
