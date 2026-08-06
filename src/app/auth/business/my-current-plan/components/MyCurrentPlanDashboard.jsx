'use client';
import React from 'react';
import { Skeleton } from '@mui/material';
import { FaCrown } from 'react-icons/fa';
import CurrentMembershipStatus from './CurrentMembershipStatus';
import styles from './MembershipOrdersDashboard.module.css';

const MembershipOrdersDashboard = ({ 
  orders = [], 
  loading = false,
  meta = null,
  currentPage = 1,
  setCurrentPage = () => {},
  perPage = 20,
  setPerPage = () => {}
}) => {
  
  const getBadgeClass = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'paid' || s === 'completed') return styles.badgeSuccess;
    if (s === 'pending') return styles.badgeWarning;
    if (s === 'cancelled' || s === 'failed') return styles.badgeDanger;
    return styles.badgeDefault;
  };

  return (
    <div className={styles.dashboardContainer}>
      <CurrentMembershipStatus />

      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1>Membership Orders</h1>
          <p>View and track your membership subscriptions and payments.</p>
        </div>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Payment Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td><Skeleton variant="text" width="80%" height={24} /></td>
                    <td>
                       <Skeleton variant="text" width="60%" height={24} />
                       <Skeleton variant="text" width="40%" height={16} />
                    </td>
                    <td><Skeleton variant="text" width="50%" height={24} /></td>
                    <td><Skeleton variant="rounded" width={60} height={24} /></td>
                    <td><Skeleton variant="rounded" width={60} height={24} /></td>
                    <td><Skeleton variant="text" width="40%" height={24} /></td>
                    <td><Skeleton variant="text" width="60%" height={24} /></td>
                  </tr>
                ))
              ) : orders.length > 0 ? (
                orders.map((order, idx) => {
                  const planDuration = order.plan?.duration 
                    ? `${order.plan.duration} ${order.plan.duration_type || 'Days'}` 
                    : '30 Days';

                  return (
                    <tr key={order.id || idx}>
                      <td>
                        <span className={styles.orderCode}>{order.order_number}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '26px', height: '26px', borderRadius: '50%',
                            background: '#fff5ed', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            <FaCrown style={{ color: '#fb6a18', fontSize: '12px' }} />
                          </div>
                          <div>
                            <div className={styles.planTitle}>{order.plan?.name || order.plan_name || 'Plan'}</div>
                            <div className={styles.planSubtitle}>{planDuration}</div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.amount}>
                        ₹{order.total_amount !== undefined ? order.total_amount : (order.amount || '0.00')}
                      </td>
                      <td>
                        <span className={`${styles.badge} ${getBadgeClass(order.payment_status)}`}>
                          {order.payment_status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${getBadgeClass(order.order_status)}`}>
                          {order.order_status || 'Pending'}
                        </span>
                      </td>
                      <td style={{ color: '#475569' }}>
                        {order.payment_method || order.gateway_name || '—'}
                      </td>
                      <td style={{ color: '#64748b', fontSize: '13px' }}>
                        {order.created_at || '—'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No membership orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.paginationRow}>
          <div>
            Showing {orders.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, meta?.total || orders.length)} of {meta?.total || orders.length} orders
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
            <option value={10}>Show 10 per page</option>
            <option value={20}>Show 20 per page</option>
            <option value={50}>Show 50 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MembershipOrdersDashboard;
