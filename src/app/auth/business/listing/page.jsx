'use client';
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/Components/protectedRoute';
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import { fetchUserListings } from '@/services/listing.service';
import ListingDashboard from './components/ListingDashboard';

const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState(null);
  const { token } = useSiteSettings();

  const [filterType, setFilterType] = useState('all');
  const [perPage, setPerPage] = useState(5);
  const [analytics, setAnalytics] = useState(null);

  const fetchProperties = async (page = 1, filter = 'all', limit = 5) => {
    setLoading(true);
    try {
      const result = await fetchUserListings(token, filter, limit, page);
      setLoading(false);

      if (result?.status && result?.data?.data) {
        setProperties(result.data.data);
        setMeta({
          current_page: result.data.current_page,
          last_page: result.data.last_page,
          total: result.data.total,
          per_page: result.data.per_page,
        });
        setAnalytics(result.analytics);
      } else {
        setProperties([]);
        setMeta(null);
        setAnalytics(null);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProperties(currentPage, filterType, perPage);
    }
  }, [token, currentPage, filterType, perPage]);

  return (
    <ProtectedRoute>
      <ListingDashboard 
        properties={properties} 
        loading={loading}
        analytics={analytics}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filterType={filterType}
        setFilterType={setFilterType}
        perPage={perPage}
        setPerPage={setPerPage}
      />
    </ProtectedRoute>
  );
};

export default ListingPage;
