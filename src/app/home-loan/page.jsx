import React from 'react';
import HomeLoanForm from './components/HomeLoan-Form/HomeLoanForm';
import HowItWorks from './components/HowItWork/HowItWork';
import BankPartners from './components/BankPartners/BankPartners';
const page = () => {
  return (
    <div>
        <HomeLoanForm/>
        <HowItWorks/>
        <BankPartners/>
    </div>
  );
}

export default page;
