
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
  return <StepComponent step={step} />;
}