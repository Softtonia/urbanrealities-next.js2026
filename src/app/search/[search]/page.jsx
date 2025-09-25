"use client";

// /app/search/page.jsx
// /app/search/[slug]/page.jsx

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { parseSlug, validateSlug } from "@/utils/seoSlug";
import React, { useEffect, useMemo, useState } from "react";
import PropertyFilters from "@/Components/PropertyFilters/filtertabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import SingleListingWithTab from "./components/SingleTabs/SingleListingwithTabs";
import styles from "./components/SingleTabs/SingleTabs.module.css";
import SearchAgentCard from "./components/SearchAgentCard/SearchAgentCard";
import FAQAccordion from "@/Components/FAQAccordion/FAQAccordion";
import CompanyAgent from "./components/CompanyAgent/CompanyAgent";
import { useCity } from "@/utils/CityContext";
import { useSearch } from "@/hooks/useSearch";


export default function OuterPage() {
  const { city } = useCity();
  const router = useRouter();
  const {payload,debouncedFilters,searchResults}= useSearch({ autoPush: false })
  const params = useParams();
  // const [searchResults,setSearchResults] =useState();
  const searchParams = useSearchParams();

  const searchParam = params?.search;
  const slugString = Array.isArray(searchParam)
    ? searchParam.join("-")
    : searchParam;

  const filters = []


  // const { valid, filters } = validateSlug(slugString);
  // console.log("Slug check:", slugString);

  // useEffect(() => {
  //   if (!valid) {
  //     // router.push("/not-found");
  //   }
  // }, [valid, router]);

  // ✅ Extract query params → payload
  // const payload = useMemo(() => {
  //   if (!searchParams) return null;

  //   // Get values from query string
  //   const location = searchParams.get("location") || "";
  //   const purpose = searchParams.get("purpose") || "";
  //   const minPrice = searchParams.get("minPrice") || "";
  //   const maxPrice = searchParams.get("maxPrice") || "";
  //   const propertyId = searchParams.get("propertyId") || "";
  //   const types = searchParams.get("propertyType") || [];

  //   // Convert prices → numeric (strip ₹, commas, words like "Lac/Cr")
  //   const normalizePrice = (price) => {
  //     if (!price) return "";
  //     let num = price.replace(/[^\d]/g, ""); // keep only digits
  //     return parseInt(num, 10) || "";
  //   };

  //   return {
  //     purpose: purpose, // fixed
  //     property_id: propertyId.length ? propertyId : '', // static or dynamic?
  //     property_type_id: types.length ? types : "", // take first type or join if needed
  //     property_status_id: '', // static?
  //     property_price_low: normalizePrice(minPrice),
  //     property_price_high: normalizePrice(maxPrice),
  //     keyword:'', // using location as keyword
  //     country_id: city ? city.country_id : '',
  //     state_id: city ? city.state_id : "",
  //     city_id: city ? city.id : "",
  //   };
  // }, [searchParams, city]);

 




  // if (!valid) return null;
  console.log("Search Response →", searchResults);
  return (
    <div>
      <PropertyFilters initialFilters={debouncedFilters}  />
      <div className="container">
        <div className={`row ${styles["tab-row"]}`}>
          <div className={`col-lg-9 col-12 ${styles["listing-col"]}`}>
            <SingleListingWithTab filters={filters} searchResults={searchResults} />
          </div>
          <div className={`col-lg-3 col-12 ${styles["search-col"]}`}>
            <SearchAgentCard />
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
