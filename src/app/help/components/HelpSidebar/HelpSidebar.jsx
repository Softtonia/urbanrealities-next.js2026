// src/app/help/components/HelpSidebar/HelpSidebar.jsx
import React from 'react';
import Link from 'next/link';
import styles from './HelpSidebar.module.css';
import { helpTopics } from "@/app/help/data/helpData";

const HelpSidebar = ({ activeCategory, activeTopic, activeSubtopic }) => {
  const currentCategory = helpTopics.find(cat => cat.id === activeCategory);
  const currentTopic = currentCategory?.topics.find(t => t.id === activeTopic);
  
  if (!currentCategory) {
    return null;
  }
  
  return (
    <nav className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>{currentCategory.title}</h3>
      
      <ol className={styles.topicList}>
        {currentCategory.topics.map(topic => (
          <li
          key={topic.id}
          className={`${styles.topicItem} ${topic.id === activeTopic ? styles.active : ''}`}
          >
            <div className={styles["help-tittle"]}>
              <div className={styles.icon}>{topic.icon}</div>
              {/* <h3>{topic.title}</h3> */}
            </div>            {/* यह लिंक हमेशा दिखेगा */}
            <Link
              href={`/help/${currentCategory.id}/${topic.id}`}
              className={styles.topicLink}
            >
              <span className={styles.topicTitleText}>{topic.title}</span>
              <span className={styles.arrowIcon}>&gt;</span>
            </Link>

            {/* ✅ यह कंडीशन यहाँ ज़रूरी है */}
            {topic.id === activeTopic && topic.subtopics && (
              <ul className={styles.subtopicList}>
                {topic.subtopics.map(subtopic => (
                  <li key={subtopic.id}>
                    <Link
                      href={`/help/${currentCategory.id}/${topic.id}/${subtopic.id}`}
                      className={`${styles.subtopicLink} ${subtopic.id === activeSubtopic ? styles.active : ''}`}
                    >
                      {/* {subtopic.title} */}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default HelpSidebar;
