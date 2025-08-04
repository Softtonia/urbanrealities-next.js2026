import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AuthLayout.module.css';
import { CiCircleRemove } from "react-icons/ci";
const AuthLayout = ({ leftContent, rightContent }) => {
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
              {/* <div className={` text-center ${styles.formlogo}`} >
                <img src="/form-logo.png" alt="" />
              </div> */}
          {rightContent}
        </div>
        </div>



          </div>
        </div>
      // </div>
  );
};

export default AuthLayout;
