// subtopic
import React from "react";
import { helpTopics } from "@/app/help/data/helpData"; // डेटा को यहाँ इंपोर्ट करें
// import Helpbg from "../../../components/Help-bg/Help-bg";
import HelpSidebar from "../../../components/HelpSidebar/HelpSidebar";
import styles from '../../../components/SubTopicDetailPage.module.css';
import Link from 'next/link';



const SubtopicPage = async ({ params }) => {
    const { category, topic, subtopic } = await params;

    // ... डेटा ढूंढने का कोड (थोड़ा और गहरा)
    const foundCategory = helpTopics.find(cat => cat.id === category);
    const foundTopic = foundCategory?.topics.find(t => t.id === topic);
    const foundSubtopic = foundTopic?.subtopics.find(s => s.id === subtopic);

    if (!foundSubtopic) return <div>Subtopic not found.</div>;

    return (
            <div className={styles.contentLayout}>
                <div className={styles.sidebar}>
                    <HelpSidebar topics={helpTopics} activeCategory={category} activeTopic={topic} activeSubtopic={subtopic} />
                </div>
                <div className={styles.mainContent}>
                    <h1>{foundSubtopic.title}</h1>
                    <ul className={styles.questionList}>
                        {foundSubtopic.questions.map(question => (
                            <li key={question.id}>
                                <Link href={`/help/${category}/${topic}/${subtopic}/${question.id}`} className={styles.questionLink}>
                                    {question.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
};

export default SubtopicPage;