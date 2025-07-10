import styles from './PostStats.module.css';
import Image from 'next/image';

export default function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.backgroundImage}>
        <div className={styles.overlayBox}>
          <p className={` body-text-20 ${styles.description}`}>
            With over 7 million unique visitors monthly, your property gets maximum visibility on <br/> Urbanrealities
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3 className='top-heading'>1M</h3>
              <p>Property Listing</p>
            </div>
            <div className={styles.statItem}>
              <h3 className='top-heading'>2.7M</h3>
              <p>Monthly Searches</p>
            </div>
            <div className={styles.statItem}>
              <h3 className='top-heading'>270K</h3>
              <p>Owner Advertising Monthly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
