'use client';
import React, { useState, useEffect } from 'react';
import styles from '../components/All-list-Dashboard.module.css'; // same layout CSS
import MyAccountListing from './components/My-Account-listing';
import ProtectedRoute from '@/Components/protectedRoute';
import { SiteSettingsProvider, useSiteSettings } from '@/Components/mycontext/siteSettingContext';

const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [properties,setProperties] = useState([])
  const itemsPerPage = 6;
  const {token } = useSiteSettings()

  useEffect(() => {
    const fetchProperties = async () => {
      // setLoading(true)
      // console.log(token)
      try {
        const res = await fetch('/api/auth/property-listing', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        // setLoading(false)
        if (Array.isArray(data)) {
          setProperties(data);
        } else if (data?.data) {
          setProperties(data.data);
        }
      } catch (err) {
        // setLoading(false)
        console.error('Error fetching roles:', err);
      }
    };
    if (token) {
      fetchProperties();
    }
  }, [token]);
  console.log(properties)

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

  const totalPages = Math.ceil(properties.length / itemsPerPage);

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

  const paginatedListings = properties && properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("==>",paginatedListings)

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
              {paginatedListings.length > 0 ? paginatedListings.map((listing) => (
                <MyAccountListing key={listing.id} data={listing} />
              )):<p>Properties not Found</p>}
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
    </ProtectedRoute>
  );
};

export default ListingPage;
