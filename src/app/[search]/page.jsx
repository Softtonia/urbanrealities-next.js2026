import React from "react";
import PropertyFilters from "@/Components/PropertyFilters/filtertabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import SingleListingWithTab from "./components/SingleTabs/SingleListingwithTabs";
import styles from "./components/SingleTabs/SingleTabs.module.css";
import SearchAgentCard from "./components/SearchAgentCard/SearchAgentCard"
const outerpage = () => {
  return (
    <div>
      <PropertyFilters />
      <div className="container">
        <div className={`row ${styles['tab-row']}`}>

          <div className={`col-lg-9 col-12 ${styles["listing-col"]}`}>
            <SingleListingWithTab />
          </div>

          <div className={`col-lg-3 col-12 ${styles["search-col"]}`}>
            <SearchAgentCard />
          </div>

          <div className={`col-lg-9 col-12 ${styles["faq-col"]}`}>
            <ProjectFAQ />
          </div>



        </div>
      </div>
    </div>
  );
};

export default outerpage;
