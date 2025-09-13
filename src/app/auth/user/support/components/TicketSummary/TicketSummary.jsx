import styles from "./TicketSummary.module.css";
import CircularProgressRing from "@/Components/CircularProgressRing";
import StatusChart from "../StatusChart/StatusChart";
import { TbPhotoSensor3 } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";

const TicketSummary = () => {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.statItem}>
        <CircularProgressRing
          count={48}
          label=""
          percentage={80}
          color="#37D159"
          stroke="6"
        />
        <div className={styles.statDetails}>
          <p className={styles.statPercentage}>85%</p>
          <p className={styles.statLabel}>Success</p>
        </div>
      </div>

      <div className={styles.statItem}>
        <CircularProgressRing
          count={48}
          label=""
          percentage={80}
          color="#E40E0E"
          stroke="6"
        />
        <div className={styles.statDetails}>
          <p className={styles.statPercentage}>15%</p>
          <p className={styles.statLabel}>Unresolved</p>
        </div>
      </div>

      <div className={styles.statItem}>
        <CircularProgressRing
          count={48}
          label=""
          percentage={80}
          color="#E3E64E"
          stroke="6"
        />
        <div className={styles.statDetails}>
          <p className={styles.statPercentage}>15%</p>
          <p className={styles.statLabel}>Pending</p>
        </div>
      </div>
<div className={styles.totalSection}>
      <div className={styles.totalContent}>
        <p className={styles.totalTitle}>Total: 475</p>

        <p className={styles.totalItem}>
          <button className={`${styles.btn} ${styles.Active}`}>
            <TbPhotoSensor3 />
          </button>
          258 Active
        </p>
        
        <p className={styles.totalItem}>
          <button className={`${styles.btn} ${styles.Closed}`}>
            <FaRegCircleCheck />
          </button>
          258 Closed
        </p>
      </div>
      </div>

      <div className={styles.chartSection}>
        <StatusChart />
      </div>
    </div>
  );
};

export default TicketSummary;
