import Image from 'next/image';
import styles from './TestimonialCard.module.css'; // Import the CSS module
import {FaStar } from "react-icons/fa";

const TestimonialCard = ({ avatarSrc, name, location, rating, text }) => {
  return (
    <div className={styles['testimonial-card']}> {/* Use styles.className */}
      <p className={styles['testimonial-text']}>
        "{text} <span className={styles['read-more']}>More</span>"
      </p>
      <div className={styles['testimonial-footer']}>
        {avatarSrc && (
          <Image
            src={avatarSrc}
            alt={name}
            width={44}
            height={44}
            className={styles.avatar} // Use styles.avatar
          />
        )}
        <div className={styles['author-section']}>
          <div className={styles.rating}>
            {Array.from({ length: rating }, (_, i) => (
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