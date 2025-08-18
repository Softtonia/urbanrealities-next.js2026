import React from 'react';
import styles from './components/AgentProfileLayout.module.css'
import AgentForm from './components/agent-profile/AboutForm';
import AboutAgent from './components/about-agent/AboutAgent';
import AgentReviews from './components/agent-reviews/AgentReviews';
import AgentPropertyList from "./components/agent-propertylist/AgentPropertyList"
import ContactInfo from './components/contact-info/ContactInfo';
import SubHero from '@/Components/SubHero/SubHero';
import AgentProfileDetails from './components/agent-profile/AgentProfile';
const AgentProfileLayout = () => {
  return (
    <>
    <div className={` ${styles.profileContainer} container `}>
        <div className={` ${styles.profilerow} row `}>
        <div className={` ${styles.agentprofilecol} col-12 col-xl-8 p-0 `}><AgentProfileDetails/> </div>
        <div className={` ${styles.AgentFormcol} col-12  col-xl-4 p-0`}> <AgentForm/> </div>
        </div>
    </div>

<div className={styles.AboutAgentsection}>
        <div className={` ${styles.aboutAgentWrapper} container `}>
        <div className={` ${styles.col} col-12 `}> <AboutAgent/> </div>
    </div>
</div>

    <div className={` ${styles.Container} container `}>
        <div className={` ${styles.AboutPropertyList} row `}>
        <div className={` ${styles.col} col-12 col-lg-8 `}><AgentPropertyList/> </div>
        <div className={` ${styles.col} col-12  col-lg-4 `}> <AgentReviews/> </div>
        </div>
    </div>

   <div className={styles.header}>
    <div className={` ${styles.headercontainer} container `}>
      <h3>Contact Us</h3>
      <p>Toll Free Number: 274-5607-0011</p>
      </div>
    </div>
        {/* <div className={` ${styles.container} container `}>
        <div className={` ${styles.enquiryrow} row `}>
        <div className={` ${styles.col} col-12 col-lg-6  `}><ContactInfo/> </div>
          <div className={` ${styles.col} col-12  col-lg-6 `}> 
            <h3 className='text-center' >Fill the enquiry form</h3>
            <SubHero subHeroHeading={""}></SubHero>
            <AgentForm/>
             </div>
        </div>
    </div> */}

  
   </>   
  );
}

export default AgentProfileLayout;
