'use client';

import React from 'react';
import { useRouter } from "next/navigation";

const Location = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/auth/post-property/property-profile');
  };

  return (
    <div>
      Location
      <button  onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default Location;
