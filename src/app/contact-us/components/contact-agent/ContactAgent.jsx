
"use client";
import React from "react";
import styles from "./ContactAgent.module.css";
import { FaPhoneAlt } from "react-icons/fa";


export default function ContactAgent({ contactData }) {
  const agents = [
    {
      id: 1,
      name: "For General",
      phone: contactData.for_general_mobile_number,
      img: "/agent-detail.png",
    },
    {
      id: 2,
      name: "For Sales",
      phone: contactData.for_sales_mobile_number,
      img: "/top-agent.png",
    },
    {
      id: 3,
      name: "For Business",
      phone: contactData.for_business_mobile_number,
      img: "/agent-img1.png",
    },
  ];
  return (
    <section className={styles.agentsSection}>
      <h2 className={styles.title}>Our Agents</h2>
      <div className={styles.agentsWrapper}>
        {agents?.filter((val) => val.phone)?.map((agent) => (
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
