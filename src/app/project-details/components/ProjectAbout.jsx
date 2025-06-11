// components/AboutProject.jsx
import styles from "./ProjectAbout.module.css";
import {
  FaRulerCombined,
  FaCalendarAlt,
  FaKey,
  FaBuilding,
  FaBed,
  FaDownload,
} from "react-icons/fa";

export default function AboutProject() {
  return (
    <div className={styles["aboutProject-container"]}>
      <h2 className={styles["aboutProject-title"]}>
        About Mundeshwari Connaught One
      </h2>
      <p className={styles["aboutProject-desc"]}>
        Exclusive housing welcomes the ultra modern families to come and
        experience the life changing space where it brings high rising towers to
        capture the city's bigger and uninterrupted view from the balcony.
      </p>

      <div className={styles["aboutProject-highlights"]}>
        <div className={styles["aboutProject-box"]}>
          <span>1 Acre</span>
          <p>Project Size</p>
          <FaRulerCombined />
        </div>
        <div className={styles["aboutProject-box"]}>
          <span>May 22</span>
          <p>Launch Date</p>
          <FaCalendarAlt />
        </div>
        <div className={styles["aboutProject-box"]}>
          <span>46</span>
          <p>Total Units</p>
          <FaKey />
        </div>
        <div className={styles["aboutProject-box"]}>
          <span>1</span>
          <p>Total Towers</p>
          <FaBuilding />
        </div>
        <div className={styles["aboutProject-box"]}>
          <span>3,4</span>
          <p>BHK</p>
          <FaBed />
        </div>
      </div>

      <div className={styles["aboutProject-certificates"]}>
        <p className={styles["aboutProject-cert-box"]}>
          Available Certificates
        </p>
        <div className={styles["aboutProject-cert-list"]}>
          <div className={styles["aboutProject-cert-box"]}>C</div>
          <div className={styles["aboutProject-cert-box"]}>
            Encumbrance Certificate 1
            <span>
              <FaDownload />
            </span>
          </div>
          <div className={styles["aboutProject-cert-box"]}>
            Encumbrance Certificate 2{" "}
            <span>
              <FaDownload />
            </span>
          </div>
          <div className={styles["aboutProject-cert-box"]}>
            Encumbrance Certificate 3
            <span>
              <FaDownload />
            </span>
          </div>
        </div>
        <a className={styles["aboutProject-view-all"]} href="#">
          View All 5 Documents →
        </a>
      </div>

      <div className={styles["aboutProject-whybuy"]}>
        <h3 className={styles["aboutProject-whybuy-title"]}>
          Why Buy in Mundeshwari Connaught One?
        </h3>
        <ul className={styles["aboutProject-whybuy-list"]}>
          <li>Lavish Ultra - Luxury 3 and 4 BHK Apartments</li>
          <li>Surrounded by lush greens in the city's heart</li>
          <li>G + 8 Storey (Terrace Garden on 9th Floor)</li>
          <li>Double Heighted Entrance Lobby (20 ft)</li>
        </ul>
        <a className={styles["aboutProject-more-link"]} href="#">
          +18 More
        </a>
        <button className={styles["aboutProject-brochure-btn"]}>
          <FaDownload /> Download Brochure
        </button>
      </div>
    </div>
  );
}
