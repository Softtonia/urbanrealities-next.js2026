
'use client';

import React from 'react';
import { useRouter } from "next/navigation";

const featurepricing = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/auth/post-property/featurepricing');
  };

  return (
    <div>
      featurepricing
      <button  onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default featurepricing;
