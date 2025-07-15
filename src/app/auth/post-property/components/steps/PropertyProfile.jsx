

'use client';

import React from 'react';
import { useRouter } from "next/navigation";

const PropertyProfile = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/auth/post-property/photodetails');
  };

  return (
    <div>
      PropertyProfile
      <button  onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default PropertyProfile;
