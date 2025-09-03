// src/app/help/components/Breadcrumbs/Breadcrumbs.jsx
import React from 'react';
import Link from 'next/link';
import { helpTopics } from "@/app/help/data/helpData";
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ activeCategory, activeTopic, activeSubtopic }) => {

  const currentCategory = helpTopics.find(cat => cat.id === activeCategory);
  const currentTopic = currentCategory?.topics.find(t => t.id === activeTopic);
  const currentSubtopic = currentTopic?.subtopics.find(sub => sub.id === activeSubtopic);

 
  const breadcrumbs = [];

  if (currentCategory) {
    breadcrumbs.push({
      title: currentCategory.title,
      href: `/help`,
    });
  }

  if (currentTopic) {
    breadcrumbs.push({
      title: currentTopic.title,
      href: `/help/${currentCategory.id}/${currentTopic.id}`,
    });
  }

  if (currentSubtopic) {
    breadcrumbs.push({
      title: currentSubtopic.title,
      href: `/help/${currentCategory.id}/${currentTopic.id}/${currentSubtopic.id}`,
    });
  }

  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbs.map((item, index) => (
        <span key={index} className={styles.breadcrumbItem}>
          <Link href={item.href} className={styles.link}>
            {item.title}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className={styles.separator}>&gt;</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
