'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { DatePicker } from 'antd';
import { 
  FaFilter, FaPlus, FaBuilding, FaCheckCircle, FaPauseCircle, 
  FaClock, FaUsers, FaSearch, FaList, FaThLarge, FaMapMarkerAlt, 
  FaEye, FaEdit, FaTrash, FaLightbulb, FaHome
} from 'react-icons/fa';
import styles from './ListingDashboard.module.css';
import CustomSelect from '@/Components/CustomSelect/CustomSelect';
import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';

const ListingDashboard = ({ 
  properties = [], 
  loading = false,
  analytics = null,
  meta = null,
  currentPage = 1,
  setCurrentPage = () => {},
  filterType = 'all',
  setFilterType = () => {},
  perPage = 5,
  setPerPage = () => {}
}) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortValue, setSortValue] = useState('newest');

  const sortOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Price: Low to High', value: 'price_asc' },
  ];

  // Dummy Fallback Data for UI since API might not have all these yet
  const getDummyStats = (id) => ({
    views: Math.floor(Math.random() * 900) + 100,
    leads: Math.floor(Math.random() * 40) + 5,
    status: id % 3 === 0 ? 'Inactive' : id % 5 === 0 ? 'Expired' : 'Active',
    date: '10 May 2026',
    negotiable: id % 2 !== 0,
    type: id % 2 === 0 ? 'Apartment' : 'Builder Floor'
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
            style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
          />
          <button className={styles.addListingBtn}>
            <FaPlus /> Add New Listing
          </button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className={styles.topStatsGrid}>
        {[
          { label: 'Total Listings', value: analytics?.total_listing, icon: <FaBuilding />, bg: '#fff7ed', color: 'var(--Orange-500)' },
          { label: 'Published', value: analytics?.published_listing, icon: <FaEye />, bg: '#dcfce7', color: 'var(--Emerald-500)' },
          { label: 'Active', value: analytics?.active_listing, icon: <FaCheckCircle />, bg: '#dcfce7', color: 'var(--Green-500)' },
          { label: 'Under Review', value: analytics?.under_review_listing, icon: <FaSearch />, bg: '#f3e8ff', color: 'var(--Purple-500)' },
          { label: 'Draft', value: analytics?.draft_listing, icon: <FaEdit />, bg: '#eff6ff', color: 'var(--Blue-500)' },
          { label: 'Inactive', value: analytics?.inactive_listing, icon: <FaPauseCircle />, bg: '#fef3c7', color: '#f59e0b' },
          { label: 'Expired', value: analytics?.expired_listing, icon: <FaClock />, bg: '#fee2e2', color: 'var(--Red-500)' },
          { label: 'Rejected', value: analytics?.rejected_listing, icon: <FaTrash />, bg: '#f3f4f6', color: 'var(--Gray-500)' }
        ].map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statIconWrapper} style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>{stat.label}</p>
              <h3 className={styles.statValue}>
                {loading ? <Skeleton variant="rounded" width={40} height={28} /> : (stat.value || 0)}
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
            <FormControl size="small" sx={{ 
              width: 180, 
              backgroundColor: 'var(--White)',
              '& .MuiInputLabel-root': {
                fontSize: '13px',
                fontFamily: 'inherit',
                color: 'var(--Gray-500)',
                '&.Mui-focused': { color: 'var(--Orange-500)' }
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'inherit',
                color: 'var(--Gray-600)',
                height: '40px',
                '& fieldset': { borderColor: 'var(--Gray-200)' },
                '& fieldset legend': { fontSize: '9.75px', fontFamily: 'inherit' },
                '&:hover fieldset': { borderColor: 'var(--Gray-300)' },
                '&.Mui-focused fieldset': { borderColor: 'var(--Orange-500)', borderWidth: '1px' }
              }
            }}>
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
                  { label: 'All Listings', value: 'all' },
                  { label: 'Published', value: 'published' },
                  { label: 'Active', value: 'active' },
                  { label: 'Under Review', value: 'under_review' },
                  { label: 'Draft', value: 'draft' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Expired', value: 'expired' },
                  { label: 'Rejected', value: 'rejected' }
                ].map(opt => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '13px', fontFamily: 'inherit' }}>
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
              sx={{ 
                width: 280,
                backgroundColor: 'var(--White)',
                '& .MuiInputLabel-root': {
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  color: 'var(--Gray-500)',
                  '&.Mui-focused': {
                    color: 'var(--Orange-500)'
                  }
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  color: 'var(--Gray-600)',
                  height: '40px',
                  '& fieldset': {
                    borderColor: 'var(--Gray-200)',
                  },
                  '& fieldset legend': {
                    fontSize: '9.75px',
                    fontFamily: 'inherit',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--Gray-300)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--Orange-500)',
                    borderWidth: '1px'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch color="var(--Gray-400)" />
                  </InputAdornment>
                )
              }}
            />

            <FormControl size="small" sx={{ 
              width: 180, 
              backgroundColor: 'var(--White)',
              '& .MuiInputLabel-root': {
                fontSize: '13px',
                fontFamily: 'inherit',
                color: 'var(--Gray-500)',
                '&.Mui-focused': { color: 'var(--Orange-500)' }
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'inherit',
                color: 'var(--Gray-600)',
                height: '40px',
                '& fieldset': { borderColor: 'var(--Gray-200)' },
                '& fieldset legend': { fontSize: '9.75px', fontFamily: 'inherit' },
                '&:hover fieldset': { borderColor: 'var(--Gray-300)' },
                '&.Mui-focused fieldset': { borderColor: 'var(--Orange-500)', borderWidth: '1px' }
              }
            }}>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortValue}
                label="Sort By"
                onChange={(e) => setSortValue(e.target.value)}
              >
                {sortOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '13px', fontFamily: 'inherit' }}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={styles.viewToggles}>
              <button 
                className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaList />
              </button>
              <button 
                className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaThLarge />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic View: Table or Grid */}
        {viewMode === 'list' ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Property</th>
                <th>Location</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Views</th>
                <th>Leads</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? properties.map((prop, idx) => {
                const stats = getDummyStats(prop.id || idx);
                
                // Map new API data format
                let displayPrice = "N/A";
                if (prop.meta) {
                  const priceField = prop.meta.find(f => f.custom_field?.field_name_slug === "price");
                  if (priceField) {
                    displayPrice = priceField.value_string || priceField.value_number || priceField.value_text || "N/A";
                  }
                }
                
                let displayType = stats.type;
                if (prop.selected_taxonomies) {
                  const typeTax = prop.selected_taxonomies.find(t => t.taxonomy_slug === "property-type");
                  if (typeTax && typeTax.selected_terms?.length > 0) {
                    displayType = typeTax.selected_terms[0].name;
                  }
                }
                
                const title = prop.title || prop.name || 'Untitled Property';
                const idLabel = prop.listing_code ? `ID: ${prop.listing_code}` : ``;
                const cityName = prop.city_name || prop.city?.name || 'City';
                const stateName = prop.state_name || prop.state?.name || 'State';
                const imageSrc = prop.featured_image || prop.gallery_images?.[0];
                const rawStatus = prop.status || 'Unknown';
                const sLower = rawStatus.toLowerCase();
                let statusClass = styles.badgeInactive;
                if (sLower === 'published' || sLower === 'active') statusClass = styles.badgeActive;
                else if (sLower === 'expired' || sLower === 'rejected') statusClass = styles.badgeExpired;

                return (
                  <tr key={prop.id || idx}>
                    <td>
                      <div className={styles.propCell}>
                        <img 
                          src={imageSrc} 
                          alt="Property" 
                          className={styles.propImage}
                          onError={(e) => { e.target.src = '/property-placeholders.jpg' }}
                        />
                        <div className={styles.propDetails}>
                          <h4 className='text-capitalize'>{title}</h4>
                          <p className={styles.propId}>{idLabel}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.locCell}>
                        <FaMapMarkerAlt className={styles.cellIcon} />
                        <div>
                          {cityName}
                          <span className={styles.subText}>{stateName}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.typeCell}>
                        {displayType === 'Villa' ? <FaHome className={styles.typeIcon} /> : <FaBuilding className={styles.typeIcon} />}
                        {displayType}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className={styles.priceValue}>{displayPrice}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className={`${styles.badge} ${statusClass}`}>
                          <div className={styles.badgeDot}></div> 
                          <span style={{ textTransform: 'capitalize' }}>{rawStatus}</span>
                        </div>
                        <span className={styles.subText}>
                          Date
                          <br/>{prop.created_at ? new Date(prop.created_at).toLocaleDateString() : stats.date}
                        </span>
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
                        <button className={styles.actionBtn}><FaEye /></button>
                        <button className={styles.actionBtn}><FaEdit /></button>
                        <button className={styles.actionBtn}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                );
              }) : loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td><Skeleton variant="rounded" width="80%" height={48} /></td>
                    <td><Skeleton variant="text" width="60%" height={24} /></td>
                    <td><Skeleton variant="text" width="50%" height={24} /></td>
                    <td><Skeleton variant="text" width="40%" height={24} /></td>
                    <td><Skeleton variant="rounded" width="60%" height={28} /></td>
                    <td><Skeleton variant="text" width={40} height={24} /></td>
                    <td><Skeleton variant="text" width={40} height={24} /></td>
                    <td><Skeleton variant="rounded" width={100} height={32} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--Gray-500)' }}>
                    No properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        ) : (
          <div className={styles.gridContainer}>
            {properties.length > 0 ? properties.map((prop, idx) => {
              const stats = getDummyStats(prop.id || idx);
              
              // Map new API data format
              let displayPrice = "N/A";
              if (prop.meta) {
                const priceField = prop.meta.find(f => f.custom_field?.field_name_slug === "price");
                if (priceField) {
                  displayPrice = priceField.value_string || priceField.value_number || priceField.value_text || "N/A";
                }
              }
              
              let displayType = stats.type;
              if (prop.selected_taxonomies) {
                const typeTax = prop.selected_taxonomies.find(t => t.taxonomy_slug === "property-type");
                if (typeTax && typeTax.selected_terms?.length > 0) {
                  displayType = typeTax.selected_terms[0].name;
                }
              }

              const title = prop.title || prop.name || 'Untitled Property';
              const idLabel = prop.listing_code ? `ID: ${prop.listing_code}` : ``;
              const cityName = prop.city_name || prop.city?.name || 'City';
              const stateName = prop.state_name || prop.state?.name || 'State';
              const imageSrc = prop.featured_image || prop.gallery_images?.[0];
              
              const rawStatus = prop.status || 'Unknown';
              const sLower = rawStatus.toLowerCase();
              let statusClass = styles.badgeInactive;
              if (sLower === 'published' || sLower === 'active') statusClass = styles.badgeActive;
              else if (sLower === 'expired' || sLower === 'rejected') statusClass = styles.badgeExpired;

              return (
                <div key={prop.id || idx} className={styles.propertyCard}>
                  <div className={styles.cardImageWrapper}>
                    <img 
                      src={imageSrc} 
                      alt="Property" 
                      onError={(e) => { e.target.src = '/property-placeholders.jpg' }}
                    />
                    <div className={`${styles.cardBadge} ${statusClass}`}>
                      <div className={styles.badgeDot}></div>
                      <span style={{ textTransform: 'capitalize' }}>{rawStatus}</span>
                    </div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeaderRow}>
                      <div>
                        <h4 className={styles.cardTitle}>{title}</h4>
                        <p className={styles.cardId}>{idLabel}</p>
                      </div>
                      <div className={styles.cardPrice}>
                        <h4>{displayPrice}</h4>
                      </div>
                    </div>

                    <div className={styles.cardInfoRow}>
                      <div className={styles.cardInfoItem}>
                        <FaMapMarkerAlt className={styles.cellIcon} />
                        {cityName}, {stateName}
                      </div>
                    </div>
                    <div className={styles.cardInfoRow}>
                      <div className={styles.cardInfoItem}>
                        {displayType === 'Villa' ? <FaHome className={styles.typeIcon} /> : <FaBuilding className={styles.typeIcon} />}
                        {displayType}
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardStats}>
                        <div className={styles.cardStatItem}>
                          <FaEye className={styles.typeIcon} /> {stats.views}
                        </div>
                        <div className={styles.cardStatItem}>
                          <FaUsers className={styles.typeIcon} /> {stats.leads}
                        </div>
                      </div>
                      <div className={styles.cardActions}>
                        <button className={styles.actionBtn}><FaEye /></button>
                        <button className={styles.actionBtn}><FaEdit /></button>
                        <button className={styles.actionBtn}><FaTrash /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className={styles.propertyCard}>
                  <Skeleton variant="rectangular" height={220} sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
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
              <div style={{ padding: '40px', color: 'var(--Gray-500)', textAlign: 'center', gridColumn: '1 / -1' }}>
                No properties found.
              </div>
            )}
          </div>
        )}

        {/* Pagination Row */}
        <div className={styles.paginationRow}>
          <div>
            Showing {properties.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, meta?.total || properties.length)} of {meta?.total || properties.length} listings
          </div>
          
          <div className={styles.pageControls}>
            <button 
              className={styles.pageBtn} 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              &lt;
            </button>
            
            {Array.from({ length: meta?.last_page || 1 }, (_, i) => i + 1).map(page => (
              <button 
                key={page} 
                className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button 
              className={styles.pageBtn}
              disabled={currentPage === (meta?.last_page || 1)}
              onClick={() => setCurrentPage(prev => Math.min(meta?.last_page || 1, prev + 1))}
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
            <p>Add high quality photos, set competitive prices and keep your listings active.</p>
          </div>
        </div>
        <button className={styles.bannerBtn}>View Best Practices</button>
      </div>
    </div>
  );
};

export default ListingDashboard;
