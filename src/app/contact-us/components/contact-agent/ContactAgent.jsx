
"use client";
import React from "react";
import styles from "./ContactAgent.module.css";
import { FaPhoneAlt } from "react-icons/fa";
const agents = [
  {
    id: 1,
    name: "For General",
    phone: "374-416-2931",
    img: "/agent-detail.png",
  },
  {
    id: 2,
    name: "For Sales",
    phone: "612-350-1911",
    img: "/top-agent.png",
  },
  {
    id: 3,
    name: "For Business",
    phone: "214-307-5181",
    img: "/agent-img1.png",
  },
];

export default function ContactAgent() {
  return (
    <section className={styles.agentsSection}>
      <h2 className={styles.title}>Our Agents</h2>
      <div className={styles.agentsWrapper}>
        {agents.map((agent) => (
          <div key={agent.id} className={styles.agentCard}>
            <img src={agent.img} alt={agent.name} className={styles.agentImg} />
            <div className={styles.agentInfo}>
              <div>{agent.name}</div>
              <p>
                <FaPhoneAlt /> {agent.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
