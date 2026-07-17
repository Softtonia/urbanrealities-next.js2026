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

const ListingDashboard = ({ properties = [], loading = false }) => {
  const [activeTab, setActiveTab] = useState('All Listings');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Dummy Fallback Data for UI since API might not have all these yet
  const getDummyStats = (id) => ({
    views: Math.floor(Math.random() * 900) + 100,
    leads: Math.floor(Math.random() * 40) + 5,
    status: id % 3 === 0 ? 'Inactive' : id % 5 === 0 ? 'Expired' : 'Active',
    date: '10 May 2026',
    negotiable: id % 2 !== 0,
    type: id % 2 === 0 ? 'Apartment' : 'Builder Floor'
  });

  const displayProperties = properties.length > 0 ? properties : [
    {
      id: 991,
      name: '3 BHK Builder Floor in DLF Phase 2',
      city: { name: 'Gurgaon' },
      state: { name: 'DLF Phase 2' },
      featured_image: '/property-placeholders.jpg',
      custom_field_values: [
        { template: { name: 'property.basic.price' }, field_value: '₹2.45 Cr' }
      ]
    },
    {
      id: 992,
      name: '2 BHK Apartment in Sector 65',
      city: { name: 'Gurgaon' },
      state: { name: 'Sector 65' },
      featured_image: '/property-placeholders.jpg',
      custom_field_values: [
        { template: { name: 'property.basic.price' }, field_value: '₹1.15 Cr' }
      ]
    }
  ];

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
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#fff7ed', color: 'var(--Orange-500)' }}>
            <FaBuilding />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Listings</p>
            <h3 className={styles.statValue}>12</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#dcfce7', color: 'var(--Emerald-500)' }}>
            <FaCheckCircle />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Active Listings</p>
            <h3 className={styles.statValue}>8</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <FaPauseCircle />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Inactive Listings</p>
            <h3 className={styles.statValue}>3</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#fee2e2', color: 'var(--Red-500)' }}>
            <FaClock />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Expired Listings</p>
            <h3 className={styles.statValue}>1</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#eff6ff', color: 'var(--Blue-500)' }}>
            <FaUsers />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Leads</p>
            <h3 className={styles.statValue}>125</h3>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className={styles.contentCard}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.tabs}>
            {['All Listings (12)', 'Active (8)', 'Inactive (3)', 'Expired (1)', 'Draft (2)'].map(tab => (
              <button 
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab.split(' ')[0] || (tab.startsWith('All') && activeTab === 'All Listings') ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.startsWith('All') ? 'All Listings' : tab.split(' ')[0])}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.toolbarRight}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input type="text" placeholder="Search by title, location or ID..." />
            </div>
            <select className={styles.sortSelect}>
              <option>Sort By: Newest First</option>
              <option>Sort By: Oldest First</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
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
              {displayProperties.map((prop, idx) => {
                const stats = getDummyStats(prop.id || idx);
                
                // Try to extract price from custom fields like the old component
                let displayPrice = "N/A";
                if (prop.custom_field_values) {
                  const priceField = prop.custom_field_values.find(f => f.template?.name?.toLowerCase() === "property.basic.price");
                  if (priceField) displayPrice = priceField.field_value;
                }
                
                return (
                  <tr key={prop.id || idx}>
                    <td>
                      <div className={styles.propCell}>
                        <img 
                          src={prop.featured_image || '/property-placeholders.jpg'} 
                          alt="Property" 
                          className={styles.propImage}
                          onError={(e) => { e.target.src = '/property-placeholders.jpg' }}
                        />
                        <div className={styles.propDetails}>
                          <h4>{prop.name || 'Untitled Property'}</h4>
                          <p className={styles.propId}>ID: URP-2026-00{12 - idx}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.locCell}>
                        <FaMapMarkerAlt className={styles.cellIcon} />
                        <div>
                          {prop.city?.name || 'City'}
                          <span className={styles.subText}>{prop.state?.name || 'State'}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.typeCell}>
                        {stats.type === 'Villa' ? <FaHome className={styles.typeIcon} /> : <FaBuilding className={styles.typeIcon} />}
                        {stats.type}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className={styles.priceValue}>{displayPrice}</div>
                        <span className={styles.subText}>{stats.negotiable ? 'Negotiable' : 'Fixed'}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className={`${styles.badge} ${
                          stats.status === 'Active' ? styles.badgeActive : 
                          stats.status === 'Inactive' ? styles.badgeInactive : 
                          styles.badgeExpired
                        }`}>
                          <div className={styles.badgeDot}></div> {stats.status}
                        </div>
                        <span className={styles.subText}>
                          {stats.status === 'Active' ? 'Published on' : stats.status === 'Inactive' ? 'Paused on' : 'Expired on'}
                          <br/>{stats.date}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.statCell}>
                        <FaEye /> {stats.views}
                      </div>
                    </td>
                    <td>
                      <div className={styles.statCell}>
                        <FaUsers /> {stats.leads}
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
              })}
            </tbody>
          </table>
        </div>
        ) : (
          <div className={styles.gridContainer}>
            {displayProperties.map((prop, idx) => {
              const stats = getDummyStats(prop.id || idx);
              
              let displayPrice = "N/A";
              if (prop.custom_field_values) {
                const priceField = prop.custom_field_values.find(f => f.template?.name?.toLowerCase() === "property.basic.price");
                if (priceField) displayPrice = priceField.field_value;
              }

              return (
                <div key={prop.id || idx} className={styles.propertyCard}>
                  <div className={styles.cardImageWrapper}>
                    <img 
                      src={prop.featured_image || '/property-placeholders.jpg'} 
                      alt="Property" 
                      onError={(e) => { e.target.src = '/property-placeholders.jpg' }}
                    />
                    <div className={`${styles.cardBadge} ${
                      stats.status === 'Active' ? styles.badgeActive : 
                      stats.status === 'Inactive' ? styles.badgeInactive : 
                      styles.badgeExpired
                    }`}>
                      <div className={styles.badgeDot}></div>
                      {stats.status}
                    </div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeaderRow}>
                      <div>
                        <h4 className={styles.cardTitle}>{prop.name || 'Untitled Property'}</h4>
                        <p className={styles.cardId}>ID: URP-2026-00{12 - idx}</p>
                      </div>
                      <div className={styles.cardPrice}>
                        <h4>{displayPrice}</h4>
                        <p>{stats.negotiable ? 'Negotiable' : 'Fixed'}</p>
                      </div>
                    </div>

                    <div className={styles.cardInfoRow}>
                      <div className={styles.cardInfoItem}>
                        <FaMapMarkerAlt className={styles.cellIcon} />
                        {prop.city?.name || 'City'}, {prop.state?.name || 'State'}
                      </div>
                    </div>
                    <div className={styles.cardInfoRow}>
                      <div className={styles.cardInfoItem}>
                        {stats.type === 'Villa' ? <FaHome className={styles.typeIcon} /> : <FaBuilding className={styles.typeIcon} />}
                        {stats.type}
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
            })}
          </div>
        )}

        {/* Pagination Row */}
        <div className={styles.paginationRow}>
          <div>Showing 1 to {Math.min(5, displayProperties.length)} of {displayProperties.length} listings</div>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn}>&lt;</button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn}>&gt;</button>
          </div>
          <select className={styles.perPageSelect}>
            <option>Show 5 per page</option>
            <option>Show 10 per page</option>
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
