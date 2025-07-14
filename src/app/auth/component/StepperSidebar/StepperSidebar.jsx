import React from 'react';
import styles from './StepperSidebar.module.css';

const steps = [
  'Basic Details',
  'Location Details',
  'Property Profile',
  'Photos, Videos & Voice-over',
  'Amenities section',
];

export default function StepperSidebar({ currentStep = 0 }) {
  return (
    <div className={styles.sidebar}>
      {steps.map((step, index) => (
        <div
          className={`${styles.step} ${index === currentStep ? styles.activeStep : ''}`}
          key={index}
        >
          <div
            className={`${styles.stepCircle} ${index === currentStep ? styles.activeCircle : ''}`}
          ></div>
          {index < steps.length - 1 && <div className={styles.stepLine}></div>}
          <div>
            <p className={styles.stepTitle}>{step}</p>
            <p className={styles.stepSub}>Step {index + 1}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
