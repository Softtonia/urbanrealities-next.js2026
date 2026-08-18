"use client";
import React, { useState, useEffect, useCallback } from "react";
import ProtectedRoute from "@/Components/protectedRoute";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { fetchUserListings } from "@/services/listing.service";
import ListingDashboard from "./components/ListingDashboard";

const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState(null);
  const { token } = useSiteSettings();

  const [filterType, setFilterType] = useState("all");
  const [perPage, setPerPage] = useState(5);
  const [analytics, setAnalytics] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("newest");

  const fetchProperties = async (page = 1, filter = "all", limit = 5, search = "", sort = "") => {
    setLoading(true);
    try {
      let apiFilter = filter;
      let isFeatured = false;
      let apiSortBy = sort;

      if (filter === 'featured') {
        apiFilter = 'all';
        isFeatured = true;
      }

      if (sort === 'price_desc') {
        apiSortBy = 'price_high_to_low';
      } else if (sort === 'price_asc') {
        apiSortBy = 'price_low_to_high';
      }

      const result = await fetchUserListings(token, apiFilter, limit, page, search, apiSortBy, isFeatured);
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
      console.error("Error fetching properties:", err);
      setProperties([]);
      setMeta(null);
      setAnalytics(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProperties(currentPage, filterType, perPage, searchValue, sortValue);
    }
  }, [token, currentPage, filterType, perPage, searchValue, sortValue]);

  const handleRefresh = useCallback(() => {
    fetchProperties(currentPage, filterType, perPage, searchValue, sortValue);
  }, [currentPage, filterType, perPage, searchValue, sortValue]);

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
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
        refreshData={handleRefresh}
      />
    </ProtectedRoute>
  );
};

export default ListingPage;
