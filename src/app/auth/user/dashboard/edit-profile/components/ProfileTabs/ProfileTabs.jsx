"use client";

import React from "react";
import styles from "./ProfileTabs.module.css";
import { FaCheck } from "react-icons/fa";

import { toast } from "react-toastify";

const ProfileTabs = ({
  activeTab,
  setActiveTab,
  completedSteps = null,
  steps = [
    { id: "personal", label: "Personal Details" },
    { id: "document", label: "KYC Documents" },
    { id: "review", label: "Review & Submit" },
    { id: "verification", label: "Verification" },
  ],
}) => {
  // Determine current active index for completed line styles
  const activeIndex = steps.findIndex((step) => step.id === activeTab);

  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => {
        const isActive = step.id === activeTab;
        const isCompleted = completedSteps
          ? completedSteps.includes(step.id)
          : index < activeIndex;

        return (
          <React.Fragment key={step.id}>
            <button
              className={styles.stepButton}
              onClick={(e) => {
                e.preventDefault();
                if (activeTab === "verification") {
                  toast.warning(
                    "Your KYC is already submitted. You cannot go back to edit details.",
                  );
                  return;
                }

                if (index <= activeIndex || isCompleted) {
                  setActiveTab(step.id);
                } else {
                  toast.warning(
                    "Please save the current step to proceed forward.",
                  );
                }
              }}
            >
              <div
                className={`${styles.stepCircle} ${
                  isActive ? styles.circleActive : ""
                } ${isCompleted ? styles.circleCompleted : ""}`}
              >
                {isCompleted ? <FaCheck /> : index + 1}
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
                    isCompleted
                      ? styles.lineFull
                      : isActive
                        ? styles.lineHalf
                        : ""
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
