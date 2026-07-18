"use client";

import React, { useState, useEffect } from "react";
import styles from "./StepperSidebar.module.css";
import { getDynamicPostStepForm } from "@/services/post-property.service";

// removed default steps

export default function StepperSidebar({ currentStep, apiSteps = [] }) {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (apiSteps && apiSteps.length > 0) {
      const newSteps = apiSteps.map((apiStep, index) => {
        return {
          title: apiStep.step_label || apiStep.step_key,
          step: index + 1,
          path: apiStep.step_key // strictly mapped to step_key
        };
      });
      setSteps(newSteps);
    }
  }, [apiSteps]);

  const currentStepIndex = steps.findIndex((s) => s.path === currentStep);
  const activeStep = steps[currentStepIndex];

  const progressPercentage =
    currentStepIndex > 0
      ? (currentStepIndex / (steps.length - 1)) * 100
      : 0;

  return (
    <>
    <div className={styles.sidebar}
    style={{ "--progress": `${progressPercentage}%` }}
     >
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
      <div className={styles.mobileActiveStepTitle}><p className="m-0">Step - {activeStep?.step}</p>{activeStep?.title}</div>
      </>
  );
}
