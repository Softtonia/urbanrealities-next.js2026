import React from 'react';
import HomeLoanForm from './components/HomeLoan-Form/HomeLoanForm';
import HowItWorks from './components/HowItWork/HowItWork';
import BankPartners from './components/BankPartners/BankPartners';
import PreApprovedLoan from './components/PreApprovedLone/PreApprovedLone';
import PersonalizedDeals from './components/PersonalizedDeals/PersonalizedDeals';
import LoanEnquiry from './components/LoanEnquiry/LoanEnquiry';
import HomeLoanEMI from './components/HomeLoanEMI/HomeLoanEMI';
import ContactUs from './components/ContactUs/ContactUs';
import UserReviews from './components/UserReviews/UserReviews';
import HomeLoanArticles from './components/HomeLoanArticles/HomeLoanArticles';
import HomeLoanCalculator from '@/Components/HomeLoanEMICalculator/HomeLoanEMICalculator';
const page = () => {
  return (
    <div>
        <HomeLoanForm/>
        <HowItWorks/>
        <BankPartners/>
        <PreApprovedLoan/>
        <PersonalizedDeals/>
        <LoanEnquiry/>
        <HomeLoanEMI/>
        <ContactUs/>
        <UserReviews/>
        <HomeLoanArticles/>
        <HomeLoanCalculator/>
    </div>
  );
}

export default page;
