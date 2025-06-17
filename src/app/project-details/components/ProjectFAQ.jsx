import React, { useState } from 'react';
import styles from './ProjectFAQ.module.css';
const faqs = [
  {
    question: 'Is Mundeshwari Connaught One a good place to live?',
    answer:
      'Mundeshwari Connaught One is one of the best projects in Connaught Place to live in. With great transportation connectivity and impeccable modern amenities, this project will delight you in every way. Most of the offices and shopping complexes are also located nearby.',
  },
  {
    question: 'What is the RERA number of Mundeshwari Connaught One?',
    answer:
      'The RERA number of Mundeshwari Connaught One is DLERA2022P0001-1. You can easily find it on RERA official website.',
  },
  {
    question: 'How many flats are available for sale in Mundeshwari Connaught One on Magicbricks?',
    answer:
      'There are a total of 5 flats available for sale on Magicbricks. These flats offer prime facilities such as 24hour water, 24hour security, 100% power backup and maintenance staff making it a fine residential destination.',
  },
  {
    question: 'What is the address of Mundeshwari Connaught One?',
    answer:
      'The address of Mundeshwari Connaught One is Godrej Connaught One, Shaheed Bhagat Singh Marg, Connaught Place, New Delhi - 110001, 110001.',
  },
  {
    question: 'Which is nearest bus stop to Godrej Connaught One?',
    answer:
      'Palika Kendra Bus Stop is located near to the Godrej Connaught One. It is the only nearest bus stop & is located at a distance of 0.0 Kms.',
  },
];
const ProjectFAQ = () => {
      const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };
  return (
    <div>
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
              <span className={styles.question}>{faq.question}</span>
              <span className={styles.toggleIcon}>{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className={styles.faqContent}>
                <span className={styles.ansBadge}>Ans</span>
                <p className={styles.answer}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}

export default ProjectFAQ;
