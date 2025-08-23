import React from 'react';
import HomeLoanForm from './components/HomeLoan-Form/HomeLoanForm';
import HowItWorks from './components/HowItWork/HowItWork';
import BankPartners from './components/BankPartners/BankPartners';
import PreApprovedLoan from './components/PreApprovedLone/PreApprovedLone';
import PersonalizedDeals from './components/PersonalizedDeals/PersonalizedDeals';
import LoanEnquiry from './components/LoanEnquiry/LoanEnquiry';
const page = () => {
  return (
    <div>
        <HomeLoanForm/>
        <HowItWorks/>
        <BankPartners/>
        <PreApprovedLoan/>
        <PersonalizedDeals/>
        <LoanEnquiry/>
    </div>
  );
}

export default page;
