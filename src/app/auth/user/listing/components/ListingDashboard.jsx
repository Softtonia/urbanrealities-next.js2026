"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { encodeId } from "@/lib/utils";
import Image from "next/image";
import { DatePicker } from "antd";
import {
  FaFilter,
  FaPlus,
  FaBuilding,
  FaCheckCircle,
  FaPauseCircle,
  FaClock,
  FaUsers,
  FaSearch,
  FaList,
  FaThLarge,
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaLightbulb,
  FaHome,
  FaStar,
  FaEllipsisV,
} from "react-icons/fa";
import styles from "./ListingDashboard.module.css";
import CustomSelect from "@/Components/CustomSelect/CustomSelect";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Box,
  Menu,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import {
  updateListingAvailability,
  toggleFeatureListing,
  deleteListing,
} from "@/services/listing.service";
import { toast } from "react-toastify";

const STATUS_MAP = {
  Available: "available",
  Reserved: "reserved",
  Sold: "sold",
  Rented: "rented",
  "Off Market": "off_market",
};

const ListingDashboard = ({
  properties = [],
  loading = false,
  analytics = null,
  meta = null,
  currentPage = 1,
  setCurrentPage = () => {},
  filterType = "all",
  setFilterType = () => {},
  perPage = 5,
  setPerPage = () => {},
  searchValue = "",
  setSearchValue = () => {},
  sortValue = "newest",
  setSortValue = () => {},
  refreshData = () => {}
}) => {
  const router = useRouter();
  const { token } = useSiteSettings();
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [searchInput, setSearchInput] = useState(searchValue);

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusOverrides, setStatusOverrides] = useState({});
  const [featuredOverrides, setFeaturedOverrides] = useState({});

  const [deletedListingIds, setDeletedListingIds] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingListingId, setDeletingListingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeProperty, setActiveProperty] = useState(null);

  const handleOpenMenu = (event, prop) => {
    setMenuAnchor(event.currentTarget);
    setActiveProperty(prop);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setActiveProperty(null);
  };

  const handleStatusClick = (propId) => {
    setSelectedListingId(propId);
    setSelectedStatus("");
    setStatusModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return;
    setUpdatingStatus(true);
    try {
      await updateListingAvailability(token, selectedListingId, selectedStatus);
      toast.success("Status updated successfully");
      // Set the override to the human-readable key
      const newStatusKey =
        Object.keys(STATUS_MAP).find((k) => STATUS_MAP[k] === selectedStatus) ||
        selectedStatus;
      setStatusOverrides((prev) => ({
        ...prev,
        [selectedListingId]: newStatusKey,
      }));
      setStatusModalOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleToggleFeature = async (propId, currentIsFeatured) => {
    const newFeaturedStatus = !currentIsFeatured;

    // Optimistic UI Update (Instant)
    setFeaturedOverrides((prev) => ({
      ...prev,
      [propId]: newFeaturedStatus,
    }));

    try {
      const res = await toggleFeatureListing(token, propId);
      const msg = res?.message || res?.data?.message || "Listing feature toggled successfully";
      toast.success(msg);
      
      // If backend provides concrete state, synchronize just in case
      let finalStatus = newFeaturedStatus;
      if (res && res.is_featured !== undefined) {
        finalStatus = res.is_featured;
      } else if (res && res.data && res.data.is_featured !== undefined) {
        finalStatus = res.data.is_featured;
      }

      if (finalStatus !== newFeaturedStatus) {
        setFeaturedOverrides((prev) => ({
          ...prev,
          [propId]: finalStatus,
        }));
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to toggle feature listing",
      );
      // Revert on error
      setFeaturedOverrides((prev) => ({
        ...prev,
        [propId]: currentIsFeatured,
      }));
    }
  };

  const handleDeleteClick = (propId) => {
    setDeletingListingId(propId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingListingId) return;
    setIsDeleting(true);
    try {
      await deleteListing(token, deletingListingId);
      toast.success("Listing deleted successfully");
      setDeletedListingIds((prev) => [...prev, deletingListingId]);
      setDeleteModalOpen(false);
      setDeletingListingId(null);
      refreshData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete listing");
    } finally {
      setIsDeleting(false);
    }
  };

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Price: Low to High", value: "price_asc" },
  ];

  // Dummy Fallback Data for UI since API might not have all these yet
  const getDummyStats = (id) => ({
    views: 0,
    leads: 0,
    status: id % 3 === 0 ? "Inactive" : id % 5 === 0 ? "Expired" : "Active",
    date: "10 May 2026",
    negotiable: id % 2 !== 0,
    type: id % 2 === 0 ? "Apartment" : "Builder Floor",
  });

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1>Listings</h1>
          <p>Manage all your property listings from one place.</p>
        </div>
        <div className={styles.headerRight}>
          <DatePicker.RangePicker
            className={styles.datePickerBtn}
            format="DD MMM YYYY"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          />
          <button
            className={styles.addListingBtn}
            onClick={() => router.push("/auth/post-property/basic-details")}
          >
            <FaPlus /> Add New Listing
          </button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className={styles.topStatsGrid}>
        {[
          {
            label: "Total Listings",
            value: analytics?.total_listing,
            icon: <FaBuilding />,
            bg: "#fff7ed",
            color: "var(--Orange-500)",
          },
          {
            label: "Published",
            value: analytics?.published_listing,
            icon: <FaEye />,
            bg: "#dcfce7",
            color: "var(--Emerald-500)",
          },
          {
            label: "Active",
            value: analytics?.active_listing,
            icon: <FaCheckCircle />,
            bg: "#dcfce7",
            color: "var(--Green-500)",
          },
          {
            label: "Under Review",
            value: analytics?.under_review_listing,
            icon: <FaSearch />,
            bg: "#f3e8ff",
            color: "var(--Purple-500)",
          },
          {
            label: "Draft",
            value: analytics?.draft_listing,
            icon: <FaEdit />,
            bg: "#eff6ff",
            color: "var(--Blue-500)",
          },
          {
            label: "Inactive",
            value: analytics?.inactive_listing,
            icon: <FaPauseCircle />,
            bg: "#fef3c7",
            color: "#f59e0b",
          },
          {
            label: "Expired",
            value: analytics?.expired_listing,
            icon: <FaClock />,
            bg: "#fee2e2",
            color: "var(--Red-500)",
          },
          {
            label: "Rejected",
            value: analytics?.rejected_listing,
            icon: <FaTrash />,
            bg: "#f3f4f6",
            color: "var(--Gray-500)",
          },
        ].map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div
              className={styles.statIconWrapper}
              style={{ background: stat.bg, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>{stat.label}</p>
              <h3 className={styles.statValue}>
                {loading ? (
                  <Skeleton variant="rounded" width={40} height={28} />
                ) : (
                  stat.value || 0
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className={styles.contentCard}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.filterDropdown}>
            <FormControl
              size="small"
              sx={{
                width: 180,
                backgroundColor: "var(--White)",
                "& .MuiInputLabel-root": {
                  fontSize: "13px",
                  fontFamily: "inherit",
                  color: "var(--Gray-500)",
                  "&.Mui-focused": { color: "var(--Orange-500)" },
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  color: "var(--Gray-600)",
                  height: "40px",
                  "& fieldset": { borderColor: "var(--Gray-200)" },
                  "& fieldset legend": {
                    fontSize: "9.75px",
                    fontFamily: "inherit",
                  },
                  "&:hover fieldset": { borderColor: "var(--Gray-300)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--Orange-500)",
                    borderWidth: "1px",
                  },
                },
              }}
            >
              <InputLabel id="filter-select-label">Status</InputLabel>
              <Select
                labelId="filter-select-label"
                value={filterType}
                label="Status"
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {[
                  { label: "All Listings", value: "all" },
                  { label: "Published", value: "published" },
                  { label: "Active", value: "active" },
                  { label: "Under Review", value: "under_review" },
                  { label: "Draft", value: "draft" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Expired", value: "expired" },
                  { label: "Rejected", value: "rejected" },
                  { label: "Featured", value: "featured" },
                ].map((opt) => (
                  <MenuItem
                    key={opt.value}
                    value={opt.value}
                    sx={{ fontSize: "13px", fontFamily: "inherit" }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.toolbarRight}>
            <TextField
              variant="outlined"
              size="small"
              label="Search by title, location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  setSearchValue(searchInput);
                  setCurrentPage(1);
                }
              }}
              onBlur={() => {
                if (searchInput !== searchValue) {
                  setSearchValue(searchInput);
                  setCurrentPage(1);
                }
              }}
              sx={{
                width: 280,
                backgroundColor: "var(--White)",
                "& .MuiInputLabel-root": {
                  fontSize: "13px",
                  fontFamily: "inherit",
                  color: "var(--Gray-500)",
                  "&.Mui-focused": {
                    color: "var(--Orange-500)",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  color: "var(--Gray-600)",
                  height: "40px",
                  "& fieldset": {
                    borderColor: "var(--Gray-200)",
                  },
                  "& fieldset legend": {
                    fontSize: "9.75px",
                    fontFamily: "inherit",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--Gray-300)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--Orange-500)",
                    borderWidth: "1px",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch color="var(--Gray-400)" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl
              size="small"
              sx={{
                width: 180,
                backgroundColor: "var(--White)",
                "& .MuiInputLabel-root": {
                  fontSize: "13px",
                  fontFamily: "inherit",
                  color: "var(--Gray-500)",
                  "&.Mui-focused": { color: "var(--Orange-500)" },
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  color: "var(--Gray-600)",
                  height: "40px",
                  "& fieldset": { borderColor: "var(--Gray-200)" },
                  "& fieldset legend": {
                    fontSize: "9.75px",
                    fontFamily: "inherit",
                  },
                  "&:hover fieldset": { borderColor: "var(--Gray-300)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--Orange-500)",
                    borderWidth: "1px",
                  },
                },
              }}
            >
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortValue}
                label="Sort By"
                onChange={(e) => {
                  setSortValue(e.target.value);
                  setCurrentPage(1);
                }}
                displayEmpty
              >
                {sortOptions.map((opt) => (
                  <MenuItem
                    key={opt.value}
                    value={opt.value}
                    sx={{ fontSize: "13px", fontFamily: "inherit" }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={styles.viewToggles}>
              <button
                className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.active : ""}`}
                onClick={() => setViewMode("list")}
              >
                <FaList />
              </button>
              <button
                className={`${styles.viewToggleBtn} ${viewMode === "grid" ? styles.active : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <FaThLarge />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic View: Table or Grid */}
        {viewMode === "list" ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: "40px", paddingRight: 0 }}></th>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Availability Status</th>
                  <th>Views</th>
                  <th>Leads</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.length > 0 ? (
                  properties
                    .filter((prop) => !deletedListingIds.includes(prop.id))
                    .map((prop, idx) => {
                      const stats = getDummyStats(prop.id || idx);

                      // Map new API data format
                      let displayPrice = "-";
                      if (prop.meta) {
                        const priceField = prop.meta.find(
                          (f) => f.custom_field?.field_name_slug === "price",
                        );
                        if (priceField) {
                          displayPrice =
                            priceField.value_string ||
                            priceField.value_number ||
                            priceField.value_text ||
                            "-";
                        }
                      }

                      let displayType = stats.type;
                      if (prop.selected_taxonomies) {
                        const typeTax = prop.selected_taxonomies.find(
                          (t) => t.taxonomy_slug === "property-type",
                        );
                        if (typeTax && typeTax.selected_terms?.length > 0) {
                          displayType = typeTax.selected_terms[0].name;
                        }
                      }

                      const title =
                        prop.title || prop.name || "Untitled Property";
                      const idLabel = prop.listing_code
                        ? `ID: ${prop.listing_code}`
                        : ``;
                      const cityName =
                        prop.city_name || prop.city?.name || "City";
                      const stateName =
                        prop.state_name || prop.state?.name || "State";
                      const imageSrc =
                        prop.featured_image || prop.gallery_images?.[0];
                      const rawStatus = prop.workflow_status || "Unknown";
                      const displayStatus = rawStatus.replace(/_/g, " ");
                      const sLower = rawStatus.toLowerCase();
                      let statusClass = styles.badgeInactive;
                      if (sLower === "published" || sLower === "active")
                        statusClass = styles.badgeActive;
                      else if (sLower === "expired" || sLower === "rejected")
                        statusClass = styles.badgeExpired;
                      else if (sLower === "in verification")
                        statusClass = styles.badgeWarning;

                      const rawAvailability =
                        statusOverrides[prop.id || idx] ||
                        prop.availability_status ||
                        "available";
                      const displayAvailability = rawAvailability.replace(
                        /_/g,
                        " ",
                      );
                      const aLower = rawAvailability.toLowerCase();
                      let availClass = styles.badgeInactive;
                      if (aLower === "available")
                        availClass = styles.badgeActive;
                      else if (
                        aLower === "reserved" ||
                        aLower === "off market" ||
                        aLower === "off_market"
                      )
                        availClass = styles.badgeWarning;
                      else if (aLower === "sold" || aLower === "rented")
                        availClass = styles.badgeExpired;

                      const isFeatured =
                        featuredOverrides[prop.id || idx] !== undefined
                          ? featuredOverrides[prop.id || idx]
                          : prop.is_featured;

                      return (
                        <tr key={prop.id || idx}>
                          <td style={{ paddingRight: 0 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleToggleFeature(prop.id, isFeatured)}
                            >
                              <FaStar
                                size={18}
                                color={
                                  isFeatured
                                    ? "var(--Orange-500)"
                                    : "var(--Gray-300)"
                                }
                              />
                            </IconButton>
                          </td>
                          <td>
                            <div className={styles.propCell}>
                              <img
                                src={imageSrc}
                                alt="Property"
                                className={styles.propImage}
                                onError={(e) => {
                                  e.target.src = "/property-placeholders.jpg";
                                }}
                              />
                              <div className={styles.propDetails}>
                                <h4 className="text-capitalize" title={title}>{title}</h4>
                                <p className={styles.propId}>{idLabel}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.locCell}>
                              <FaMapMarkerAlt className={styles.cellIcon} />
                              <div title={`${cityName}, ${stateName}`}>
                                {cityName}
                                <span className={styles.subText}>
                                  {stateName}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.typeCell}>
                              {displayType === "Villa" ? (
                                <FaHome className={styles.typeIcon} />
                              ) : (
                                <FaBuilding className={styles.typeIcon} />
                              )}
                              {displayType}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className={styles.priceValue}>
                                {displayPrice}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className={`${styles.badge} ${statusClass}`}>
                                <div className={styles.badgeDot}></div>
                                <span style={{ textTransform: "capitalize" }}>
                                  {displayStatus}
                                </span>
                              </div>
                              <span className={styles.subText}>
                                Added:{" "}
                                {prop.created_at
                                  ? new Date(
                                      prop.created_at,
                                    ).toLocaleDateString()
                                  : stats.date}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div
                                className={`${styles.badge} ${availClass}`}
                                onClick={() => handleStatusClick(prop.id)}
                                style={{ cursor: "pointer" }}
                                title="Click to update availability"
                              >
                                <div className={styles.badgeDot}></div>
                                <span style={{ textTransform: "capitalize" }}>
                                  {displayAvailability}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={styles?.statCell}>
                              <FaEye /> {stats?.views}
                            </div>
                          </td>
                          <td>
                            <div className={styles?.statCell}>
                              <FaUsers /> {stats?.leads}
                            </div>
                          </td>
                          <td>
                            <div className={styles.actionCell}>
                              <IconButton
                                size="small"
                                onClick={(e) => handleOpenMenu(e, prop)}
                              >
                                <FaEllipsisV
                                  size={14}
                                  color="var(--Gray-500)"
                                />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                ) : loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td>
                        <Skeleton variant="circular" width={24} height={24} />
                      </td>
                      <td>
                        <Skeleton variant="rounded" width="80%" height={48} />
                      </td>
                      <td>
                        <Skeleton variant="text" width="60%" height={24} />
                      </td>
                      <td>
                        <Skeleton variant="text" width="50%" height={24} />
                      </td>
                      <td>
                        <Skeleton variant="text" width="40%" height={24} />
                      </td>
                      <td>
                        <Skeleton variant="rounded" width="60%" height={28} />
                      </td>
                      <td>
                        <Skeleton variant="rounded" width="60%" height={28} />
                      </td>
                      <td>
                        <Skeleton variant="text" width={40} height={24} />
                      </td>
                      <td>
                        <Skeleton variant="text" width={40} height={24} />
                      </td>
                      <td>
                        <Skeleton variant="rounded" width={100} height={32} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "var(--Gray-500)",
                      }}
                    >
                      No properties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.gridContainer}>
            {properties.length > 0 ? (
              properties
                .filter((prop) => !deletedListingIds.includes(prop.id))
                .map((prop, idx) => {
                  const imageSrc =
                    prop.media && prop.media.length > 0
                      ? prop.media[0].url || prop.media[0]
                      : prop.featured_image ||
                        prop.gallery_images?.[0] ||
                        "/property-placeholders.jpg";

                  // Map new API data format
                  let displayPrice = "-";
                  if (prop.meta) {
                    const priceField = prop.meta.find(
                      (f) => f.custom_field?.field_name_slug === "price",
                    );
                    if (priceField) {
                      displayPrice =
                        priceField.value_string ||
                        priceField.value_number ||
                        priceField.value_text ||
                        "-";
                    }
                  }

                  let displayType = stats.type;
                  if (prop.selected_taxonomies) {
                    const typeTax = prop.selected_taxonomies.find(
                      (t) => t.taxonomy_slug === "property-type",
                    );
                    if (typeTax && typeTax.selected_terms?.length > 0) {
                      displayType = typeTax.selected_terms[0].name;
                    }
                  }

                  const title = prop.title || prop.name || "Untitled Property";
                  const idLabel = prop.listing_code
                    ? `ID: ${prop.listing_code}`
                    : ``;
                  const cityName = prop.city_name || prop.city?.name || "City";
                  const stateName =
                    prop.state_name || prop.state?.name || "State";

                  const rawStatus = prop.workflow_status || "Unknown";
                  const displayStatus = rawStatus.replace(/_/g, " ");
                  const sLower = rawStatus.toLowerCase();
                  let statusClass = styles.badgeInactive;
                  if (sLower === "published" || sLower === "active")
                    statusClass = styles.badgeActive;
                  else if (sLower === "expired" || sLower === "rejected")
                    statusClass = styles.badgeExpired;
                  else if (sLower === "in verification")
                    statusClass = styles.badgeWarning;

                  const rawAvailability =
                    statusOverrides[prop.id || idx] ||
                    prop.availability_status ||
                    "available";
                  const displayAvailability = rawAvailability.replace(
                    /_/g,
                    " ",
                  );
                  const aLower = rawAvailability.toLowerCase();
                  let availClass = styles.badgeInactive;
                  if (aLower === "available") availClass = styles.badgeActive;
                  else if (
                    aLower === "reserved" ||
                    aLower === "off market" ||
                    aLower === "off_market"
                  )
                    availClass = styles.badgeWarning;
                  else if (aLower === "sold" || aLower === "rented")
                    availClass = styles.badgeExpired;

                  const isFeatured =
                    featuredOverrides[prop.id || idx] !== undefined
                      ? featuredOverrides[prop.id || idx]
                      : prop.is_featured;

                  return (
                    <div key={prop.id || idx} className={styles.propertyCard}>
                      <div className={styles.cardImageWrapper}>
                        <img
                          src={imageSrc}
                          alt="Property"
                          onError={(e) => {
                            e.target.src = "/property-placeholders.jpg";
                          }}
                        />
                        <div className={`${styles.cardBadge} ${statusClass}`}>
                          <div className={styles.badgeDot}></div>
                          <span style={{ textTransform: "capitalize" }}>
                            {displayStatus}
                          </span>
                        </div>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.cardHeaderRow}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleToggleFeature(prop.id, isFeatured)}
                              sx={{ padding: 0, marginTop: "2px" }}
                            >
                              <FaStar
                                size={18}
                                color={
                                  isFeatured
                                    ? "var(--Orange-500)"
                                    : "var(--Gray-300)"
                                }
                              />
                            </IconButton>
                            <div>
                              <h4 className={styles.cardTitle} title={title}>{title}</h4>
                              <p className={styles.cardId}>{idLabel}</p>
                            </div>
                          </div>
                          <div className={styles.cardPrice}>
                            <h4>{displayPrice}</h4>
                          </div>
                        </div>

                        <div className={styles.cardInfoRow}>
                          <div className={styles.cardInfoItem}>
                            <strong>Availability:</strong>
                            <div
                              className={`${styles.badge} ${availClass}`}
                              onClick={() => handleStatusClick(prop.id)}
                              style={{
                                cursor: "pointer",
                                marginLeft: "8px",
                                padding: "2px 8px",
                                fontSize: "12px",
                              }}
                              title="Click to update availability"
                            >
                              <div className={styles.badgeDot}></div>
                              <span style={{ textTransform: "capitalize" }}>
                                {displayAvailability}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.cardInfoRow}>
                          <div className={styles.cardInfoItem} title={`${cityName}, ${stateName}`}>
                            <FaMapMarkerAlt className={styles.cellIcon} />
                            {cityName}, {stateName}
                          </div>
                        </div>
                        <div className={styles.cardInfoRow}>
                          <div className={styles.cardInfoItem}>
                            {displayType === "Villa" ? (
                              <FaHome className={styles.typeIcon} />
                            ) : (
                              <FaBuilding className={styles.typeIcon} />
                            )}
                            {displayType}
                          </div>
                        </div>

                        <div className={styles.cardFooter}>
                          <div className={styles.cardStats}>
                            <div className={styles.cardStatItem}>
                              <FaEye className={styles.typeIcon} />{" "}
                              {stats.views}
                            </div>
                            <div className={styles.cardStatItem}>
                              <FaUsers className={styles.typeIcon} />{" "}
                              {stats.leads}
                            </div>
                          </div>
                          <div className={styles.cardActions}>
                            <IconButton
                              size="small"
                              onClick={(e) => handleOpenMenu(e, prop)}
                            >
                              <FaEllipsisV size={14} color="var(--Gray-500)" />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className={styles.propertyCard}>
                  <Skeleton
                    variant="rectangular"
                    height={220}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <div className={styles.cardContent}>
                    <Skeleton variant="text" height={32} width="70%" />
                    <Skeleton variant="text" width="50%" />
                    <div style={{ marginTop: 16 }}>
                      <Skeleton variant="rounded" height={32} width={120} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "40px",
                  color: "var(--Gray-500)",
                  textAlign: "center",
                  gridColumn: "1 / -1",
                }}
              >
                No properties found.
              </div>
            )}
          </div>
        )}

        {/* Pagination Row */}
        <div className={styles.paginationRow}>
          <div>
            Showing{" "}
            {properties.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to{" "}
            {Math.min(currentPage * perPage, meta?.total || properties.length)}{" "}
            of {meta?.total || properties.length} listings
          </div>

          <div className={styles.pageControls}>
            <button
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              &lt;
            </button>

            {Array.from({ length: meta?.last_page || 1 }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${currentPage === page ? styles.active : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ),
            )}

            <button
              className={styles.pageBtn}
              disabled={currentPage === (meta?.last_page || 1)}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(meta?.last_page || 1, prev + 1),
                )
              }
            >
              &gt;
            </button>
          </div>

          <select
            className={styles.perPageSelect}
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>Show 5 per page</option>
            <option value={10}>Show 10 per page</option>
            <option value={20}>Show 20 per page</option>
          </select>
        </div>
      </div>

      {/* Footer Banner */}
      <div className={styles.footerBanner}>
        <div className={styles.bannerLeft}>
          <div className={styles.bannerIcon}>
            <FaLightbulb />
          </div>
          <div className={styles.bannerText}>
            <h3>Tips to get more leads</h3>
            <p>
              Add high quality photos, set competitive prices and keep your
              listings active.
            </p>
          </div>
        </div>
        <button className={styles.bannerBtn}>View Best Practices</button>
      </div>

      {/* Status Update Modal */}
      <Dialog
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            borderBottom: "1px solid #eee",
          }}
        >
          Update Availability Status
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {Object.entries(STATUS_MAP).map(([label, value]) => (
              <Box
                key={value}
                onClick={() => setSelectedStatus(value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  border: `1px solid ${selectedStatus === value ? "var(--Orange-500)" : "#e2e8f0"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedStatus === value ? "#fff7ed" : "#fff",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "var(--Orange-500)",
                    backgroundColor: "#fff7ed",
                  },
                }}
              >
                <Checkbox
                  checked={selectedStatus === value}
                  onChange={() => setSelectedStatus(value)}
                  sx={{
                    color: "#cbd5e1",
                    "&.Mui-checked": { color: "var(--Orange-500)" },
                    padding: "4px",
                    marginRight: "12px",
                  }}
                />
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: selectedStatus === value ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              </Box>
            ))}
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
          <Button
            onClick={() => setStatusModalOpen(false)}
            disabled={updatingStatus}
            sx={{ color: "var(--Gray-500)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            disabled={!selectedStatus || updatingStatus}
            sx={{
              backgroundColor: "#f97316 !important",
              color: "#fff !important",
              "&:hover": {
                backgroundColor: "#ea580c !important",
                color: "#fff !important",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f1f5f9 !important",
                color: "#94a3b8 !important",
              },
              boxShadow: "none",
              borderRadius: "6px",
            }}
          >
            {updatingStatus ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Update Status"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1,
            minWidth: 160,
            "& .MuiMenuItem-root": {
              fontSize: "14px",
              padding: "10px 16px",
              color: "var(--Gray-700)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <FaEye size={16} color="var(--Gray-500)" />
          </ListItemIcon>
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            router.push(
              `/auth/edit-property/basic-details?listing_id=${encodeId(activeProperty?.id)}`,
            );
          }}
        >
          <ListItemIcon>
            <FaEdit size={16} color="var(--Gray-500)" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleDeleteClick(activeProperty?.id);
          }}
        >
          <ListItemIcon>
            <FaTrash size={16} color="var(--Gray-500)" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        PaperProps={{ style: { borderRadius: "12px", minWidth: "400px" } }}
      >
        <DialogTitle
          sx={{
            borderBottom: "1px solid #eee",
            pb: 2,
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <p style={{ margin: 0, fontSize: "15px", color: "var(--Gray-700)" }}>
            Are you sure you want to delete this listing? This action cannot be
            undone.
          </p>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            disabled={isDeleting}
            sx={{ color: "var(--Gray-500)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            disabled={isDeleting}
            sx={{
              backgroundColor: "#ef4444 !important",
              color: "#fff !important",
              "&:hover": { backgroundColor: "#dc2626 !important" },
              boxShadow: "none",
              borderRadius: "6px",
            }}
          >
            {isDeleting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListingDashboard;
