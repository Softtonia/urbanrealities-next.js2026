// "use client";
// import { useParams } from "next/navigation";
// import Step1 from "../components/steps/Basic-DetailsSteps";
// import Step2 from "../components/steps/Location";
// import Step3 from "../components/steps/PropertyProfile";
// import Step4 from "../components/steps/photo-details/photodetails";
// import Step5 from "../components/steps/featurepricing";

// import StepSidebar from "../components/StepperSidebar/StepperSidebar";
// import styles from "../components/post-property.module.css";

// export default function StepPage() {
//   const params = useParams();
//   const setStep = params.step || "basic-details";
//   const renderStepContent = () => {
//     switch (setStep) {
//       case "basic-details":
//         return <Step1 />;
//       case "location-details":
//         return <Step2 />;
//       case "property-profile":
//         return <Step3 />;
//       case "photodetails":
//         return <Step4 />;
//       case "featurepricing":
//         return <Step5 />;

//       default:
//         return <div>Step not found</div>;
//     }
//   };
  

//   return (
//     <div className="container">
//    <div className={`${styles.wrapper} row`}>
//       <div className="col-3 p-0">
//       <div className={styles.sidebarCol}>
//         <StepSidebar currentStep={setStep} />
//         </div>
//       </div>
//       <div className="col-9 p-0 ">
//         <div className={styles.mainContent}>{renderStepContent()}</div>
//       </div>
//     </div>
//     </div>
//   );
// }

// This is a server component
export async function generateStaticParams() {
  return [
    { step: 'basic-details' },
    { step: 'location-details' },
    { step: 'property-profile' },
    { step: 'photodetails' },
    { step: 'featurepricing' }
  ];
}

import StepComponent from './genratestep';

export default function Page({ params }) {
  return <StepComponent step={params.step} />;
}
