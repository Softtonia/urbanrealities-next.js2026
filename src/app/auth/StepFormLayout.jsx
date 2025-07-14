import React from 'react';
import StepperSidebar from './component/StepperSidebar/StepperSidebar';
// import BasicDetailsSteps from './primary-details/components/Basic-DetailsSteps';
import styles from './StepFormLayout.module.css';

export default function StepFormLayout() {
  return (
    <div className={styles.wrapper}>
      <StepperSidebar currentStep={0} />
      {/* < BasicDetailsSteps/> */}
    </div>
  );
}
