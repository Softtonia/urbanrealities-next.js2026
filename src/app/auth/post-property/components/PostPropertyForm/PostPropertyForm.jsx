import styles from "./PostPropertyForm.module.css";
import Image from "next/image";

export default function PostPropertyForm() {
  const dummyUserTypes = ["Owner", "Buyer", "Agent", "Developer"];
  const dummyListingPurposes = ["Rent", "Buy", "Sell"];

  return (
    <div className={styles.postFormContainer}>
      <div className={styles.postFormLeft}>
        <Image
          src="/post-property-girl.png"
          alt="Woman with laptop"
          width={429}
          height={526}
          className={styles.postFormImage}
        />
      </div>
        <div className={styles.postFormBenefits}>
          <h2 className={`top-heading ${styles['post-add']}`}>
            Post property Ad to sell or rent online for{" "}
            <span className={` top-heading ${styles.postFormHighlight}`}>Free!</span>
          </h2>
          <ul>
            <li>Get Access to 4 Lakh+ Buyers</li>
            <li>Sell Faster with Premium Service</li>
            <li>Get Expert Advice on Market Trends and Insights</li>
          </ul>
        </div>

      <div className={styles.postFormRight}>
        <div className={styles.postFormCard}>
          <img
            src="/Blob-Shape.png"
            alt="Decoration"
            className={styles.blobShape}
          />
          <h4 className={` formHeading ${styles.postformHeading}`}>
            Posting your property
          </h4>
          <p className={` formSubHeading ${styles.postFormSubtitle}`}>
            Fill the required details
          </p>
          <div className={styles.formGroup}>
            <label htmlFor="radio" className={` formLabel ${styles.formLabel}`}>
              {/* {data.userTypeLabel} */}you're
            </label>
            <div className={styles.postFormRadioGroup}>
              {dummyUserTypes.map((type) => (
                <label key={type}>
                  <input type="radio" name="user" />
                  <span className={`body-text-14 ${styles.spanOption}`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="radio" className={` formLabel ${styles.formLabel}`}>
              {/* {data.userTypeLabel} */} Looking For
            </label>
            <div className={styles.postFormRadioGroup}>
              {dummyListingPurposes.map((purpose) => (
                <label key={purpose}>
                  <input type="radio" name="looking" />
                  <span className={`body-text-14 ${styles.spanOption}`}>
                    {purpose}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="Phone" className={` formLabel ${styles.formLabel}`}>
              Your contact details for the buyer to reach you
            </label>
            <input
              type="tel"
              placeholder="+91"
              className={` formInput ${styles.postFormInput}`}
            />
          </div>

          <div className={`  formGroupBtn ${styles.postFormButton} `}>
            Login
          </div>

          <p className={styles.postFormSignup}>
            Don’t have an account? <span>Sign Up</span>
          </p>
        </div>
      </div>
      {/* <div className={styles.rightPanel}>
            <img src="/Blob-Shape.png" alt="Decoration"className={styles.blobShape} />
             <div className={styles.formWrapper}>
        </div>
    </div> */}
    </div>
  );
}
