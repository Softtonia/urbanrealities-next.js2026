"use client";
import React, { useState, useEffect } from 'react';
import styles from './ProjectFAQ.module.css';
import { useDeveloper } from '@/app/developer-detail/context/DeveloperContext';

const ProjectFAQ = () => {
  const { developer, setSection ,section} = useDeveloper();
  // console.log("Developer in Stats:", developer);

  const home = developer?.repeater_fields?.filter(
    (val) =>
      val?.template?.slug?.startsWith("builder") &&
      val?.template?.slug.includes("faq")
  ) || [];

  const faqslist = home.find(val =>
    val?.template?.slug.includes("faq")
  )?.field_value;
  const faqs = faqslist?.filter(item => item[0].field_value !== null && item[0].field_value !== undefined);
  console.log("FAQ Data:", faqs);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  // ✅ FIXED: Move setSection to useEffect
  useEffect(() => {
    const noFAQs = !faqs || faqs.length === 0;

    setSection(prev => {
      if (prev.FAQ === !noFAQs) return prev; // skip if already correct
      return { ...prev, FAQ: !noFAQs };
    });
  }, [faqs, setSection]);

  console.log("faqss==>", faqs)
      console.log("sections",section)
  
  return (
    <div>
      {faqs && faqs.length > 0 && (
        <section className={styles.faqWrapper}>
          <h2 className={styles.title}>Frequently asked questions</h2>
          <div className={styles.accordion}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqHeader}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={styles.quesBadge}>Ques</span>
                  <span className={styles.question}>{faq[0].field_value}</span>
                  <span className={styles.toggleIcon}>{activeIndex === index ? '-' : '+'}</span>
                </button>
                {activeIndex === index && (
                  <div className={styles.faqContent}>
                    <span className={styles.ansBadge}>Ans</span>
                    <div
                      className={styles.answer}
                      dangerouslySetInnerHTML={{ __html: faq[1].field_value }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectFAQ;
