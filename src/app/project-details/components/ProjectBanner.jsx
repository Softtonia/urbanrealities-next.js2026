import React from 'react'
import styles from './ProjectBanner.module.css'

const ProjectBanner = () => {
  return (
    <>

        <div className={styles.projectdetailsherosection }>
                <div className={`${styles.herosection} container`}>
                    <div className={styles.contentsection}>
                            <div className={styles.info} >
                                    <h6 className={styles.rarea}>Rera No. - 455789996322</h6>
                                    <h6 className={styles.name}>Mundeshwari</h6>
                                    <h6 className={styles.builder}>By Ganesh Property | Ernakulam, Karnataka </h6>
                            </div>
                            <div className={styles.info1}>
                                    <h6 className={styles.price}>Price ₹ 2.75 Cr.</h6>
                                    <h6 className={styles.bhk}>1Bhk, 2bhk ,3BHK Flats, Luxury Apartment </h6>
                                    <h6 className={styles.bhk}>Area - 2,500 sqft</h6>
                                    <h6 className={styles.posession}>Possession on:- Jan, 24</h6>
                        </div>
                        <button className={`${styles.contentbtn} ${styles['btn-subscribe']}`}>Download Brochure</button>
                    </div>
                    <div className={styles.logosection}>
                        
                    </div>
                </div>
        </div>


    </>
  )
}

export default ProjectBanner 