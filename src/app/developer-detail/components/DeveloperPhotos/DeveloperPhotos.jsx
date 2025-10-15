"use client";

import React, { useState, useRef, useMemo } from "react";
import styles from "./DeveloperPhotos.module.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDeveloper } from "../../context/DeveloperContext";

const visibleCount = 3;

const DeveloperPhotos = () => {
    const {developer} = useDeveloper();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const openModal = (index = 0) => {
        setActiveIndex(index);
        setModalOpen(true);
        setTimeout(() => {
            swiperRef.current?.slideTo(index);
        }, 0);
    };
    const closeModal = () => setModalOpen(false);

    // ✅ 1. Extract photo repeater
    const photoRepeater = (developer?.repeater_fields || []).find(
        (val) =>
            val?.template?.slug?.toLowerCase().startsWith("builder") &&
            val?.template?.slug?.toLowerCase().includes("photos")
    );

    // ✅ 2. Prepare structured data
    const photos = (photoRepeater?.field_value || []).map((group) => {
        const nameField = group.find((f) =>
            f.field_label?.toLowerCase().includes("name")
        );
        const imageField = group.find((f) =>
            f.field_label?.toLowerCase().includes("image")
        );
        if (!imageField?.field_value?.length) return null;

        return {
            name: `${nameField?.field_value}(${imageField?.field_value.length})` || "",
            images: imageField?.field_value || [],
        };
    });

    // ✅ 3. Flatten all images for Swiper with mapping to section
    const flatPhotos = useMemo(() => {
        const arr = [];
        photos?.forEach((section, sectionIdx) => {
            section?.images?.forEach((img, imgIdx) => {
                arr.push({
                    sectionName: section.name,
                    image: img,
                    sectionIndex: sectionIdx,
                    localIndex: imgIdx,
                });
            });
        });
        return arr;
    }, [photos]);

    // ✅ 4. Calculate section start indexes
    const sectionStartIndexes = useMemo(() => {
        const startIndexes = [];
        let counter = 0;
        photos.forEach((section) => {
            startIndexes.push(counter);
            counter += section?.images?.length;
        });
        return startIndexes;
    }, [photos]);

    // ✅ 5. Carousel logic for main view
    const totalSlides = photos?.length;
    const maxIndex = Math.max(totalSlides - visibleCount, 0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    };
    console.log("photos", photos);
    if (!photos || (Array.isArray(photos) && photos.length === 1 && photos[0] === null)) {
        return null;
    }


    return (
        <div className={styles.projectSection}>
            <h2 className={styles.projectHeading}>Photos</h2>

            {/* 🖼️ Carousel */}
            <div className={styles.carouselWrapper}>
                <div className={styles.carouselTrackWrapper}>
                    <div
                        className={styles.carouselTrack}
                        style={{
                            transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
                        }}
                    >
                        {photos.length > 0 && photos?.map((photo, idx) => (
                            <div key={idx} className={styles.carouselItem}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={photo?.images[0]}
                                        alt={photo?.name || `photo`}
                                        className={styles.carouselImg}
                                        onClick={() => openModal(idx)}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* {flatPhotos.map((photo, idx) => (
                            <div key={idx} className={styles.carouselItem}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={photo.image}
                                        alt={photo.sectionName || `photo-${idx}`}
                                        className={styles.carouselImg}
                                        onClick={() => openModal(idx)}
                                    />
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <br />
            <div className={styles.photoControls}>
                <div className={styles.arrows}>
                    <button className={styles.arrowBtn} onClick={prevSlide}>
                        <FaArrowLeft />
                    </button>
                    <button className={styles.arrowBtn} onClick={nextSlide}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>

            {/* ✅ MODAL */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
                ariaHideApp={false}
                closeTimeoutMS={300}
            >
                <div className={styles.closeBtnWrap}>
                    {/* ✅ Section Names */}
                    <div className={styles.nameList}>
                        {photos.map((section, idx) => (
                            <button
                                key={idx}
                                className={`${styles.nameItem} ${activeIndex >= sectionStartIndexes[idx] &&
                                    (idx === photos.length - 1 || activeIndex < sectionStartIndexes[idx + 1])
                                    ? styles.activeName
                                    : ""
                                    }`}
                                onClick={() => {
                                    const slideToIndex = sectionStartIndexes[idx];
                                    swiperRef.current?.slideTo(slideToIndex);
                                    setActiveIndex(slideToIndex);
                                }}
                            >
                                {section?.name || `Photo ${idx + 1}`}
                            </button>
                        ))}
                    </div>

                    {/* Close Button */}
                    <button className={styles.closeBtn} onClick={closeModal}>
                        <FaTimes />
                    </button>
                </div>

                {/* ✅ Swiper Viewer */}
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {flatPhotos.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div className={styles.imageViewer}>
                                <img src={item.image} alt={`${item.sectionName}-${idx}`} />
                                <p className={styles.photoName}>{item.sectionName}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Modal>
        </div>
    );
};

export default DeveloperPhotos;
