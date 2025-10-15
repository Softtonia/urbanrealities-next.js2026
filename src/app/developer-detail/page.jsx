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
import { get, getssr } from "@/lib/api";
import styles from "./components/developer-listing.module.css";
// for desktop
import DeveloperStats from "./components/DeveloperStats/DeveloperStats";
import DeveloperListingwithTabs from "./components/DeveloperCardTabs/DeveloperListingwithTabs";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import PropertydetailsBreadcrum from './../propertydetails/[id]/components/PropertydetailsBreadcrum';
import DeveloperBreadcrumb from "./components/developerBreadcrumb/DeveloperBreadcrumb";
import DeveloperVision from "./components/Developervision/DeveloperVision";
import DeveloperPhotos from "./components/DeveloperPhotos/DeveloperPhotos";

async function fetchDeveloper(id) {
  try {
    const response = await getssr(`/api/get-data-developer-no-auth/${id}`);
    const data = response?.data;
    if (data) return data;
    return [];
  } catch (err) {
    console.error("Error fetching developer:", err);
    return [];
  }
}

async function fetchProject(id) {
  try {
    const response = await getssr(`/api/get-all-ongoing-projects-by-developer?developer_id=${id}`);

    // Handle non-200 responses
    if (!response || response.status >= 400) {
      console.error(`❌ API Error ${response?.status}: ${response?.statusText}`);
      return { error: true, status: response?.status || 500 };
    }

    const data = response?.data?.data;
    return data || { error: true, status: 404 };
  } catch (err) {
    console.error("Error fetching project:", err);
    return { error: true, status: err?.response?.status || 500 };
  }
}

async function fetchCompletedProject(id) {
  try {
    const response = await getssr(`/api/get-all-completed-projects-by-developer?developer_id=${id}`);

    // Handle non-200 responses
    if (!response || response.status >= 400) {
      console.error(`❌ API Error ${response?.status}: ${response?.statusText}`);
      return { error: true, status: response?.status || 500 };
    }

    const data = response?.data?.data;
    return data || { error: true, status: 404 };
  } catch (err) {
    console.error("Error fetching project:", err);
    return { error: true, status: err?.response?.status || 500 };
  }
}

const DeveloperPage = async ({ searchParams }) => {


  const { id } = await searchParams;

  // Fetch developer details
  const developer = await fetchDeveloper(id);

  // Fetch ongoing projects only if developer exists
  const ongoingProjects = developer?.id ? await fetchProject(developer.id) : [];
  const completedProjects = developer?.id ? await fetchCompletedProject(developer.id) : [];

  const ongoing = developer?.name
    ? `Ongoing Projects by ${developer.name}`
    : "Ongoing Projects";
  const completed = developer?.name
    ? `Completed Projects by ${developer.name}`
    : "Completed Projects";
  console.log("developer", completedProjects);
  const section = {
    Overview: true,
    "Ongoing Project": true,
    "Completed Project": true,
    Photos: true,
    FAQ: true,
    Vision: true,
    "Home Loan Offers": true,
  };

  if (!completedProjects) {
    section["Completed Project"] = false;
  }
  //  if (!completedProjects) {
  //   section["Ongoing Project"] = false;
  // }

  return (
    <DeveloperProvider value={{ developer, ongoingProjects, completedProjects, section }}>
      <div>
        <DeveloperBreadcrumb />
        <DeveloperBanner />
        <div style={{ position: "sticky", top: "0", zIndex: "20" }}>
          <DeveloperTabs />
        </div>
        <div className="container">
          <div className="row tab-row">
            <div className={`col-9 ${styles.largeTabCol}`}>
              <section id="overview">
                <DeveloperStats />
              </section>
              
              {ongoingProjects.length > 0 && (
                <section id="ongoing-project">

                  <DeveloperListingwithTabs DevHeading={ongoing} listingFor="ongoing" />
                </section>
              )}

              {completedProjects.length > 0 && (
                <section id="completed-project">
                  <DeveloperListingwithTabs DevHeading={completed} listingFor="completed" />
                </section>
              )}
            </div>


            <div className={`col-12 p-0 ${styles.mobileCol}`}>
              <section id="overview">
                <DeveloperStats />
              </section>
              {ongoingProjects.length > 0 && (
                <section id="ongoing-project">
                  <DeveloperListingwithTabs DevHeading={ongoing} listingFor="ongoing" />
                </section>
              )}

              {completedProjects.length > 0 && (
                <section id="completed-project">
                  <DeveloperListingwithTabs DevHeading={completed} listingFor="completed" />
                </section>
              )}
              {/* <section id="nearby-projects">
                <DeveloperListingwithTabs
                  DevHeading={`other Project `}
                />
              </section> */}

            </div>

            <div className={`col-12 ${styles.smallTabCol}`}>
              <section id="photos">
                <DeveloperPhotos />
              </section>
              <section id="faq">
                <ProjectFAQ />
              </section>
              <section id="vision">
                <DeveloperVision />
              </section>
              <section id="home-loan-offers">

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
  );
};

export default DeveloperPage;
