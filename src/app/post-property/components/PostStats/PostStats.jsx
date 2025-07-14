import styles from './PostStats.module.css';
import Image from 'next/image';

export default function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.backgroundImage}>
        <div className={styles.overlayBox}>
          <p className={` body-text-20 ${styles.description}`}>
            With over 7 million unique visitors monthly, your property gets maximum visibility on Urbanrealities
          </p>
          
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={` top-heading ${styles.statSpan} `}> 1M</span>
              <p>Property Listing</p>
            </div>
            <div className={styles.statItem}>
             <span className={` top-heading ${styles.statSpan} `}> 2.7M</span>
              <p>Monthly Searches</p>
            </div>
            <div className={styles.statItem}>
              <span className={` top-heading ${styles.statSpan} `}> 270K</span>
              <p>Owner Advertising Monthly</p>
            </div>
          </div>
        </div>

         <div className={styles.MobileoverlayBox}>
          <p className={` body-text-20 ${styles.description}`}>
            With over 7 million unique visitors monthly, your property gets maximum visibility on Urbanrealities
          </p>
          </div>
      </div>
    </section>
  );
}
