import React from 'react';
import { helpTopics } from "@/app/help/data/helpData";
import HelpSidebar from '../../components/HelpSidebar/HelpSidebar';
import styles from '../../components/TopicDetailPage.module.css';
import Link from 'next/link';
import SubHero from '@/Components/SubHero/SubHero';

const TopicDetailPage = async ({ params }) => {
    const { category, topic } = await params;

    const foundCategory = helpTopics.find(cat => cat.id === category);
    if (!foundCategory) return <div>Category not found.</div>;

    const foundTopic = foundCategory.topics.find(t => t.id === topic);
    if (!foundTopic) return <div>Topic not found.</div>;

    return (

        <div className={` ${styles.contentLayout} row `}>
            <div className={` ${styles.sidebar} col-12 col-md-4 `}>
                <HelpSidebar topics={helpTopics} activeCategory={category} activeTopic={topic} />
            </div>
            <div className={` ${styles.mainContent} col-12 col-md-8 `}>
                <SubHero subHeroHeading={foundTopic.title} subHeroText={""} />

                {/* <SubHero subHeroHeading className={styles.topicTitle}>{foundTopic.title}</SubHero> */}
                <ol className={styles.subtopicList}>
                    {foundTopic.subtopics.map(subtopic => ( // ✅ subtopics पर मैप करें
                        <li key={subtopic.id}>
                            <Link href={`/help/${category}/${topic}/${subtopic.id}`} className={styles.subtopicLink}>
                                {subtopic.title}
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default TopicDetailPage;