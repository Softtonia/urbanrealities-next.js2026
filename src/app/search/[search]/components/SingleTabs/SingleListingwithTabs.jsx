"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./SingleListingwithTabs.module.css";
import SingleList from "../SingleCard/SingleList";
import SingleTabs from "./SingleTabs";
import DeveloperList from "@/app/developer-detail/components/DeveloperCard/DeveloperList";
import { useCity } from "@/utils/CityContext";

function getPagination(currentPage, totalPages, maxVisible = 6) {
  const pages = [];

  if (totalPages <= maxVisible) {
    // Total pages are less than visible ones
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (start <= 2) {
    start = 1;
    end = maxVisible;
  }

  if (end >= totalPages - 1) {
    start = totalPages - (maxVisible - 1);
    end = totalPages;
  }

  if (start > 1) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    pages.push("...");
  }

  return pages;
}

const SingleListingWithTab = ({ searchResults }) => {
  const {city} = useCity()
  const dataByTab = {
    "Properties": searchResults.properties || [],
    "New Project": searchResults.projects || [],
    "Top Agent": searchResults.agents || [],
  };
  console.log('=>',searchResults)

  // const totalProperties = Array(96).fill(1); // Dummy 24 cards
  const cardsPerPage = 4;
  const [activeTab, setActiveTab] = useState("Properties");
  const [currentPage, setCurrentPage] = useState(1);
  const totalProperties = dataByTab[activeTab] || [];
  const totalPages = Math.ceil(totalProperties.length / cardsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const pageNumbers = getPagination(currentPage, totalPages, 6);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  return (
    <div>
      <div className={styles.listing}>
        <h2> {activeTab} in {city && city.name}</h2>
        <SingleTabs activeTab={activeTab} setActiveTab={setActiveTab} searchResults={searchResults}/>

        {/* Property list + Loader wrapper */}
        <div className={styles.propertyListWrapper}>
          {isLoading ? (
            <div className={styles.loader}>Loading properties...</div>
          ) : (
            <>
              {activeTab === "Properties" && (
                <SingleList
                  currentPage={currentPage}
                  cardsPerPage={cardsPerPage}
                  totalProperties={
                    dataByTab["Properties"]
                    //  searchResults
                  }
                />
              )}

              {activeTab === "New Project" && (
                <DeveloperList
                  currentPage={currentPage}
                  cardsPerPage={cardsPerPage}
                  totalProperties={dataByTab["New Project"]}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Pagination ke buttons — YAHIN LIST KE BAAD HONGE */}
      <div className={styles.pagination}>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            disabled={page === "..."}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ""
              }`}
            onClick={() => page !== "..." && setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SingleListingWithTab;
