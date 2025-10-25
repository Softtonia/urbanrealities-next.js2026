"use client";
import React from "react";
import { DeveloperProvider } from "./context/DeveloperContext";
import DeveloperBanner from "./components/DeveloperBanner";
import DeveloperTabs from "./components/DeveloperTabs";
import AllProjects from "./components/project-details-mobile/AllProject";
import DeveloperInfoMobile from "./components/project-details-mobile/DeveloperInfoMobile";
import ProjectTileData from "./components/project-details-mobile/ProjectTileData";
import OtherBuilders from "./components/project-details-mobile/OtherBuilders";
import CompletedProjectTiles from "./components/project-details-mobile/CompletedProjectTiles";
import FAQAccordion from "./components/project-details-mobile/FAQAccordion";
import HomeLoanOffers from "./components/project-details-mobile/HomeLoanOffers";
// import { get, getssr } from "@/lib/api";
import styles from "./components/developer-listing.module.css";
// for desktop
import DeveloperStats from "./components/DeveloperStats/DeveloperStats";
import DeveloperListingwithTabs from "./components/DeveloperCardTabs/DeveloperListingwithTabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import PropertydetailsBreadcrum from './../propertydetails/[id]/components/PropertydetailsBreadcrum';
import DeveloperBreadcrumb from "./components/developerBreadcrumb/DeveloperBreadcrumb";
import DeveloperVision from "./components/Developervision/DeveloperVision";
import DeveloperPhotos from "./components/DeveloperPhotos/DeveloperPhotos";
const DeveloperDetail = ({ developer, ongoingProjects, completedProjects, section }) => {

    const ongoing = developer?.name
        ? `Ongoing Projects by ${developer.name}`
        : "Ongoing Projects";
    const completed = developer?.name
        ? `Completed Projects by ${developer.name}`
        : "Completed Projects";

    return (
        <DeveloperProvider value={{developer,section}}>
            <div>
                <DeveloperBreadcrumb />
                <DeveloperBanner />
                <div style={{ position: "sticky", top: "0", zIndex: "20" }}>
                    <DeveloperTabs />
                </div>
                <div className="container">
                    <div className="row tab-row">
                        <div className={`col-9 ${styles.largeTabCol}`}>
                            <section id="overview" className={styles.section}>
                                <DeveloperStats />
                            </section>

                            {ongoingProjects.length > 0 && (
                                <section id="ongoing-project" className={styles.section}>

                                    <DeveloperListingwithTabs DevHeading={ongoing} listingFor="ongoing" Projects={ongoingProjects} />
                                </section>
                            )}

                            {completedProjects.length > 0 && (
                                <section id="completed-project" className={styles.section}>
                                    <DeveloperListingwithTabs DevHeading={completed} listingFor="completed" Projects={completedProjects} />
                                </section>
                            )}
                        </div>


                        <div className={`col-12 p-0 ${styles.mobileCol}`}>
                            <section id="overview" className={styles.section}>
                                <DeveloperStats />
                            </section>
                            {ongoingProjects.length > 0 && (
                                <section id="ongoing-project" className={styles.section}>
                                    <DeveloperListingwithTabs DevHeading={ongoing} listingFor="ongoing" Projects={ongoingProjects} />
                                </section>
                            )}

                            {completedProjects.length > 0 && (
                                <section id="completed-project" className={styles.section}>
                                    <DeveloperListingwithTabs DevHeading={completed} listingFor="completed" Projects={completedProjects} />
                                </section>
                            )}
                            {/* <section id="nearby-projects">
                       <DeveloperListingwithTabs
                         DevHeading={`other Project `}
                       />
                     </section> */}

                        </div>

                        <div className={`col-12 ${styles.smallTabCol}`}>
                            <section id="photos" className={styles.section}>
                                <DeveloperPhotos />
                            </section>
                            <section id="faq" className={styles.section}>
                                <ProjectFAQ />
                            </section>
                            <section id="vision" className={styles.section}>
                                <DeveloperVision />
                            </section>
                            <section id="home-loan-offers" className={styles.section}>

                                <HomeLoanOffers />
                            </section>
                        </div>
                        {/* <div className={`col-12 p-0 ${styles.mobileCol}`}>
                     <section id="all-project">
                       <AllProjects />
                     </section>
                     <section id="developer-mobile">
                     <DeveloperStats />
       
                       <DeveloperInfoMobile />
                     </section>
                     <section id="ongoing-projects">
                       <ProjectTileData
                         headingText={`Ongoing Project by ${developer.name}`}
                       />
       
                     </section>
                     <section id="nearby-projects">
                       <OtherBuilders />
                     </section>
                     <section id="completed-projects">
                       <CompletedProjectTiles />
                     </section>
                     <section id="other-faq">
                       <FAQAccordion />
                     </section>
                     <section id="home-loan">
                       <HomeLoanOffers />
                     </section>
                   </div> */}
                    </div>
                </div>
            </div>
        </DeveloperProvider>
    )
}

export default DeveloperDetail
