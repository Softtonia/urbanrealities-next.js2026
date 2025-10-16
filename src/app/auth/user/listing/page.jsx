'use client';
import React, { useState, useEffect } from 'react';
import styles from '../components/All-list-Dashboard.module.css';
import MyAccountListing from './components/My-Account-listing';
import ProtectedRoute from '@/Components/protectedRoute';
import {  useSiteSettings } from '@/Components/mycontext/siteSettingContext';

const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState(null);
  const { token } = useSiteSettings();

  const fetchProperties = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/property-listing?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLoading(false);

      if (data?.data) {
        setProperties(data.data);
        setMeta(data.meta);
      } else {
        setProperties([]);
        setMeta(null);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProperties(currentPage);
    }
  }, [token, currentPage]);

  const totalPages = meta?.last_page || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <ProtectedRoute>
      <>
        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <section className={styles.listingcard}>
              {properties?.length > 0 ? (
                properties.map((listing) => (
                  <MyAccountListing key={listing.id} data={listing} />
                ))
              ) : (
                <p>Properties not Found</p>
              )}
            </section>

            {totalPages > 1 && (
              <nav className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {Array.from({ length: 5 }, (_, index) => {
                  const startPage = Math.max(
                    1,
                    Math.min(totalPages - 4, currentPage - 2)
                  );
                  const pageNumber = startPage + index;
                  if (pageNumber > totalPages) return null;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={
                        currentPage === pageNumber ? styles.activePage : ''
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
            )}
          </>
        )}
      </>
    </ProtectedRoute>
  );
};

export default ListingPage;
