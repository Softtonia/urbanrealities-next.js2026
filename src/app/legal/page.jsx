// 'use client';
// import React from 'react';
// import CompanyBg from '../components/company-bg/company-bg';
// import LegalPage from './components/legal';

// const legalpage = () => {
//   return (
//     <div>
//       <CompanyBg/>
//      <LegalPage/>
//     </div>
//   );
// }

// export default legalpage;




import React from 'react';
import CompanyBg from '../components/company-bg/company-bg';
import LegalPage from './components/legal';

import { get } from '@/lib/api';

async function getlegalpageData() {
  try {
    const response = await get(`/api/get-pages-by-id?slug=legal`);
    return response.data; // Axios response format
    
  } catch (error) {
    console.error("API ERROR:", error.message, error.response?.data);
    return null; // Handle gracefully
  }
}

export default async function legalpage() {
  const legalData = await getlegalpageData();

  if (!legalData) {
    return (
      <div className="text-red-500 text-center mt-10">
        Data could not be loaded. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <CompanyBg />
      <LegalPage legal={legalData.data} />
    </div>
  );
}
