// subtopic
import React from "react";
import { helpTopics } from "@/app/help/data/helpData"; // डेटा को यहाँ इंपोर्ट करें
import HelpSidebar from "../../../components/HelpSidebar/HelpSidebar";
import styles from '../../../components/TopicDetailPage.module.css';
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";
import SubHero from '@/Components/SubHero/SubHero';
import Breadcrumbs from "@/app/help/components/Breadcrumbs/Breadcrumbs";

const SubtopicPage = async ({ params }) => {
    const { category, topic, subtopic } = await params;

    // ... डेटा ढूंढने का कोड (थोड़ा और गहरा)
    const foundCategory = helpTopics.find(cat => cat.id === category);
    const foundTopic = foundCategory?.topics.find(t => t.id === topic);
    const foundSubtopic = foundTopic?.subtopics.find(s => s.id === subtopic);

    if (!foundSubtopic) return <div>Subtopic not found.</div>;

    return (
            <div className={` ${styles.contentLayout} row `}>
                <div className={` ${styles.sidebar} col-12 col-md-4 `}>
                    <Breadcrumbs activeCategory={category} activeTopic={topic} />
                    <HelpSidebar topics={helpTopics} activeCategory={category} activeTopic={topic} activeSubtopic={subtopic} />
                </div>
                <div className={` ${styles.mainContent} col-12 col-md-8 `}>
                 <SubHero subHeroHeading={foundSubtopic.title} subHeroText={""} />

        <div className="d-flex align-item-center justify-content-center">
                    <ul className={styles.questionList}>
                        {foundSubtopic.questions.map(question => (
                            <li key={question.id}>
                                <Link href={`/help/${category}/${topic}/${subtopic}/${question.id}`} className={styles.questionLink}>
                              <div className="d-flex gap-2 ">
                                <div className={` ${styles.icon} d-flex`}>
                                  <IoIosArrowForward /> </div><p className={styles.questionpara}> {question.title}</p></div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
    );
};

export default SubtopicPage;