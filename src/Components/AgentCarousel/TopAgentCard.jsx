"use client";
import React from "react";
import Image from "next/image";
import styles from "./TopAgentCard.module.css";
import Link from "next/link";

import { FaBuilding } from "react-icons/fa";

export default function TopAgentCard({ agent }) {
  // Use business details if available, fallback to agent details
  const companyName = agent.business_name || agent.role_name || "Independent Agent";
  const operatesSince = agent.created_at ? new Date(agent.created_at).getFullYear() : "-";
  const buyersServed = agent.buyers_served || "-"; // Fallback
  const propertiesForSale = agent.sell_listings_count ?? agent.purpose_counts?.sell ?? 0;
  const propertiesForRent = agent.rent_listings_count ?? agent.purpose_counts?.rent ?? 0;

  // Generate a fallback logo using initials
  const initials = companyName.substring(0, 2).toUpperCase();

  return (
    <Link href={`/agent-details/${agent.first_name}-${agent.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.cardContainer}>
        
        {/* Header Section */}
        <div className={styles.cardHeader}>
          <img
            src={agent.profile_photo || "/agent-profile.png"}
            onError={(e) => { e.target.onerror = null; e.target.src = "/agent-profile.png"; }}
            alt={agent.first_name || "Agent"}
            className={styles.profilePic}
          />
          <div className={styles.headerInfo}>
            <h3 className={styles.agentName}>{agent.first_name} {agent.last_name}</h3>
          </div>
        </div>

        {/* Middle Section */}
        <div className={styles.cardBody}>
          <div className={styles.companyLogoBox}>
             {/* If there's a company logo in the future, render img here, else fallback to initials */}
             {initials}
          </div>
          
          <div className={styles.companyDetails}>
            <h4 className={styles.companyName}>
              <FaBuilding style={{ marginRight: '6px', color: '#ff5e14', fontSize: '0.85em' }} />
              {companyName}
            </h4>
            <div className={styles.companyStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Operating Since</span>
                <span className={styles.statValue}>{operatesSince}</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Buyers Served</span>
                <span className={styles.statValue}>{buyersServed}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className={styles.cardFooter}>
          <div className={styles.propertyStat}>
            <span className={styles.propertyCount}>{propertiesForSale}</span>
            <span className={styles.propertyLabel}>Properties for Sale</span>
          </div>
          <div className={styles.propertyStat}>
            <span className={styles.propertyCount}>{propertiesForRent}</span>
            <span className={styles.propertyLabel}>Properties for Rent</span>
          </div>
        </div>

      </div>
    </Link>
  );
}
