import {
  FaMapMarkerAlt,
  FaShareAlt,
  FaCheckCircle,
  FaRegBookmark,
  FaBuilding,
  FaBed,
  FaRulerCombined,
} from "react-icons/fa";
import { MdOutlineChair, MdOutlineCorporateFare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import styles from "./ProjectCard.module.css";

export default function ProjectCard() {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          <span className={styles.badge}>Featured</span>
          <FaRegBookmark className={styles.tagIconOnImage} />
          <img
            src="/image-card.png"
            alt="Property"
            className={`${styles["image-card"]}`}
          />
        </div>
      </div>
      <div className={styles.cardCenter}>
        <div className={styles.titleRow}>
          <h3>3BHK Flat for Sale in New Delhi</h3>
          <FaShareAlt className={styles.shareIcon} />
        </div>
        <p className={styles.location}>
          <FaMapMarkerAlt className={styles.locationIcon} /> New Ashok Nagar,
          Near Metro Station
        </p>
        <div className={styles.cardtags}>
          <span className={styles.cardtag}>
            <MdOutlineChair className={styles["card-icon"]} />
            3BHK
          </span>
          <span className={styles.cardtag}>
            <MdOutlineCorporateFare className={styles["card-icon"]} />
            4–5 Floor
          </span>
          <span className={styles.cardtag}>
            <FaRulerCombined className={styles["card-icon"]} />
            1700sqft.
          </span>
        </div>
        <p className={styles.owner}>Ganesh Property</p>
        <div className={styles.details}>
          <p>
            <FaRegCircleCheck className={styles["card-check"]} /> For: Sell
          </p>
          <p>
            <FaRegCircleCheck className={styles["card-check"]} /> Property: Residentials
          </p>
        </div>
          <div className={styles.details}>
          <p>
            <FaRegCircleCheck className={styles["card-check"]} /> Property Type: Flats
          </p>
          <p>
            <FaRegCircleCheck className={styles["card-check"]} /> Newly Constructed Property
          </p></div>
        <p className={styles.description}>
          3 bhk newly constructed semi furnished flat with modular kitchen
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.pricesection}>
        <p className={styles.price}>$ 56000</p>
        <button className={styles.button}>Contact Agent</button>
        </div>
      </div>
    </div>
  );
}
