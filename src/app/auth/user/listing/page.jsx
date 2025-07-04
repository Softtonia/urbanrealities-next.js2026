'use client';
import React, { useState, useEffect } from 'react';
import styles from '../components/My-Account-Dashboard.module.css'; // same layout CSS
import MyAccountListing from './components/My-Account-listing';

const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const dummyListings = Array.from({ length: 30 }, (_, i) => ({
    id: `listing-${i}`,
    imageUrl: '/image-card.png',
    price: `₹ ${3 + i} Crore`,
    bhk: `${2 + (i % 3)} BHK`,
    type: 'Apartment',
    size: `${1500 + i * 10} sqft`,
    location: 'Bangalore, Karnataka',
    projectName: 'Dream Towers',
    availableFor: 'Sale',
    carpetArea: `${1200 + i * 5} sqft`,
  }));

  const totalPages = Math.ceil(dummyListings.length / itemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);
    }
  };

  const paginatedListings = dummyListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {loading ? (
        <div className={styles.loaderWrapper}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
            <section className={styles.listingcard}>
              {paginatedListings.map((listing) => (
                <MyAccountListing key={listing.id} data={listing} />
              ))}
            </section>

          <nav className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {Array.from({ length: 5 }, (_, index) => {
              const pageNumber =
                Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;

              if (pageNumber > totalPages) return null;

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={
                    currentPage === pageNumber ? styles.activePage : ""
                  }
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </nav>
        </>
      )}
    </>
  );
};

export default ListingPage;
