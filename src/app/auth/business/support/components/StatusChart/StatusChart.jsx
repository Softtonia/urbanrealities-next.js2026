import styles from "./StatusChart.module.css";

export default function StatusChart() {
  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <div className={`${styles.segment} ${styles.assigned}`}></div>
        <div className={`${styles.segment} ${styles.completed}`}></div>
        <div className={`${styles.segment} ${styles.resolved}`}></div>
        <div className={`${styles.segment} ${styles.inProgress}`}></div>
        <div className={`${styles.segment} ${styles.open}`}></div>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.colorDot} ${styles.openDot}`}></div>
          Open
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.colorDot} ${styles.inProgressDot}`}></div>
          In progress
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.colorDot} ${styles.resolvedDot}`}></div>
          Resolved
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.colorDot} ${styles.completedDot}`}></div>
          Completed
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.colorDot} ${styles.assignedDot}`}></div>
          Assigned
        </div>
      </div>
    </div>
  );
}
