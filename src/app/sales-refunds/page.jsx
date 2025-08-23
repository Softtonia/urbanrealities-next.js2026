// 'use client';

// import React from 'react';
// import CompanyBg from '../components/company-bg/company-bg';
// import SalesRefund from './components/SalesRefund';

// const Salespage = () => {
//   return (
//     <div>
//       <CompanyBg/>
//       <SalesRefund/>
//     </div>
//   );
// }

// export default Salespage;



import React from 'react';
import CompanyBg from '../components/company-bg/company-bg';
import SalesRefund from './components/SalesRefund';
import { get } from '@/lib/api';

async function getSalesRefundData() {
  try {
    const response = await get(`/api/get-pages-by-id?slug=sales-and-refunds`);
    return response.data; // Axios response format
    
  } catch (error) {
    console.error("API ERROR:", error.message, error.response?.data);
    return null; // Handle gracefully
  }
}

export default async function SalesRefundpage() {
  const SaleData = await getSalesRefundData();

  if (!SaleData) {
    return (
      <div className="text-red-500 text-center mt-10">
        Data could not be loaded. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <CompanyBg imageUrl={SaleData.data?.featured_image_url} />
      <SalesRefund salerefund={SaleData.data} />
    </div>
  );
}
