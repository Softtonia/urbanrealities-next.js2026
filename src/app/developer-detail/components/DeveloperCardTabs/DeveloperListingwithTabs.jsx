"use client";
import React, { useEffect, useState } from "react";
import styles from "./DeveloperListingwithTabs.module.css";
import DeveloperList from "../DeveloperCard/DeveloperList";

// Helper for showing pagination numbers dynamically
function getPagination(currentPage, totalPages, maxVisible = 6) {
  const pages = [];
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
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

  if (start > 1) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages) pages.push("...");
  return pages;
}

const DeveloperListingwithTabs = ({
  DevHeading,
  Projects = [],
  isLoading,
  meta = {},
  currentPage,
  onPageChange,
}) => {
  const totalPages = meta?.last_page || 1;
  const pageNumbers = getPagination(currentPage, totalPages, 6);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };




  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.listing}>
      <h2>{DevHeading}</h2>

      <div className={styles.propertyListWrapper}>
        {isLoading ? (
          <div className={styles.loader}>Loading projects...</div>
        ) : Projects.length > 0 ? (
          <DeveloperList totalProperties={Projects} />
        ) : (
          <div className={styles.noProjects}>No projects found yet.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`${styles.pageButton} ${styles.prevNext}`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              disabled={page === "..."}
              className={`${styles.pageButton} ${currentPage === page ? styles.active : ""
                }`}
              onClick={() => page !== "..." && onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`${styles.pageButton} ${styles.prevNext}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DeveloperListingwithTabs;
