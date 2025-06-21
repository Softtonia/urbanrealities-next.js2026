import styles from "./DeveloperInfoMobile.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const DeveloperInfoMobile = () => {
  return (
    <div className={styles.devContainer}>
      <div className={`text-dark ${styles.devInfoBox}`}>
        <h5 className={styles.title}>About Mundeswari</h5>
        <div className={styles.devContent}>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque eu ex vestibulum, fermentum tellus nec, finibus nisl.
            Nullam pellentesque ligula quam, a varius enim posuere sit amet.
            Donec vel lectus odio. Donec posuere quis libero.
            <span className={styles.readMore}>Read More</span>
          </p>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <strong>Office Address :-</strong>
            <p className={styles.address}>
              <FaMapMarkerAlt className={styles.icon} />
              Metro, 123, Saidulajab, Mehrauli– Near Saket, New Delhi –110030
            </p>
          </div>

          <div className={styles.section}>
            <span>Experiences :-</span> <span>45+ yrs</span>
          </div>

          <div className={styles.section}>
            <strong>Operating Cities</strong>
            <p className={styles.cities}>
              Gurgaon, New Delhi, Hyderabad, Bangalore, Kochi, Panchkula,
              Kolkata,
              <br />
              Indore, New Chandigarh, Chennai, Lucknow, Shimla, Jaipur,
              Bhubaneswar, Noida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfoMobile;
