'use client';

import styles from './SingleTabs.module.css';
import { useState } from 'react';

export default function SingleTabs({ activeTab, setActiveTab, searchResults, comeFirst }) {
  // const [activeTab, setActiveTab] = useState('BUY');
  const property_count = searchResults?.properties?.length ?? 0;
  const project_count = searchResults?.projects?.length ?? 0;
  const agent_count = searchResults?.agents?.length ?? 0;

  let tabs = [
    { name: "Properties", count: property_count },
    { name: "New Project", count: project_count },
    { name: "Top Agent", count: agent_count }
  ];
  if (comeFirst === "New Project") {
    tabs = [
      { name: "New Project", count: project_count },
      { name: "Properties", count: property_count },
      { name: "Top Agent", count: agent_count }
    ];
  } else if (comeFirst === "Top Agent") {
    tabs = [
      { name: "Top Agent", count: agent_count },
      { name: "Properties", count: property_count },
      { name: "New Project", count: project_count },
    ];
  } else {
    tabs = [
      { name: "Properties", count: property_count },
      { name: "New Project", count: project_count },
      { name: "Top Agent", count: agent_count },
    ];
  }


  return (
    <div className={styles.filtersContainer}>
      {/* Top Tabs */}
      <div className={styles.tabRow}>
        {tabs.map((tab, id) => (
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
