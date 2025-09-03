import React,{memo} from "react";
import Link from "next/link";
import styles from "./HelpSidebar.module.css";
import { IoIosArrowForward } from "react-icons/io";

const HelpSidebar = ({ activeCategory, activeTopic, activeSubtopic, topics }) => {
  console.log("topics", topics);

  // ✅ directly find active topic from topics
  const currentTopic = topics.find(
    (t) => String(t.id) === String(activeTopic)
  );

  return (
    <nav className={styles.sidebar}>
      {/* If subtopic is active, show subtopics only */}
      {activeSubtopic && currentTopic ? (
        <>
          <div className="d-flex align-item-center mb-3 gap-2">
            <h3 className={styles.sidebarTitle}>{currentTopic.name}</h3>
          </div>
          <ul className={styles.subtopicList}>
            {currentTopic.child_categories?.map((subtopic) => (
              <li
                key={subtopic.id}
                className={`${styles.subtopicItem} ${String(subtopic.id) === String(activeSubtopic) ? styles.active : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: `/help/${subtopic.category.name}/${subtopic.name}`,
                    query: {
                      subcategoryId: subtopic.id,
                      categoryId: activeCategory,
                    },
                  }}
                  className={`${styles.subtopicLink} ${String(subtopic.id) === String(activeSubtopic) ? styles.active : ""
                    }`}
                >
                  <div className="d-flex justify-content-between align-items-center w-full">
                    <div className="d-flex align-items-center">
                      <div className={styles.topicTitleText}>{subtopic.name}</div>
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
        // Otherwise show all topics (from topics array)
        <>
          <div className="d-flex align-item-center mb-3 gap-2">
            <h3 className={styles.sidebarTitle}>Help Topics</h3>
          </div>
          <div>
            <ol className={styles.topicList}>
              {topics.map((topic) => (
                <li
                  key={topic.id}
                  className={`${styles.topicItem} ${String(topic.id) === String(activeTopic) ? styles.active : ""
                    }`}
                >
                  <Link
                    href={{
                      pathname: `/help/${topic.category.name}/${topic.name}`,
                      query: {
                        subcategoryId: topic.id,
                        categoryId: activeCategory,
                      },
                    }}
                    className={styles.topicLink}
                  >

                    <div className="d-flex justify-content-between align-items-center w-full">
                      <div className="d-flex align-items-center">
                        <div className={styles.topicTitleText}>{topic.name}</div>
                      </div>
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

export default memo(HelpSidebar);
