import styles from './PropertyTabs.module.css';
import { useState } from 'react';

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState('BUY');
  const [activeBHK, setActiveBHK] = useState('All');

  const tabs = ['BUY', 'RENT', 'TOP ADVERTISERS'];
  const bhkOptions = ['All', '3 BHK', '4 BHK'];

  return (
    <div className={styles.filtersContainer}>
      {/* Top Tabs */}
      <div className={styles.tabRow}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BHK Filters */}
      <div className={styles.bhkRow}>
        {bhkOptions.map((bhk) => (
          <button
            key={bhk}
            className={`${styles.bhkButton} ${activeBHK === bhk ? styles.active : ''}`}
            onClick={() => setActiveBHK(bhk)}
          >
            {bhk}
          </button>
        ))}
      </div>
    </div>
  );
}
