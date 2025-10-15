'use client';

import React, { useState } from "react";
import { useEffect } from 'react';
import styles from './DeveloperListingwithTabs.module.css';
import DeveloperList from "../DeveloperCard/DeveloperList"
import DeveloperCardTabs from "./DeveloperCardTabs";
import { useDeveloper } from "../../context/DeveloperContext";

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


const SingleListingWithTab = ({DevHeading="Ongoing Project",listingFor="ongoing"}) => {
  const {ongoingProjects,completedProjects} = useDeveloper();
  const [listing,setListing] = useState([]);

useEffect(() => {
    if (listingFor === "ongoing") {
      setListing(ongoingProjects || []);
    }else if (listingFor === "completed") {
      setListing(completedProjects || []);
    }else {
      setListing([]);
    }
  }, [listingFor]);

  console.log("listingFor", listing);

  const totalProperties = Array(96).fill(1); // Dummy 24 cards
  const cardsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(listing.length / cardsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const pageNumbers = getPagination(currentPage, totalPages, 6);

  
  console.log("ongoingProjects", listing)


  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  // if(!listing.length()>0) return null


  return (
    <div>
    <div className={styles.listing}>
      <h2>{DevHeading}</h2>
      {/* <DeveloperCardTabs /> */}

        {/* Property list + Loader wrapper */}
        <div className={styles.propertyListWrapper}>
          {isLoading ? (
            <div className={styles.loader}>Loading properties...</div>
          ) : (
            <DeveloperList
              currentPage={currentPage}
              cardsPerPage={cardsPerPage}
              totalProperties={listing}
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

export default SingleListingWithTab;
