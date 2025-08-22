import React from 'react';
import HomeLoanForm from './components/HomeLoan-Form/HomeLoanForm';
import HowItWorks from './components/HowItWork/HowItWork';
import BankPartners from './components/BankPartners/BankPartners';
import PreApprovedLoan from './components/PreApprovedLone/PreApprovedLone';
const page = () => {
  return (
    <div>
        <HomeLoanForm/>
        <HowItWorks/>
        <BankPartners/>
        <PreApprovedLoan/>
    </div>
  );
}

export default page;
