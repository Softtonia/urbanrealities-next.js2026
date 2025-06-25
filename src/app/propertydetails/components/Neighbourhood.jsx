// components/Neighbourhood/Neighbourhood.js
import styles from './Neighbourhood.module.css';

const Neighbourhood = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Neighbourhood</h3>

      <div className={styles.topRow}>
        <div className={styles.locationWrapper}>
          <span className={styles.locationIcon}>📍</span>
          <select className={styles.dropdown}>
            <option value="">Location</option>
          </select>
          <input className={styles.input} placeholder="locality, city" />
          <button className={styles.getDirectionBtn}>Get Direction</button>
        </div>

        <div className={styles.tabs}>
          <span className={`${styles.tab} ${styles.active}`}>Transit</span>
          <span className={styles.tab}>Essentials</span>
          <span className={styles.tab}>Utility</span>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.mapContainer}>
          {/* Use <Image> from next/image for optimization */}
          {/* <img
            src="/neighbourhood-map.png"
            alt="Map"
            className={styles.map}
          /> */}
        </div>
        <div className={styles.listContainer}>
          <div className={styles.transitItem}>
            <span>Saket M-Block</span>
            <span>2min/350m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Neighbourhood;
