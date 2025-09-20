'use client';

import styles from './SingleTabs.module.css';
import { useState } from 'react';

export default function SingleTabs({ activeTab, setActiveTab }) {
  // const [activeTab, setActiveTab] = useState('BUY');

  const tabs = ['Properties (count)', 'New Project ', ' Top Agent'];

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
