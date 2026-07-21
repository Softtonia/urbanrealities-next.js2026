
import StepSidebar from "../components/StepperSidebar/StepperSidebar";
import styles from "../components/post-property.module.css";
import { get, getssr } from "@/lib/api";
import DynamicStep from "../components/DynamicStep/DynamicStep";

async function fetchPurpose() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await getssr(`/api/purpose-listing`);
    const data = response;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching purpose:", err);
    return [];
  }
}

async function fetchProperties() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await getssr(`/api/property-listing`);
    const data = response.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching property listing:", err);
    return [];
  }
}

async function fetchDynamicSteps() {
  try {
    const res = await getssr(`/api/frontend/dynamic-post-step-form/1`);
    // res is already the JSON payload: { status: true, data: { steps: [] } }
    if (res?.status === true && res?.data?.steps) {
      return res.data.steps;
    }
    return [];
  } catch (err) {
    console.error("Error fetching dynamic steps:", err);
    return [];
  }
}

export default async function StepComponent({ step }) {
  const apiSteps = await fetchDynamicSteps();
  const currentStep = step || (apiSteps.length > 0 ? apiSteps[0].step_key : "step-1");
  
  // Match current step strictly by api step_key
  const stepIndex = apiSteps.findIndex(s => s.step_key === currentStep);
  const activeApiStep = stepIndex >= 0 ? apiSteps[stepIndex] : apiSteps[0];

  const renderStepContent = () => {
    if (!activeApiStep) return <div>Step not found or loading...</div>;
    return (
      <DynamicStep 
        stepData={activeApiStep} 
        allSteps={apiSteps} 
        currentStepIndex={stepIndex >= 0 ? stepIndex : 0} 
      />
    );
  };

  return (
    <div className="container p-0">
      <div className={`${styles.wrapper} `}>
        {/* <div className="col-3 p-0"> */}
          <div className={styles.sidebarCol}>
            <StepSidebar currentStep={currentStep} apiSteps={apiSteps} />
          </div>
        {/* </div> */}
        {/* <div className="col-9 p-0"> */}
          <div className={styles.mainContent}>{renderStepContent()}</div>
        </div>
      {/* </div> */}
    </div>
  );
}
