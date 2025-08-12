import React from 'react';
import styles from "./Help-bg.module.css"
const Helpbg = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={`${styles.container} container`}>
        <h2 className={styles.title}>
          Find Buy, Rent, Sell Property in India
        </h2>
        <div className={`${styles['span-tag']}`}>
        <div className={`${styles['sell-rent']}`}></div>
        </div>
        </div>
      </div>
  </section>
  );
}

export default Helpbg;
