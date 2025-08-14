import React from "react";
import { helpTopics } from "@/app/help/data/helpData"; // डेटा को यहाँ इंपोर्ट करें
import HelpSidebar from "../../components/HelpSidebar/HelpSidebar";
import styles from "../../components/TopicDetailPage.module.css";
import Link from "next/link";
import SubHero from "@/Components/SubHero/SubHero";
import { IoIosArrowForward } from "react-icons/io";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const TopicDetailPage = async ({ params }) => {
  const { category, topic } = await params;

  const foundCategory = helpTopics.find((cat) => cat.id === category);
  if (!foundCategory) return <div>Category not found.</div>;

  const foundTopic = foundCategory.topics.find((t) => t.id === topic);
  if (!foundTopic) return <div>Topic not found.</div>;

  return (
    <div className={` ${styles.contentLayout} row `}>
      <div className={` ${styles.sidebar} col-12 col-lg-4   `}>
        <Breadcrumbs activeCategory={category} activeTopic={topic} />

        <HelpSidebar
          topics={helpTopics}
          activeCategory={category}
          activeTopic={topic}
        />
      </div>
      <div className={` ${styles.mainContent} col-12 col-lg-8`}>
        <SubHero subHeroHeading={foundTopic.title} subHeroText={""} />
        <div className="d-flex align-item-center justify-content-center">
        <ul className={styles.subtopicList}>
          {foundTopic.subtopics.map(
            (
              subtopic // ✅ subtopics पर मैप करें
            ) => (
              <li key={subtopic.id}>
                <Link
                  href={`/help/${category}/${topic}/${subtopic.id}`}
                  className={styles.subtopicLink}
                >
                  <IoIosArrowForward /> {subtopic.title}
                </Link>
              </li>
            )
          )}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;
