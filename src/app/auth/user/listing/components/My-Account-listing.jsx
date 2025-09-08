import styles from './My-Account-listing.module.css';
import { FaBell } from "react-icons/fa";

export default function MyAccountlisting({ data }) {
  const templates = [

    "property.basic.price",

  ];
  const fieldData = templates.map((templateLabel) => {
    const field = data?.custom_field_values?.find(
      (f) => { const tmp = (f.template.name).toLowerCase(); return tmp === templateLabel }
    );

    if (!field || !field.field_value) return null;

    return {
      label: field.field_label, // pretty label
      value: Array.isArray(field.field_value)
        ? field.field_value.join(", ")
        : field.field_value,
    };
  }).filter(Boolean);

  console.log(fieldData)
  return (
    <div className={` ${styles.card} `}>
      {/* Image with Verified tag */}
      <div className={` ${styles.imageWrapper} `}>
        <span className={styles.verified}>Verified</span>
        <img
          src={data.featured_image}
          alt="Property"
          className={styles.image}
        />
      </div>

      {/* Details Section */}
      <div className={` ${styles.details} `}>
        <div className={styles.statusRow}>
          <span className={styles.approved}>{data.live_status}</span>
          <FaBell className={styles.bellIcon} />
        </div>

        <div className={styles.price}>{fieldData.value}</div>

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
