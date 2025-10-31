"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaComments, FaFolderOpen, FaFileAlt } from "react-icons/fa";
import styles from "./BannerSection.module.css";
import { useCity } from "@/utils/CityContext";

const BannerSection = ({ cityName = "Navi Mumbai" }) => {
    const { city } = useCity()

    const cards = [
        {
            id: 1,
            title: "Expert Reviews &",
            highlight: "Advice",
            icon: <FaComments className={styles.iconYellow} />,
            bgClass: styles.yellowCard,
            onClick: () => router.push("#"),
        },
        {
            id: 2,
            title: "Project Directory",
            highlight: "For All New Projects",
            icon: <FaFolderOpen className={styles.iconBlue} />,
            bgClass: styles.blueCard,
            onClick: () => router.push("#"),
        },
        {
            id: 3,
            title: "Updated Project Reports from",
            highlight: "RERA",
            icon: <FaFileAlt className={styles.iconRed} />,
            bgClass: styles.redCard,
            onClick: () => router.push("#"),
        },
    ];

    return (
        <section
            className={styles.bannerSection}
            style={{ backgroundImage: `url('/project-placeholder.png')` }}
        >

            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 className={styles.brand}>Urbanrealities</h1>
                <h2 className={styles.heading}>Encyclopedia For All New Projects</h2>
                <p className={styles.subHeading}>
                    in <span className={styles.city}>{city?.name}</span>
                </p>

                <div className={styles.cardsContainer}>
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`${styles.card} ${card.bgClass}`}
                            onClick={card.onClick}
                        >
                            <div className={styles.iconWrapper}>{card.icon}</div>
                            <p className={styles.cardTitle}>{card.title}</p>
                            <p className={styles.cardHighlight}>{card.highlight}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
