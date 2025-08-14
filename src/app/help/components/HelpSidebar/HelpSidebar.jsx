// src/app/help/components/HelpSidebar/HelpSidebar.jsx
import React from "react";
import Link from "next/link";
import styles from "./HelpSidebar.module.css";
import { helpTopics } from "@/app/help/data/helpData";
import { IoIosArrowForward } from "react-icons/io";

const HelpSidebar = ({ activeCategory, activeTopic, activeSubtopic }) => {
  const currentCategory = helpTopics.find((cat) => cat.id === activeCategory);
  const currentTopic = currentCategory?.topics.find(
    (t) => t.id === activeTopic
  );

  if (!currentCategory) {
    return null;
  }

  return (
    <nav className={styles.sidebar}>
      {/* 1. अगर activeSubtopic मौजूद है, तो सिर्फ़ subtopics दिखाएँ */}
      {activeSubtopic && currentTopic?.subtopics ? (
        <>
     <div className="d-flex align-item-center mb-3 gap-2" >
        {/* <div className={styles.icon}>   {currentTopic.usericon}</div> */}
          <h3 className={styles.sidebarTitle}>
          {currentTopic.title}
          </h3>
          </div> 
            <ul className={styles.subtopicList}>
            {currentTopic.subtopics.map((subtopic) => (
              <li key={subtopic.id}
                className={`${styles.subtopicItem} ${
                  subtopic.id === activeSubtopic ? styles.active : ""
                }`}
              >
                <Link
                  href={`/help/${activeCategory}/${activeTopic}/${subtopic.id}`}
                  className={`${styles.subtopicLink} ${
                    subtopic.id === activeSubtopic ? styles.active : ""
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-center w-full">
                    <div className="d-flex align-items-center">

                      <div className={styles.topicTitleText}>{subtopic.title}</div>
                    </div>
                    <div className={styles.arrowIcon}>
                      <IoIosArrowForward />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        // 2. अगर activeSubtopic नहीं है, तो सभी topics दिखाएँ
        <>
        <div className="d-flex align-item-center mb-3 gap-2" >
        <div className={styles.icon}>   {currentTopic.usericon}</div>
          <h3 className={styles.sidebarTitle}>
          {currentTopic.title}
          </h3>
          </div>
          <div className="">
          <ol className={styles.topicList}>
            {currentCategory.topics.map((topic) => (
              <li
                key={topic.id}
                className={`${styles.topicItem} ${
                  topic.id === activeTopic ? styles.active : ""
                }`}
              >
                <Link
                  href={`/help/${currentCategory.id}/${topic.id}`}
                  className={styles.topicLink}
                >
                  <div className="d-flex justify-content-between align-items-center w-full">
                    <div className="d-flex align-items-center">
                      {/* {topic.usericon && (
                      <span className={styles.icon}>{topic.usericon}</span>
                    )} */}
                      <div className={styles.topicTitleText}>{topic.title}</div>
                    </div>
                    {/* {topic.subtopics && <div className={styles.arrowIcon}><IoIosArrowForward /></div>} */}
                    <div className={styles.arrowIcon}>
                      <IoIosArrowForward />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          </div>
        </>
      )}
    </nav>
  );
};

export default HelpSidebar;
