'use client';

import { useState } from "react";
import styles from "./FAQAccordion.module.css";
import { FaSortDown } from "react-icons/fa";


const faqData = [
  "How can I sell my property faster2?",
  "How can I sell my property faster?",
  "How can I sell my property faster?",
  "How can I sell my property faster?",
  "How can I sell my property faster?",
  "How can I sell my property faster?",
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.title}>FAQ</h2>
      {faqData.map((question, index) => (
        <div
          key={index}
          className={`${styles.faqItem} ${
            activeIndex === index ? styles.active : ""
          }`}
          onClick={() => toggleFAQ(index)}
        >
          <div className={styles.question}>
            {question}
            <FaSortDown
              className={`${styles.icon} ${
                activeIndex === index ? styles.rotate : ""
              }`}
            />
          </div>
          {activeIndex === index && (
            <div className={styles.answer}>
              You can improve your chances by staging your home, pricing it
              competitively, and hiring a good agent.
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
