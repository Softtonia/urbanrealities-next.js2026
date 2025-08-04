'use client';
import React, { useState, useEffect } from 'react';
import styles from '../components/My-Account-Dashboard.module.css';
import MyAccountAnalytics from './components/My-Account-Analytics';

const MyAccount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const dummyProperties = Array.from({ length: 96 }, (_, i) => ({
    id: `47852569-${i}`,
    companyName: "Ganesh Property pvt ltd.",
    location: "Ernakulam, Kerala",
    price: "₹ 3 Crore",
    image: "/insight-card.png",
    stats: {
      impression: 741,
      views: 741,
      email: 741,
      percentage: 78,
    },
    createdAt: "2024-01-24T00:24:00",
    expiresAt: "2025-06-14T12:24:00",
  }));

  const totalPages = Math.ceil(dummyProperties.length / itemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);
    }
  };

  const paginatedData = dummyProperties.slice(
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
          <div className={styles.insightcard}>
              {paginatedData.map((prop) => (
                <MyAccountAnalytics key={prop.id} data={prop} />
              ))}
          </div>

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

export default MyAccount;
