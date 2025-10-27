"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./AgentProfile.module.css";
import ModalPopup from "@/Components/Modal-Popup/ModalPopup";
import { FaPhoneAlt, FaStar, FaFlag, FaEnvelope } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import ViewPopup from "@/Components/Modal-Popup/ViewPopup";

export default function AgentProfileDetails({agentProfile}) {
  const router = useRouter();
  const { token } = useSiteSettings();
  const [showModal, setShowModal] = useState(false);
  const [viewShowModal, setViewShowModal] = useState(false);
  const handleShowModal = async () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleViewShowModal = async () => {
    console.log("==>,", token)
    if (id && token) {
      // await fetchAgent();
      setViewShowModal(true);
    } else {
      router.push('/auth/login')
    }

  }
  const handleViewCloseModal = () => setViewShowModal(false);
  // const agent = {
  //   name: "Kairav Anand",
  //   company: "Dreams home pvt. ltd.",
  //   rating: 9.8,
  //   reviews: 5,
  //   image: "/agent-profile.png",
  //   rent: 145,
  //   sale: 45,
  //   deals: 400,
  //   dealsIn: [
  //     "Rent/Lease",
  //     "Pre-launch",
  //     "Original Booking",
  //     "Resale",
  //     "Others",
  //   ],
  //   operatesIn: [
  //     "Amar Colony",
  //     "Lajpat Nagar 4",
  //     "Greater Kailash 1",
  //     "Lajpat Nagar 1",
  //     "Defence Colony",
  //     "Dayanand Colony",
  //     "East Of Kailash",
  //   ],
  // };

  const { id } = useParams();
  const agent = agentProfile;
  // const [agent, setAgent] = useState(null); // renamed to singular for clarity
  const [loading, setLoading] = useState(false);




  


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
  const contactDetails = {
    heading: "Contact Detail",
    nameLabel: "Name",
    phoneLabel: "Number",
    emailLabel: "Email",
  };


  // ✅ Function to check if object is empty
  const isEmpty = (obj) =>
    obj == null || (Object.keys(obj).length === 0 && obj.constructor === Object);

  // ✅ Safely add agent details
  if (!isEmpty(agent)) {
    contactDetails.name = agent.first_name + ' ' + agent.last_name || "N/A";
    contactDetails.phone = agent.phone || "N/A";
    contactDetails.email = agent.email || "N/A";
  }

  console.log(contactDetails);

  return (
    <>
      <div className={styles.profilesection}>
        {/* Left Section */}
        <div className={styles.left}>
          <Image
            src={
              agent.profile_photo
                ? agent.profile_photo
                : "/agent-profile.png"
            }
            alt={agent.first_name || "Agent"}
            width={305}
            height={234}
            className={styles.agentImage}
          />


          <div className={styles.groupBtn}>
            <button className={styles.viewNumber} onClick={handleViewShowModal}>
              <FaPhoneAlt className={styles.icon} /> View Number
            </button>

            <button className={styles.sendmsg} onClick={handleShowModal}>
              <FaEnvelope className={styles.icon} /> Send Message
            </button>
          </div>
        </div>

        {/* Middle Section */}
        <div className={styles.middle}>
          <h2 className={styles.agentName}>{`${agent.first_name} ${agent.last_name}`}</h2>
          <div className={styles.rating}>
            <h2 className={styles.company}>({agent.role_name})</h2>
            {agent.rating ? (
              <>
                <span className={styles.ratingText}>
                  {agent.rating || "-"}
                </span>
                <div>
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} className={styles.starIcon} />
                  ))}
                </div>
              </>) : ''}
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statscount}>
              <h3>{agent.rent || 0}+</h3>
              <p>Properties for rent</p>
            </div>
            <div className={styles.statscount}>
              <h3>{agent.sale || 0}+</h3>
              <p>Properties for buy</p>
            </div>
          </div>

          <div className={styles.bottomcontent}>
            {agent.area_locality === "N/A" ? '' : (
              <div className={styles.dealsIn}>
                <div className={styles.dealstittle}>Operated In:</div>
                <p className={styles.dealspara}>
                  {agent.area_locality === "N/A" ? 'Not Assigned' : agent.area_locality}
                </p>
              </div>
            )}
            {!agent.about ? '' : (
              <div className={styles.operatesIn}>
                <div className={styles.operatestittle}>About Me:</div>
                <p className={styles.operatespara}>
                  {!agent.about ? 'Not Assigned' : agent.about}
                </p>
              </div>)
            }
          </div>
        </div>
      </div>

      {/* Mobile Deals Section */}
      <div className={styles.dealsmobile}>
        {agent.area_locality === "N/A" ? '' : (
          <div className={styles.dealsIn}>
            <div className={styles.dealstittle}>Operated In:</div>
            <p className={styles.dealspara}>
              {agent.area_locality === "N/A" ? 'Not Assigned' : agent.area_locality}
            </p>
          </div>)}
        {!agent.about ? '' : (
          <div className={styles.operatesIn}>
            <div className={styles.operatestittle}>About Me:</div>
            <p className={styles.operatespara}>
              {!agent.about ? 'Not Assigned' : agent.about}

            </p>
          </div>)}
      </div>
      {/* End of main profile section */}


      <ModalPopup
        show={showModal}
        handleClose={handleCloseModal}
        popupData={contactAgentData}
        agentName={agent.name}
      />
      <ViewPopup
        show={viewShowModal}
        handleClose={handleViewCloseModal}
        popupData={contactDetails}
        agentName={agent.name}
      />

    </>
  );
}
