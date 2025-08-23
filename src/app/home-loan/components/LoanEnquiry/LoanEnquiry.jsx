"use client";
import React from "react";
import styles from "./LoanEnquiry.module.css";
import FAQAccordion from "./../../../../Components/FAQAccordion/FAQAccordion";
export default function LoanEnquiry() {
  const faqs = [
    "What are the different types of home loans available?",
    "What are the factors you should know before applying for a home loan?",
    "What are the different types of home loan fees and charges?",
    "How does Credit score impact your interest rate?",
    "What's the benefit of having a female co-applicant?",
    "How can I improve my Credit score?",
    "What is pre-EMI interest?",
    "What is the meaning of the Moratorium Period in Home Loans?",
    "What is Pradhan Mantri Awas Yojana?",
  ];

  return (
    <section className={styles.nextSection}>
      <div className="container p-0">
        <div className={styles.sectionContent}>
          <div className={styles.imageWrapper}>
            <img
              src="/faq-img.png" // Replace with your image path
              alt="FAQ Illustration"
              className={styles.image}
            />
          </div>
          <div className={styles.faqWrapper}>
                 <FAQAccordion
              heading="Home Loan FAQs"
              faqData={[
                  "What are the different types of home loans available?",
                  "What are the factors you should know before applying for a home loan?",
                  "What are the different types of home loan fees and charges?",
                  "How does Credit score impact your interest rate?",
                  "What's the benefit of having a female co-applicant?",
                  "How can I improve my Credit score?",
                  "What is pre-EMI interest?",
                  "What is the meaning of the Moratorium Period in Home Loans?",
                  "What is Pradhan Mantri Awas Yojana?",
                ]}
                />
                </div>
        </div>
      </div>
    </section>
  );
}
