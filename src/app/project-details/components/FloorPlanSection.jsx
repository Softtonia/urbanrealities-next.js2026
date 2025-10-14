'use client';

import React, { useState } from "react";
import styles from "./FloorPlanSection.module.css";
import { TbZoomScan } from "react-icons/tb";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaTimes,

} from "react-icons/fa";
import { useProject } from "../context/ProjectContext";


const FloorPlanSection = () => {
  const project = useProject();
  const floorPlans = project?.repeater_fields?.filter(
    (val) =>
      val?.template?.slug?.startsWith("floorplan") &&
      (val.template.slug.includes("plan"))
  ) || [];
  
  const floorPlan = floorPlans?.find(val =>
    val.template.slug.includes("floor")
  )?.field_value;
  
  // const floorPlans = project?.repeater_fields?.find(
  //   (val) => val.template?.slug.startWith("project.floor-plan")?.field_value;
  // const floorPlans = [
  //   {
  //     title: "3 BHK Flat",
  //     area: "2201Sq-ft - 2774 Sq-ft",
  //     sale: "₹ 16Cr.- ₹ 25Cr.",
  //     rent: "-- --",
  //     images: ["/image-254.png", "/image-255.png"],
  //   },
  //   {
  //     title: "4 BHK Flat",
  //     area: "3000Sq-ft - 3500 Sq-ft",
  //     sale: "₹ 25Cr.- ₹ 30Cr.",
  //     rent: "-- --",
  //     images: ["/image-255.png", "/image-254.png"],
  //   },
  // ];
  const formattedFloors = floorPlan?.map((floor) => {
    const floorObj = {};
    floor.forEach((item) => {
      if (item.field_type === "media") {
        // media holds array of file objects
        floorObj[item.field_label] = item.field_value.map((f) => f.file_url);
      } else {
        floorObj[item.field_label] = item.field_value;
      }
    });
    return floorObj;
  });

  const masterPlanImages = ["/image-255.png", "/image-254.png"]; // You can add more images if needed
  console.log("formatted plan>>",formattedFloors)
  console.log("==>>", floorPlans)
  // console.log("==>>", formattedFloors)

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  const openModal = (images) => {
    setCurrentImages(images);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.floorSection}>
      <h2 className={styles.sectionTitle}>
        {project.name} Floor Plan & Units
      </h2>

      <div className={styles.floorGrid}>
        {/* {floorPlans.map((plan) => (
          <div className={styles.floorCard} key={plan.id}>
            <div className={styles.floorText}>
              <p className={styles.flatTitle}>{plan.title}</p>
              <p>{plan.area}</p>
              <div className={styles.flatPara}>
                <p>Sale:</p> <p>{plan.sale}</p>
              </div>
              <div className={styles.flatPara}>
                <p>Rent:</p> <p>{plan.rent}</p>
              </div>
            </div>
            <div className={styles.floorCardImage}>
              <img src={plan.images[0]} alt="floor" />
              <button
                className={styles.floorCardZoom}
                onClick={() => openModal(plan.images)}
              >
                <TbZoomScan />
              </button>
            </div>
          </div>
        ))} */}
      </div>

      {/* ✅ MASTER PLAN SECTION */}
      <div className={styles.masterPlan}>
        <div className={styles.masterInfo}>
          <p className={styles.masterTitle}>View Master Plan</p>
          <p className="m-0">Connection between buildings and surrounding environments</p>
        </div>
        <div className={styles.masterPlanImage}>
          <img src={masterPlanImages[0]} alt="master" />
          <button
            className={styles.masterPlanZoom}
            onClick={() => openModal(masterPlanImages)}
          >
            <TbZoomScan />
          </button>
        </div>
      </div>

      {/* ✅ MODAL */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        <div className={styles.closeBtnWrap}>
          <button className={styles.closeBtn} onClick={closeModal}>
            <FaTimes />
          </button>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          modules={[Navigation]}
        >
          {currentImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className={styles.imageViewer}>
                <img src={img} alt="popup" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </div>
  );
};

export default FloorPlanSection;
