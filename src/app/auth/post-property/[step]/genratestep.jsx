
import Step1 from "../components/steps/Basic-DetailsSteps";
import Step2 from "../components/steps/Location";
import Step3 from "../components/steps/PropertyProfile";
import Step4 from "../components/steps/photo-details/photodetails";
import Step5 from "../components/steps/featurepricing";
import StepSidebar from "../components/StepperSidebar/StepperSidebar";
import styles from "../components/post-property.module.css";
import { get } from "@/lib/api";

async function fetchPurpose() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/purpose-listing`);
    const data = response;
    console.log("==>",data)
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching purpose:", err);
    return [];
  }
}

async function fetchProperties() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/property-listing`);
    const data = response.data;
    // console.log("==>",data)
    if (data) return data;
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching properties:", err);
    return [];
  }
}

export default async function StepComponent({ step }) {
  const purposeList = await fetchPurpose()
  const propertyListing = await fetchProperties()

  const currentStep = step || "basic-details";

  const renderStepContent = () => {
    switch (currentStep) {
      case "basic-details":
        return <Step1 purposeList={purposeList} propertyListing={propertyListing}/>;
      case "location-details":
        return <Step2 />;
      case "property-profile":
        return <Step3 />;
      case "photodetails":
        return <Step4 />;
      case "featurepricing":
        return <Step5 />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="container">
      <div className={`${styles.wrapper} row`}>
        <div className="col-3 p-0">
          <div className={styles.sidebarCol}>
            <StepSidebar currentStep={currentStep} />
          </div>
        </div>
        <div className="col-9 p-0">
          <div className={styles.mainContent}>{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
}