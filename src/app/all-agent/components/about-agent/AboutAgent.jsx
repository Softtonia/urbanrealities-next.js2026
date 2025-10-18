import React from "react";
import styles from "../AgentProfileLayout.module.css";
import SubHero from "@/Components/SubHero/SubHero";
const AboutAgent = ({agentProfile}) => {
  return (
    <div >
      <SubHero subHeroHeading={`About ${agentProfile?.first_name} `}></SubHero>
      <div className={styles.aboutcontent}>
        <p className={styles.aboutpara}>
         {agentProfile?.about}
        </p>
      </div>
    </div>
  );
};

export default AboutAgent;
