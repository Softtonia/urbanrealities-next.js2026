import styles from './Dashboard-Tabs.module.css';
import { FaChevronDown, FaSlidersH } from "react-icons/fa";


export default function Dashboardtabs() {
  return (
 <div className={styles.filtersBar}>
      <div className={styles.filterItem}>
        <select>
          <option>Buy</option>
          <option>Rent</option>
        </select>
        <FaChevronDown className={styles.icon} />
      </div>

      <div className={styles.inputItem}>
        <input type="text" placeholder="Enter city, locality..." />
      </div>

      {["Top Localities", "Budget", "Property Type", "BHK", "Posted By"].map((label, i) => (
        <div key={i} className={styles.filterItem}>
          <button>
            {label} <FaChevronDown className={styles.icon} />
          </button>
        </div>
      ))}

      <div className={styles.filterItem}>
        <button>
          <FaSlidersH className={styles.icon} /> More Filters <FaChevronDown className={styles.icon} />
        </button>
      </div>
    </div>  );
}

