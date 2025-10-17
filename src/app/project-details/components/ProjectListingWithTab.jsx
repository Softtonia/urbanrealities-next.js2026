'use client';

import React, { useState } from "react";
import { useEffect } from 'react';
import styles from './ProjectListingWithTab.module.css';
import ProjectList from "./ProjectList";
import PropertyTabs from "./PropertyTabs";
import { useProject } from "../context/ProjectContext";
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


const ProjectListingWithTab = ({projects, heading, isLoading}) => {
  // const { project } = useProject();
  console.log(projects)
  // const totalProperties = Array(96).fill(1); // Dummy 24 cards
  const cardsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects?.length / cardsPerPage);
  const pageNumbers = getPagination(currentPage, totalPages, 6);

  // Slice projects for current page
  const currentProjects = projects?.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );
  // if(!(currentProjects?.length>0)) return null

  return (
    <div>
      <div className={styles.listing}>
        <h2>{heading}</h2>
        {/* Property list + Loader wrapper */}
        <div className={styles.propertyListWrapper}>
          {isLoading ? (
            <div className={styles.loader}>Loading properties...</div>
          ) : (
            <DeveloperList
              currentPage={currentPage}
              cardsPerPage={cardsPerPage}
              totalProperties={currentProjects}
            />

          )}
        </div>
      </div>

      {/* Pagination ke buttons — YAHIN LIST KE BAAD HONGE */}
      <div className={styles.pagination}>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            disabled={page === "..."}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
            onClick={() => page !== "..." && setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

      </div>

    </div>
  );
};

export default ProjectListingWithTab;
