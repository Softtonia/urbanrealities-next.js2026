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
import { get } from "@/lib/api";
import styles from "./components/developer-listing.module.css";
// for desktop
import DeveloperStats from "./components/DeveloperStats/DeveloperStats";
import DeveloperListingwithTabs from "./components/DeveloperCardTabs/DeveloperListingwithTabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";

async function fetchDeveloper(id) {
  try {
    const response = await get(`/api/get-data-developer-no-auth/${id}`);
    const data = response?.data;
    if (data) return data;
    return [];
  } catch (err) {
    console.error("Error fetching developer:", err);
    return [];
  }
}

const DeveloperPage = async ({ searchParams }) => {
  const { id } =await searchParams;

  const developer = await fetchDeveloper(id);

  return (
    <DeveloperProvider value={developer}>
      <div>
        <DeveloperBanner />
        <div style={{ position: "sticky", top: "0", zIndex: "20" }}>
          <DeveloperTabs />
        </div>
        <div className="container">
          <div className="row tab-row">
            <div className={`col-9 ${styles.largeTabCol}`}>
              <DeveloperStats />
              <DeveloperListingwithTabs />
              <ProjectFAQ />
            </div>
            <div className={`col-12 ${styles.smallTabCol}`}></div>
            <div className={`col-12 p-0 ${styles.mobileCol}`}>
              <section id="all-project">
                <AllProjects />
              </section>
              <section id="developer-mobile">
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
            </div>
          </div>
        </div>
      </div>
    </DeveloperProvider>
  );
};

export default DeveloperPage;
