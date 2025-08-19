"use client";
import React, {useState} from "react";
import Image from "next/image";
import styles from "./AgentProfile.module.css";
import ModalPopup from "@/Components/Modal-Popup/ModalPopup";
// react-icons import
import { FaPhoneAlt, FaStar, FaFlag, FaEnvelope } from "react-icons/fa";

export default function AgentProfileDetails() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const agent = {
    name: "Kairav Anand",
    company: "Dreams home pvt. ltd.",
    rating: 9.8,
    reviews: 5,
    image: "/agent-profile.png",
    rent: 145,
    sale: 45,
    deals: 400,
    dealsIn: [
      "Rent/Lease",
      "Pre-launch",
      "Original Booking",
      "Resale",
      "Others",
    ],
    operatesIn: [
      "Amar Colony",
      "Lajpat Nagar 4",
      "Greater Kailash 1",
      "Lajpat Nagar 1",
      "Defence Colony",
      "Dayanand Colony",
      "East Of Kailash",
    ],
  };


  const contactAgentData = {
    heading: "Contact",
    usernameLabel: "Your Name",
    usernamePlaceholder: "Enter your name",
    phoneLabel: "Phone Number",
    emailPlaceholder: "Enter email",
    phonePlaceholder: "Enter your phone",
    usermessage: "Type your message",
    nextButton: "Contact Agent",
  };
  return (
    <>
    <div className={styles.profilesection}>
      {/* Left Section */}
      <div className={styles.left}>
        <Image
          src={agent.image}
          alt={agent.name}
          width={305}
          height={234}
          className={styles.agentImage}
        />
        <div className={styles.groupBtn}>
          <button className={styles.viewNumber}>
            <FaPhoneAlt className={styles.icon} /> View Number
          </button>

          <button className={styles.sendmsg} onClick={handleShowModal}>
            <FaEnvelope className={styles.icon} /> send Message
                 </button>
        </div>
      </div>

      {/* Middle Section */}
      <div className={styles.middle}>
        <h2 className={styles.agentName}>{agent.name}</h2>
        <div className={styles.rating}>
          <h2 className={styles.company}>({agent.company})</h2>
          <span className={styles.ratingText}>
            {agent.rating}
            {/* ({agent.reviews} reviews) */}
          </span>
          <div className="">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className={styles.starIcon} />
            ))}
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statscount}>
            <h3>{agent.rent}+</h3>
            <p>Properties for rent</p>
          </div>
          <div className={styles.statscount}>
            <h3>{agent.sale}+</h3>
            <p>Properties for buy</p>
          </div>

        </div>

        <div className={styles.bottomcontent}>
          <div className={styles.dealsIn}>
            <div className={styles.dealstittle}>Deals in:</div>
            <p className={styles.dealspara}>{agent.dealsIn.join(", ")}</p>
          </div>
          <div className={styles.operatesIn}>
            <div className={styles.operatestittle}>Operates in:</div>
            <p className={styles.operatespara}>{agent.operatesIn.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>


  <div className={styles.dealsmobile}>
          <div className={styles.dealsIn}>
            <div className={styles.dealstittle}>Deals in:</div>
            <p className={styles.dealspara}>{agent.dealsIn.join(", ")}</p>
          </div>
          <div className={styles.operatesIn}>
            <div className={styles.operatestittle}>Operates in:</div>
            <p className={styles.operatespara}>{agent.operatesIn.join(", ")}</p>
          </div>
        </div>
             <ModalPopup
        show={showModal}
        handleClose={handleCloseModal}
        popupData={contactAgentData}
        agentName={agent.name}
      />

    </>  
  );
}
