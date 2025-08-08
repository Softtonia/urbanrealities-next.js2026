"use client";

import React from "react";
import styles from "./component/AuthLayout.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { RegisterFormProvider } from "./context/RegisterFormProvider";

const AuthLayout = ({ leftContent, rightContent }) => {
  return (
    <div className={styles.authContainer}>
      <RegisterFormProvider>
        <div className={styles.loginContainer}>
          <div className={styles.leftPanel}>{leftContent}</div>

          <div className={styles.rightPanel}>
            <img
              src="/Blob-Shape.png"
              alt="Decoration"
              className={styles.blobShape}
            />
            {/* <CiCircleRemove className={styles.closeIcon}/> */}
            <div className={styles.formWrapper}>

              {rightContent}

            </div>
          </div>
        </div>
      </RegisterFormProvider>
    </div>
  );
};

export default AuthLayout;
