import React, { act, memo } from "react";
import Link from "next/link";
import styles from "./HelpSidebar.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { deslugify, extractIdFromSlug, slugify } from "@/utils/slugify";

const HelpSidebar = ({ activeCategory, activeTopic, activeSubtopic, topics, active, mode }) => {
  console.log("topics", topics);

  // ✅ directly find active topic from topics
  const currentTopic = topics.find(
    (t) => String(t.id) === String(active)
  );
  const activeHadingTopic =deslugify(activeTopic)
  const activeSub = extractIdFromSlug(active)
  console.log(activeCategory)
  console.log(activeTopic)
  console.log('==>>>', activeSub)
  console.log(topics)
  return (
    <nav className={styles.sidebar}>
      {/* If subtopic is active, show subtopics only */}
      {activeSub && currentTopic ? (
        <>
          <div className="d-flex align-item-center mb-3 gap-2">
            <h3 className={styles.sidebarTitle}>{activeHadingTopic}</h3>
          </div>
          <ul className={styles.subtopicList}>

            {topics.map((subtopic) => {
              const slug = slugify(`${subtopic.name || subtopic.title} ${subtopic.id}`);

              let url = "";
              if (mode === "subcategory") {
                url = `/help/${activeCategory}/${slug}`;
              } else if (mode === "childCategory") {
                url = `/help/${activeCategory}/${activeTopic}/${slug}`;
              } else if (mode === "articles") {
                url = `/help/${activeCategory}/${activeTopic}/${activeSubtopic}/${slug}`;
              } else {
                url = `/help/${activeCategory}/${slug}`;
              }
              return (
                <li
                  key={subtopic.id}
                  className={`${styles.subtopicItem} ${String(subtopic.id) === String(activeSub) ? styles.active : ""
                    }`}
                >
                  <Link
                    href={url}

                    className={`${styles.subtopicLink} ${String(subtopic.id) === String(activeSub) ? styles.active : ""
                      }`}
                  >
                    {/* =={String(subtopic.id) === String(activeSub) } */}

                    <div className="d-flex justify-content-between align-items-center w-full">
                      <div className="d-flex align-items-center">
                        <div className={styles.topicTitleText}>{subtopic.name ? subtopic.name : subtopic.title}</div>
                      </div>
                      <div className={styles.arrowIcon}>
                        <IoIosArrowForward />
                      </div>
                    </div>
                  </Link>

                </li>
              )
            })}
          </ul>
        </>
      ) : (
        // Otherwise show all topics (from topics array)
        <>
          <div className="d-flex align-item-center mb-3 gap-2">
            <h3 className={styles.sidebarTitle}>Help Topics</h3>
          </div>
          <div>
            <ol className={styles.topicList}>
              {topics.map((topic) => {
                const slug = slugify(`${topic.name || topic.title} ${topic.id}`);

                let url = "";
                if (mode === "subcategory") {
                  url = `/help/${activeCategory}/${slug}`;
                } else if (mode === "childcategory") {
                  url = `/help/${activeCategory}/${activeTopic}/${slug}`;
                } else if (mode === "articles") {
                  url = `/help/${activeCategory}/${activeTopic}/${activeSubtopic}/${slug}`;
                } else {
                  url = `/help/${activeCategory}/${slug}`;
                }
                return (
                  <li
                    key={topic.id}
                    className={`${styles.topicItem} ${String(topic.id) === String(activeSub) ? styles.active : ""
                      }`}
                  >
                    <Link
                      href={url}
                      className={styles.topicLink}
                    >

                      <div className="d-flex justify-content-between align-items-center w-full">
                        <div className="d-flex align-items-center">
                          <div className={styles.topicTitleText}>{topic.name ? topic.name : topic.title}</div>
                        </div>
                        <div className={styles.arrowIcon}>
                          <IoIosArrowForward />
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </>
      )}
    </nav>
  );
};

export default memo(HelpSidebar);
