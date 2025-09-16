// import React from 'react';
// import CompanyBg from '../components/company-bg/company-bg';
// import PrivacyPolicy from './components/Privacy-Policy';
// const Privacypage = () => {
//   return (
//     <div>
//       <CompanyBg/>
//       <PrivacyPolicy />
//     </div>
//   );
// }

// export default Privacypage;

import React from 'react';
import CompanyBg from '../components/company-bg/company-bg';
import PrivacyPolicy from './components/Privacy-Policy';
import { get, getssr } from '@/lib/api';

async function getPrivacyPolicyData() {
  try {
    const response = await getssr(`/api/get-pages-by-id?slug=privacy-policy`);
    return response.data; // Axios response format
    
  } catch (error) {
    console.error("API ERROR:", error.message, error.response?.data);
    return null; // Handle gracefully
  }
}

export default async function Privacypage() {
  const policyData = await getPrivacyPolicyData();

  if (!policyData) {
    return (
      <div className="text-red-500 text-center mt-10">
        Data could not be loaded. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <CompanyBg imageUrl={policyData.data?.featured_image_url} />
      <PrivacyPolicy policy={policyData.data} />
    </div>
  );
}
