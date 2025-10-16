'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './TestimonialCard.module.css';
import { FaStar } from "react-icons/fa";

const MAX_LENGTH = 120; // number of characters to show before truncating

const TestimonialCard = ({ avatarSrc, name, location, rating, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(prev => !prev);
  };

  const displayText =
    text.length > MAX_LENGTH && !isExpanded
      ? `${text.substring(0, MAX_LENGTH)}...`
      : text;

  return (
    <div className={styles['testimonial-card']}>
      <p className={styles['testimonial-text']}>
        "{displayText}"
        {text.length > MAX_LENGTH && (
          <span
            className={styles['read-more']}
            onClick={toggleReadMore}
          >
            {isExpanded ? ' Less' : ' More'}
          </span>
        )}
      </p>

      <div className={styles['testimonial-footer']}>
        {avatarSrc && (
          <Image
            src={avatarSrc}
            alt={name}
            width={44}
            height={44}
            className={styles.avatar}
          />
        )}
        <div className={styles['author-section']}>
          {/* Uncomment below if you want to show stars */}
          <div className={styles.rating}>
            {Array.from({ length: 3 }, (_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <div className={styles['author-info']}>
            <p className={styles['author-name']}>{name}</p>
            <p className={styles['author-location']}>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
