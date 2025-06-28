import styles from './My-Account-listing.module.css';
import Image from 'next/image';
import { FaBell } from "react-icons/fa";

export default function MyAccountlisting({ data }) {
  return (
    <div className={styles.card}>
      {/* Image with Verified tag */}
      <div className={styles.imageWrapper}>
        <span className={styles.verified}>Verified</span>
        <Image
          src={data.imageUrl}
          alt="Property"
          width={268}
          height={242}
          className={styles.image}
        />
      </div>

      {/* Details Section */}
      <div className={styles.details}>
        <div className={styles.statusRow}>
          <span className={styles.approved}>Approve</span>
          <FaBell className={styles.bellIcon} />
        </div>

        <div className={styles.price}>{data.price}</div>

        <p className={styles.infoLine}>
          <strong>{data.bhk}</strong> &nbsp; {data.type} &nbsp; {data.size}
        </p>

        <p className={styles.infoLine}>
          {data.location} <span className={styles.projectName}>{data.projectName}</span>
        </p>

        <p className={styles.infoLine}>
          Available for <span className={styles.highlight}>{data.availableFor}</span>
        </p>

        <p className={styles.infoLine}>
          Carpet Area <span className={styles.highlight}>{data.carpetArea}</span>
        </p>

        <div className={styles.actionLinks}>
          <a className={styles.blueLink}>View Insight</a>
          <a className={styles.orangeLink}>Manage Property</a>
        </div>
      </div>
    </div>
  );
}
