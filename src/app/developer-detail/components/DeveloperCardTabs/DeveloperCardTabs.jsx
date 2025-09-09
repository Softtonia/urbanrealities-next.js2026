'use client';

import styles from './DeveloperCardTabs.module.css';
import { useState } from 'react';

export default function SingleTabs() {
  const [activeTab, setActiveTab] = useState('BUY');

  const tabs = ['All Cities', 'Project Type ', ' Status'];

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


    </div>
  );
}
