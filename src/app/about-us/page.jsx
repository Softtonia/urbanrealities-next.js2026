'use client'
import React from 'react';
import AboutUs from './components/About-Us';
import Breadcrumbs from "@/Components/All-Breadcrumbs/Breadcrumbs";
import styles from './components/About-Us.module.css'


const AboutUspage = () => {
  return (
    <div>
        <div className={styles.Breadcrumbs }>
            <div className="container">
        <Breadcrumbs/>
            {/* <Breadcrumbs paths={breadcrumbPaths}/> */}

        </div>
        </div>
      <AboutUs/>
    </div>
  );
}

export default AboutUspage;
