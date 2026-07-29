import React, { useState, useEffect } from 'react';
import styles from './KycTimeline.module.css';
import { LARAVEL_API_BASE_URL, LARAVEL_APPLICATION_PASSWORD, APP_TYPE } from '@/lib/config';
import { FaClock, FaCheckCircle, FaTimesCircle, FaUpload } from 'react-icons/fa';

const KycTimeline = ({ token }) => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await fetch(`${LARAVEL_API_BASE_URL}/api/kyc/timeline?per_page=20`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
          }
        });
        const data = await res.json();
        if (data.status && data.data) {
          setTimeline(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch timeline", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchTimeline();
    }
  }, [token]);

  if (loading) {
    return <div className={styles.loading}>Loading timeline...</div>;
  }

  if (timeline.length === 0) {
    return <div className={styles.empty}>No timeline events found.</div>;
  }

  const getIcon = (action) => {
    if (action.includes('rejected')) return <FaTimesCircle style={{ color: '#E53E3E' }} />;
    if (action.includes('submitted') || action.includes('uploaded')) return <FaUpload style={{ color: '#3182CE' }} />;
    if (action.includes('approved')) return <FaCheckCircle style={{ color: '#38A169' }} />;
    return <FaClock style={{ color: '#D69E2E' }} />;
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineList}>
        {timeline.map((event, idx) => (
          <div key={event.id} className={styles.timelineItem}>
            <div className={styles.iconWrapper}>{getIcon(event.action)}</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.action}>{event.action.replace(/_/g, ' ')}</span>
                <span className={styles.time}>{event.created_at_human}</span>
              </div>
              <p className={styles.remarks}>{event.remarks}</p>
              <div className={styles.performer}>By {event.performer?.full_name || 'System'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KycTimeline;
