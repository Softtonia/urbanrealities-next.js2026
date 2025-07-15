

'use client';

import React from 'react';
import { useRouter } from "next/navigation";

const photodetails = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/auth/post-property/featurepricing');
  };

  return (
    <div>
      photodetails
      <button  onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default photodetails;
