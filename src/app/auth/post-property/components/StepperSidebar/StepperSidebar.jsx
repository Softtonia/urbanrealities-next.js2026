"use client";

import React from "react";
import styles from "./StepperSidebar.module.css";

const steps = [
  { title: "Basic Details", step: 1, path: "basic-details" },
  { title: "Location Details", step: 2, path: "location-details" },
  { title: "Property Profile", step: 3, path: "property-profile" },
  { title: "Photos, Videos & Voice-over", step: 4, path: "photodetails" },
  { title: "Property Price ", step: 5, path: "featurepricing" },
  { title: "Amenities section", step: 6, path: "amenities" },
];

export default function StepperSidebar({ currentStep = "basic-details" }) {
  const currentStepIndex = steps.findIndex((s) => s.path === currentStep);
const activeStep = steps[currentStepIndex];
  return (
    <>
    <div className={styles.sidebar}>
      {steps.map((step, index) => {
        const isActive = step.path === currentStep;
        const isCompleted = index < currentStepIndex;
        const isLineFilled = index < currentStepIndex || isActive;

        return (
          <div
            className={`${styles.step} ${isActive ? styles.activeStep : ""}`}
            key={step.path}
          >
            <div
              className={`${styles.stepCircle} ${
                isActive ? styles.activeCircle : ""
              } ${isCompleted ? styles.completedCircle : ""}`}
            ></div>

            {index < steps.length - 1 && (
              <div className={styles.stepLine}>
                <div
                  className={`${styles.stepLineFilled} ${
                    isLineFilled ? styles.full : ""
                  }`}
                ></div>
              </div>
            )}

            <div className={styles.stepcontent}>
              <p className={styles.stepTitle}>{step.title}</p>
              <p className={styles.stepSub}>Step {step.step}</p>
            </div>
          </div>
        );
      })}
    </div>
      <div className={styles.mobileActiveStepTitle}>{activeStep?.title}</div>
      </>
  );
}
