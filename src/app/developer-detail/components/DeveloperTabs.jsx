"use client"
import React, { useEffect, useState } from 'react'
import styles from './DeveloperTabs.module.css'
import { useDeveloper } from '../context/DeveloperContext';

const multiTabs = [
    "Overview",
    "Ongoing Project",
    // "Completed Project",
    "Photos",
    "FAQ",
    "Vision",
    "Home Loan Offers",
    // "Near By Project",
    // "Others Project"
];

const DeveloperTabs = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const {section} =useDeveloper()

    useEffect(() => {
        const handleScroll = () => {
            const sections = tabs.map((tab) =>
                document.getElementById(tab.toLowerCase().replace(/\s+/g, "-"))
            );

            let currentSection = activeTab;

            sections.forEach((section) => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section.id;
                    }
                }
            });

            if (currentSection !== activeTab) {
                setActiveTab(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeTab]);

    const tabs = multiTabs.filter(tab => section[tab]);

    return (
        <div className={styles.tabContainer}>
            <div className={`${styles["tab-crum"]} container`}>
                {tabs.map((tab, index) => {
                    const sectionId = tab.toLowerCase().replace(/\s+/g, "-");
                    return (
                        <a
                            key={index}
                            href={`#${sectionId}`}
                            className={`${styles.tabItem} body-text-rg16 ${activeTab === sectionId ? styles.active : ""
                                }`}
                        >
                            {tab}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};


export default DeveloperTabs
