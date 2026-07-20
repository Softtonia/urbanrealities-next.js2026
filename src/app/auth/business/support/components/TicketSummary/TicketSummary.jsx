'use client'
import { useEffect, useState } from "react";
import styles from "./TicketSummary.module.css";
import CircularProgressRing from "@/Components/CircularProgressRing";
import StatusChart from "../StatusChart/StatusChart";
import { TbPhotoSensor3 } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";

const TicketSummary = () => {
   const [radius, setRadius] = useState(45);

     useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 855) {  // Mobile
        setRadius(35);
      } else {  // Desktop
        setRadius(45);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.statSection}>
      <div className={styles.statItem}>
        <CircularProgressRing
          count={48}
          label=""
          percentage={80}
          color="#37D159"
          stroke="6"
          radius={radius}
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
          radius={radius}
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
          radius={radius}
        />
        <div className={styles.statDetails}>
          <p className={styles.statPercentage}>15%</p>
          <p className={styles.statLabel}>Pending</p>
        </div>
      </div>
</div>

      <div className={styles.chartcontent}>
      <div className={styles.totalSection}>
        <div className={styles.totalContent}>
          <p className={styles.totalTitle}>Total: 475</p>

          <p className={styles.totalItem}>
            <button className={`${styles.btn} ${styles.Active}`}>
              <TbPhotoSensor3 />
            </button>
            258 <small>Active</small>
          </p>

          <p className={styles.totalItem}>
            <button className={`${styles.btn} ${styles.Closed}`}>
              <FaRegCircleCheck />
            </button>
            258<small> Closed</small>
          </p>
        </div>
      </div>

      <div className={styles.chartSection}>
        <StatusChart />
      </div>
      </div>
    </div>
  );
};

export default TicketSummary;
