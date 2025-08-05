'use client';

import styles from "./ProjectAbout.module.css";
import {
  FaRulerCombined,
  FaCalendarAlt,
  FaKey,
  FaBuilding,
  FaBed,
  FaDownload,
} from "react-icons/fa";
import { MdOutlineChair,
  MdOutlineCorporateFare, 
 } from "react-icons/md";

export default function AboutProject() {
  return (
    <div className={styles["aboutProject-container"]}>
      <h2 className={styles["aboutProject-title"]}>
        About Mundeshwari Connaught One
      </h2>
      <p className={`${styles["aboutProject-desc"]} body-text-16`}>
        Exclusive housing welcomes the ultra modern families to come and
        experience the life changing space where it brings high rising towers to
        capture the city's bigger and uninterrupted view from the balcony.
      </p>

      <div className={styles["aboutProject-highlights"]}>
        <div className={styles["aboutProject-box"]}>
          <p className="">Project Size</p>
          <span>1 Acre</span>
          <FaRulerCombined   className={styles["aboutProject-icon"]}/>
        </div>
        <div className={styles["aboutProject-box"]}>
          <p>Launch Date</p>
          <span>May 22</span>
          <FaCalendarAlt  className={styles["aboutProject-icon"]} />
        </div>
        <div className={styles["aboutProject-box"]}>
          <p>Total Units</p>
          <span>46</span>
          <FaKey   className={styles["aboutProject-icon"]}/>
        </div>
        <div className={styles["aboutProject-box"]}>
          <p>Total Towers</p>
          <span>1</span>
          <FaBuilding  className={styles["aboutProject-icon"]} />
        </div>
        <div className={styles["aboutProject-box"]}>
          <p>BHK</p>
          <span>3,4</span>
          <MdOutlineChair  className={styles["aboutProject-icon"]}/>
        </div>
      </div>

      <div className={styles["aboutProject-certificates"]}>
        <div className={styles["aboutProject-cert-list"]}>
          <div className={styles["aboutProject-cert-box"]}>
            Available Certificates
            <p className={styles["aboutProject-para-box"]}>C</p>
            <div>
              <FaDownload  className={styles["cert-icon"]} />
            </div>
          </div>
          <div className={styles["aboutProject-cert-box"]}>
            Encumbrance
            <p className={styles["aboutProject-para-box"]}>Certificate 1</p>
            <div>
              <FaDownload  className={styles["cert-icon"]}/>
            </div>
          </div>
          <div className={styles["aboutProject-cert-box"]}>
            Encumbrance
            <p className={styles["aboutProject-para-box"]}>Certificate 2</p>
            <div>
              <FaDownload className={styles["cert-icon"]}/>
            </div>
          </div>
          <div className={styles["aboutProject-cert-box"]}>
            Encumbrance
            <p className={styles["aboutProject-para-box"]}>Certificate 3</p>
            <div>
              <FaDownload className={styles["cert-icon"]}/>
            </div>
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
          <li className={styles["whybuy-li"]}>Lavish Ultra - Luxury 3 and 4 BHK Apartments</li>
          <li  className={styles["whybuy-li"]}>Surrounded by lush greens in the city's heart</li>
          <li  className={styles["whybuy-li"]}>G + 8 Storey (Terrace Garden on 9th Floor)</li>
          <li  className={styles["whybuy-li"]}>Double Heighted Entrance Lobby (20 ft)</li>
        </ul>
        <a className={`${styles["aboutProject-more-link"]} body-text-rg16` }href="#">
          +18 More
        </a>
        <button className={styles["aboutProject-brochure-btn"]}>
          <FaDownload /> Download Brochure
        </button>
      </div>
    </div>
  );
}
