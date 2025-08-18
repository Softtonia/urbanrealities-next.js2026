
import StepComponent from './genratestep';

export async function generateStaticParams() {
  return [
    { step: 'basic-details' },
    { step: 'location-details' },
    { step: 'property-profile' },
    { step: 'photodetails' },
    { step: 'featurepricing' }
  ];
}

export default async function Page({ params }) {

  const { step } = await params;

  let serverData = {};
  if (step === "basic-details") {
    

  }
  return <StepComponent step={step} />;
}