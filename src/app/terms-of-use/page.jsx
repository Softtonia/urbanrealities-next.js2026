// 'use client';
// import React from 'react';
// import CompanyBg from '../components/company-bg/company-bg';
// import TermsOfUse from './components/terms-of-use';

// const termspage = () => {
//   return (
//     <div>
//       <CompanyBg/>
//       <TermsOfUse/> 
//     </div>
//   );
// }

// export default termspage;



import React from 'react';
import CompanyBg from '../components/company-bg/company-bg';
import TermsOfUse from './components/terms-of-use';
import { get } from '@/lib/api';

async function getTermsOfUseData() {
  try {
    const response = await get(`/api/get-pages-by-id?slug=terms-of-use`);
    return response.data; // Axios response format
    
  } catch (error) {
    console.error("API ERROR:", error.message, error.response?.data);
    return null; // Handle gracefully
  }
}

export default async function Privacypage() {
  const UseTermData = await getTermsOfUseData();

  if (!UseTermData) {
    return (
      <div className="text-red-500 text-center mt-10">
        Data could not be loaded. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <CompanyBg imageUrl={UseTermData.data?.featured_image_url} />
      <TermsOfUse useterms={UseTermData.data} />
    </div>
  );
}
