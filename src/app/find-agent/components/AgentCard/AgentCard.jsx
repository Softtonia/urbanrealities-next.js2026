"use client";
import React from "react";
import Image from "next/image";
import styles from "./AgentCard.module.css";

export default function AgentCard({ agent }) {
  return (
    <div className={styles.card}>
      <div className={styles.topBadge}>Top Agent</div>

      <div className={styles.leftSection}>
        <Image
          src={agent.image}
          alt={agent.name}
          width={70}
          height={70}
          className={styles.profilePic}
        />
      </div>
      <div className="w-100" >
          <h3 className={styles.name}>
            {agent.name}
            <span className={styles.company}>({agent.company})</span>
          </h3>
          <div className={` ${styles.middlesection} d-flex justify-content-between`}>
          <div className={styles.stats}>
            <div className={styles.agentstats}>
            <p className={styles.statsNumber}>
              {agent.rent}+ 
            </p>
            <p className="m-0"> Properties for rent</p>
            </div>
             <div className={` ${styles.agentstats} borderNone `}>
            <p className={styles.statsNumber}>
              {agent.sale}+ 
            </p>
            <p className="m-0">Properties for Sell </p>
            </div>
            {/* <div className={` ${styles.agentstats} borderNone `}>
            <p className={styles.statsNumber}>
              {agent.deals}+ 
            </p>
            <p className="m-0">Deals Closed</p> 
            </div> */}
          </div>


          <div className={styles.rightSection}>
            <button className={styles.callBtn}>Request a Call Back</button>
            <button className={styles.visitBtn}>Visit Property</button>
          </div>

          </div>




        <div className={styles.locations}>
          Operates in
          <p className={styles.locationspara}>{agent.locations}</p>
        </div>
      </div>
    </div>
  );
}
