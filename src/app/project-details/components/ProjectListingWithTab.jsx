'use client';
import React from "react";
import styles from './ProjectListingWithTab.module.css';
import DeveloperList from "@/app/developer-detail/components/DeveloperCard/DeveloperList";

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

const ProjectListingWithTab = ({ projects, heading, isLoading, pagination, onPageChange }) => {
  const { current_page, last_page } = pagination || {};
  const pageNumbers = getPagination(current_page, last_page, 6);

  if (!isLoading && (!projects || projects.length === 0)) {
    return (
      <div className={styles.listing}>
        <h2>{heading}</h2>
        <p className={styles.noProjectText}>No nearby projects found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.listing}>
        <h2>{heading}</h2>

        <div className={styles.propertyListWrapper}>
          {isLoading ? (
            <div className={styles.loader}>Loading Projects...</div>
          ) : (
            <DeveloperList totalProperties={projects} />
          )}
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && last_page > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => onPageChange(current_page - 1)}
            disabled={current_page === 1}
            className={styles.pageButton}
          >
            Prev
          </button>

          {pageNumbers.map((page, index) => (
            <button
              key={index}
              disabled={page === "..."}
              className={`${styles.pageButton} ${current_page === page ? styles.active : ""}`}
              onClick={() => page !== "..." && onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(current_page + 1)}
            disabled={current_page === last_page}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectListingWithTab;
