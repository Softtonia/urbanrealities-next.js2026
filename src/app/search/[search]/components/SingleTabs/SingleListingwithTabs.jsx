"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./SingleListingwithTabs.module.css";
import SingleList from "../SingleCard/SingleList";
import SingleTabs from "./SingleTabs";
import DeveloperList from "@/app/developer-detail/components/DeveloperCard/DeveloperList";

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

const SingleListingWithTab = () => {
  const dataByTab = {
    "Properties (count)": Array(8).fill({ name: "Property Card" }),
    "New Project": Array(5).fill({ name: "Developer Project" }),
    "Top Agent": Array(3).fill({ name: "Agent Profile" }),
  };

  // const totalProperties = Array(96).fill(1); // Dummy 24 cards
  const cardsPerPage = 4;
  const [activeTab, setActiveTab] = useState("Properties (count)");
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
        <h2> {activeTab}Properties in Mundeshwari Connaught One</h2>
        <SingleTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Property list + Loader wrapper */}
        <div className={styles.propertyListWrapper}>
          {isLoading ? (
            <div className={styles.loader}>Loading properties...</div>
          ) : (
            <>
              {activeTab === "Properties (count)" && (
                <SingleList
                  currentPage={currentPage}
                  cardsPerPage={cardsPerPage}
                  totalProperties={dataByTab["Properties (count)"]}
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
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ""
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
