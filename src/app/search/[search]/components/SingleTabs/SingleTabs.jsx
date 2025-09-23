'use client';

import styles from './SingleTabs.module.css';
import { useState } from 'react';

export default function SingleTabs({ activeTab, setActiveTab, searchResults }) {
  // const [activeTab, setActiveTab] = useState('BUY');
  const property_count = searchResults?.properties?.length ?? 0;
  const project_count  = searchResults?.projects?.length ?? 0;
  const agent_count    = searchResults?.agents?.length ?? 0;
  
  const tabs = [
    { name: "Properties", count: property_count },
    { name: "New Project", count: project_count },
    { name: "Top Agent", count: agent_count }
  ];
  
  return (
    <div className={styles.filtersContainer}>
      {/* Top Tabs */}
      <div className={styles.tabRow}>
        {tabs.map((tab,id) => (
          <button
            key={id}
            className={`${styles.tabButton} ${activeTab === tab.name ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}({tab.count})
          </button>
        ))}
      </div>


    </div>
  );
}
