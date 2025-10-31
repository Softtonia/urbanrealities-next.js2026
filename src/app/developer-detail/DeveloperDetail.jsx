"use client";
import React, { useEffect, useState } from "react";
import { DeveloperProvider } from "./context/DeveloperContext";
import DeveloperBanner from "./components/DeveloperBanner";
import DeveloperTabs from "./components/DeveloperTabs";
import DeveloperStats from "./components/DeveloperStats/DeveloperStats";
import DeveloperListingwithTabs from "./components/DeveloperCardTabs/DeveloperListingwithTabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import DeveloperBreadcrumb from "./components/developerBreadcrumb/DeveloperBreadcrumb";
import DeveloperVision from "./components/Developervision/DeveloperVision";
import DeveloperPhotos from "./components/DeveloperPhotos/DeveloperPhotos";
import HomeLoanOffers from "./components/project-details-mobile/HomeLoanOffers";
import styles from "./components/developer-listing.module.css";

const DeveloperDetail = ({ developer }) => {
    const [ongoingProjects, setOngoingProjects] = useState(null);
    const [completedProjects, setCompletedProjects] = useState(null);
    const [ongoingMeta, setOngoingMeta] = useState({});
    const [completedMeta, setCompletedMeta] = useState({});
    const [ongoingPage, setOngoingPage] = useState(1);
    const [completedPage, setCompletedPage] = useState(1);
    const [loadingOngoing, setLoadingOngoing] = useState(true);
    const [loadingCompleted, setLoadingCompleted] = useState(true);

    const [section, setSection] = useState({
        Overview: true,
        "Ongoing Project": true,
        "Completed Project": true,
        Photos: true,
        FAQ: true,
        "Mission and Vision": true,
        "Home Loan Offers": true,
    });

    // 🔹 Fetch Ongoing Projects
    useEffect(() => {
        const fetchOngoing = async () => {
            if (!developer?.id) return;
            setLoadingOngoing(true);
            try {
                const res = await fetch(
                    `/api/developer-detail/ongoing-projects?id=${developer.id}&page=${ongoingPage}&per_page=4`
                );
                const data = await res.json();
                const projects = data?.data || [];

                setOngoingProjects(projects);
                setOngoingMeta(data?.meta || {});

                // Update visibility after fetch
                setSection((prev) => ({
                    ...prev,
                    "Ongoing Project": projects.length > 0,
                }));
            } catch (error) {
                console.error("Error fetching ongoing projects:", error);
                setOngoingProjects([]);
                setSection((prev) => ({ ...prev, "Ongoing Project": false }));
            } finally {
                setLoadingOngoing(false);
            }
        };
        fetchOngoing();
    }, [developer?.id, ongoingPage]);

    // 🔹 Fetch Completed Projects
    useEffect(() => {
        const fetchCompleted = async () => {
            if (!developer?.id) return;
            setLoadingCompleted(true);
            try {
                const res = await fetch(
                    `/api/developer-detail/completed-project?id=${developer.id}&page=${completedPage}&per_page=4`
                );
                const data = await res.json();
                const projects = data?.data || [];

                setCompletedProjects(projects);
                setCompletedMeta(data?.meta || {});
                setSection((prev) => ({
                    ...prev,
                    "Completed Project": projects.length > 0,
                }));
            } catch (error) {
                console.error("Error fetching completed projects:", error);
                setCompletedProjects([]);
                setSection((prev) => ({ ...prev, "Completed Project": false }));
            } finally {
                setLoadingCompleted(false);
            }
        };
        fetchCompleted();
    }, [developer?.id, completedPage]);

    const ongoingHeading = developer?.name
        ? `Ongoing Projects by ${developer.name}`
        : "Ongoing Projects";
    const completedHeading = developer?.name
        ? `Completed Projects by ${developer.name}`
        : "Completed Projects";

    return (
        <DeveloperProvider
            value={{
                developer,
                section,
                setSection,
            }}
        >
            <div>
                <DeveloperBreadcrumb />
                <DeveloperBanner />

                <div style={{ position: "sticky", top: 0, zIndex: 20 }}>
                    <DeveloperTabs />
                </div>

                <div className="container">
                    <div className="row tab-row">
                        <div className={`col-lg-9 col-12 ${styles.largeTabCol}`}>
                            {/* Overview */}
                            <section id="overview" className={styles.section}>
                                <DeveloperStats />
                            </section>

                            {/* Ongoing Projects */}
                            {
                                (loadingOngoing || ongoingProjects?.length > 0) && (
                                    <section id="ongoing-project" className={styles.section}>
                                        <DeveloperListingwithTabs
                                            DevHeading={ongoingHeading}
                                            Projects={ongoingProjects || []}
                                            isLoading={loadingOngoing}
                                            meta={ongoingMeta}
                                            currentPage={ongoingPage}
                                            onPageChange={setOngoingPage}
                                        />
                                    </section>
                                )
                            }

                            {/* Completed Projects */}
                            {(loadingCompleted || completedProjects?.length > 0) && (
                                <section id="completed-project" className={styles.section}>
                                    <DeveloperListingwithTabs
                                        DevHeading={completedHeading}
                                        Projects={completedProjects || []}
                                        isLoading={loadingCompleted}
                                        meta={completedMeta}
                                        currentPage={completedPage}
                                        onPageChange={setCompletedPage}
                                    />
                                </section>
                            )
                            }
                        </div>

                        {/* Sidebar */}
                        <div className={`col-12 ${styles.smallTabCol}`}>
                            <section id="photos" className={styles.section}>
                                <DeveloperPhotos />
                            </section>
                            <section id="faq" className={styles.section}>
                                <ProjectFAQ />
                            </section>
                            <section id="mission-and-vision" className={styles.section}>
                                <DeveloperVision />
                            </section>
                            <section id="home-loan-offers" className={styles.section}>
                                <HomeLoanOffers />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </DeveloperProvider>
    );
};

export default DeveloperDetail;
