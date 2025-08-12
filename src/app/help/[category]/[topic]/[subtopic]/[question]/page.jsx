import React from "react";
import { helpTopics } from "@/app/help/data/helpData";
import HelpSidebar from "../../../../components/HelpSidebar/HelpSidebar";
import styles from "../../../../components/QuestionPage.module.css";
import Link from "next/link";
const QuestionPage =async ({ params }) => {
    // ✅ params को await करें
    const { category, topic, subtopic, question } = await params;

    // Optional Chaining (?. ) का उपयोग करें ताकि कोड क्रैश न हो
    const foundCategory = helpTopics.find((cat) => cat.id === category);
    const foundTopic = foundCategory?.topics.find((t) => t.id === topic);
    const foundSubTopic = foundTopic?.subtopics.find((t) => t.id === subtopic); // ✅ Typo और केस सेंसिटिविटी ठीक की गई
    const foundQuestion = foundSubTopic?.questions.find((q) => q.id === question);

    if (!foundQuestion) {
        return <div>Question not found.</div>;
    }
  return (
      <div className={styles.contentLayout}>
        <div className={styles.sidebar}>
          <HelpSidebar
            topics={helpTopics}
            activeCategory={category}
            activeTopic={topic}
            activeSubtopic={subtopic}
            activeQuestion={question}
          />
        </div>
        <div className={styles.mainContent}>
          <h1 className={styles.questionTitle}>{foundQuestion.title}</h1>
          <div
            className={styles.questionContent}
            dangerouslySetInnerHTML={{ __html: foundQuestion.content }}
          />
        </div>
      </div>
  );
};

export default QuestionPage;
