"use client";

// /app/search/page.jsx
// /app/search/[slug]/page.jsx

import { useParams, useRouter } from "next/navigation";
import { parseSlug, validateSlug } from "@/utils/seoSlug";
import React, { useEffect } from "react";
import PropertyFilters from "@/Components/PropertyFilters/filtertabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import SingleListingWithTab from "./components/SingleTabs/SingleListingwithTabs";
import styles from "./components/SingleTabs/SingleTabs.module.css";
import SearchAgentCard from "./components/SearchAgentCard/SearchAgentCard";
import FAQAccordion from "@/Components/FAQAccordion/FAQAccordion";
import CompanyAgent from "./components/CompanyAgent/CompanyAgent";

export default function OuterPage() {
  const router = useRouter();
  const params = useParams();

  const searchParam = params?.search;
  const slugString = Array.isArray(searchParam)
    ? searchParam.join("-")
    : searchParam;

  const { valid, filters } = validateSlug(slugString);
  console.log("Slug check:", slugString, valid, filters);
  useEffect(() => {
    if (!valid) {
      // router.push("/not-found"); // ✅ runs only in browser
    }
  }, [valid, router]);

  // if (!valid) {
  //   return null; // prevent rendering until redirect finishes
  // }

  return (
    <div>
      <PropertyFilters initialFilters={filters} />
      <div className="container">
        <div className={`row ${styles["tab-row"]}`}>
          <div className={`col-lg-9 col-12 ${styles["listing-col"]}`}>
            <SingleListingWithTab filters={filters} />
          </div>
          <div className={`col-lg-3 col-12 ${styles["search-col"]}`}>
            <SearchAgentCard />
          </div>
          <div className={`col-lg-9 col-12 ${styles["faq-col"]}`}>
            <FAQAccordion
              className={styles.FAQAccordion}
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
            <CompanyAgent/>
          </div>
        </div>
      </div>
    </div>
  );
}
