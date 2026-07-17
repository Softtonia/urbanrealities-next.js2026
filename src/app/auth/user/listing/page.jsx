'use client';
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/Components/protectedRoute';
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import ListingDashboard from './components/ListingDashboard';

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

  return (
    <ProtectedRoute>
      <ListingDashboard properties={properties} loading={loading} />
    </ProtectedRoute>
  );
};

export default ListingPage;
