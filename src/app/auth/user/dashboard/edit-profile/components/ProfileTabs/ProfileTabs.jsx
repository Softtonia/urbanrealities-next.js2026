"use client";

import React from "react";
import styles from "./ProfileTabs.module.css";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const steps = [
    { id: "personal", label: "Personal Details" },
    { id: "document", label: "Document Upload" },
    { id: "review", label: "Review & Submit" },
    { id: "verification", label: "Verification" },
  ];

  // Determine current active index for completed line styles
  const activeIndex = steps.findIndex((step) => step.id === activeTab);

  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => {
        const isActive = step.id === activeTab;
        const isCompleted = index < activeIndex;

        return (
          <React.Fragment key={step.id}>
            <button
              className={styles.stepButton}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(step.id);
              }}
            >
              <div
                className={`${styles.stepCircle} ${
                  isActive ? styles.circleActive : ""
                } ${isCompleted ? styles.circleCompleted : ""}`}
              >
                {index + 1}
              </div>
              <span
                className={`${styles.stepLabel} ${
                  isActive ? styles.labelActive : ""
                }`}
              >
                {step.label}
              </span>
            </button>

            {/* The line connecting to the next step */}
            {index !== steps.length - 1 && (
              <div className={styles.lineWrapper}>
                <div
                  className={`${styles.lineInner} ${
                    isCompleted ? styles.lineFull : isActive ? styles.lineHalf : ""
                  }`}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
