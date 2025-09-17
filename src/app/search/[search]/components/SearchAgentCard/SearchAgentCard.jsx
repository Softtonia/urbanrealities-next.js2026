'use client';

import styles from './SearchAgentCard.module.css';
import { FaRegCircleCheck } from "react-icons/fa6";

export default function AgentCard() {
  return (
    <div className={styles.card}>
      {/* Badge */}
      <div className={styles.badge}>PREFERRED AGENT</div>

      {/* Agent Info */}
      <div className={styles.agentInfo}>
        <img
          src="/top-agent.png"
          alt="Agent"
          className={styles.agentImage}
        />
        <div>
          <h3 className={styles.agentName}>Salman</h3>
              <p className={styles.agentId}>
                RERA ID: PRM/KA/RERA/121/309/...
              </p>
        </div>
      </div>
        
          <div>
              <p className={styles.company}>B S Associates</p>
              <p className={styles.since}>Operating since 2010</p>
          </div>

      {/* About Agent */}
      <div className={styles.about}>
        <h4>About Agent</h4>
        <p>
          <FaRegCircleCheck className={styles.icon} />
          Has maximum property options
        </p>
        <p>
          <FaRegCircleCheck className={styles.icon} />
          Is the top agent of the locality
        </p>
        <p>
          <FaRegCircleCheck className={styles.icon} />
          Is trusted by all users
        </p>
      </div>

      {/* Button */}
      <button className={` ${styles.button} badge-btn`}>View Profile</button>
    </div>
  );
}
