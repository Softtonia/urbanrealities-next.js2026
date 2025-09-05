// import React from "react";
// import PropertyFilters from "@/Components/PropertyFilters/filtertabs";
// import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
// import SingleListingWithTab from "./components/SingleTabs/SingleListingwithTabs";
// import styles from "./components/SingleTabs/SingleTabs.module.css";
// import SearchAgentCard from "./components/SearchAgentCard/SearchAgentCard"
// import FAQAccordion from "@/Components/FAQAccordion/FAQAccordion";
// const outerpage = () => {
//   return (
//     <div>
//       <PropertyFilters />
//       <div className="container">
//         <div className={`row ${styles['tab-row']}`}>

// <div className={`col-lg-9 col-12 ${styles["listing-col"]}`}>
//   <SingleListingWithTab />
// </div>

// <div className={`col-lg-3 col-12 ${styles["search-col"]}`}>
//   <SearchAgentCard />
// </div>

// <div className={`col-lg-9 col-12 ${styles["faq-col"]}`}>
//   <ProjectFAQ className={styles.ProjectFAQ}/>
//        <FAQAccordion
//        className={styles.FAQAccordion}
       
//               heading="Home Loan FAQs"
//               faqData={[
//                   "What are the different types of home loans available?",
//                   "What are the factors you should know before applying for a home loan?",
//                   "What are the different types of home loan fees and charges?",
//                   "How does Credit score impact your interest rate?",
//                   "What's the benefit of having a female co-applicant?",
//                   "How can I improve my Credit score?",
//                   "What is pre-EMI interest?",
//                   "What is the meaning of the Moratorium Period in Home Loans?",
//                   "What is Pradhan Mantri Awas Yojana?",
//                 ]}
//                 />
// </div>



//         </div>
//       </div>
//     </div>
//   );
// };

// export default outerpage;


// /app/search/page.jsx
// /app/search/[slug]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { parseSlug } from "@/utils/seoSlug";

import React from "react";
import PropertyFilters from "@/Components/PropertyFilters/filtertabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import SingleListingWithTab from "./components/SingleTabs/SingleListingwithTabs";
import styles from "./components/SingleTabs/SingleTabs.module.css";
import SearchAgentCard from "./components/SearchAgentCard/SearchAgentCard";
import FAQAccordion from "@/Components/FAQAccordion/FAQAccordion";

export default function OuterPage() {
const { search } = useParams();
const slugString = Array.isArray(search) ? search.join("-") : search;
const filters = parseSlug(slugString);

  return (
    <div>
      {/* 👉 Filters ko pass karo so UI ko pata ho kya selected hai */}
      <PropertyFilters initialFilters={filters} />

      <div className="container">
        <div className={`row ${styles["tab-row"]}`}>
          <div className={`col-lg-9 col-12 ${styles["listing-col"]}`}>
            {/* 👉 Yahi pe cards list component ko filters do */}
            <SingleListingWithTab filters={filters} />
          </div>

          <div className={`col-lg-3 col-12 ${styles["search-col"]}`}>
            <SearchAgentCard />
          </div>

          <div className={`col-lg-9 col-12 ${styles["faq-col"]}`}>
            <ProjectFAQ className={styles.ProjectFAQ} />

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
          </div>
        </div>
      </div>
    </div>
  );
}
