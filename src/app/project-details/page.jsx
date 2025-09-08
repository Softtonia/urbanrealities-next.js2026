
import styles from "./components/Project-detailsPage.module.css";
import ProjectBanner from "./components/ProjectBanner";
import ProjectTabs from "./components/ProjectTabs";
import ProjectAbout from "./components/ProjectAbout";
import ProjectListingWithTab from "./components/ProjectListingWithTab";
import ProjectFAQ from "./components/ProjectFAQ";
import ProjectPhotosAndReviews from "./components/ProjectPhotosAndReviews";
import ProjectTopAdvertisers from "./components/ProjectTopAdvertisers";
import ProjectDeveloperInfo from "./components/ProjectDeveloperInfo";
import FloorPlanSection from "./components/FloorPlanSection";
// Mobilepage
import AllProject from "./components/project-details-mobile/AllProject";
import DeveloperInfoMobile from "./components/project-details-mobile/DeveloperInfoMobile";
import ProjectTileData from "./components/project-details-mobile/ProjectTileData";
import CompletedProjectTiles from "./components/project-details-mobile/CompletedProjectTiles";
import OtherBuilders from "./components/project-details-mobile/OtherBuilders";
import FAQAccordion from "./components/project-details-mobile/FAQAccordion";
import HomeLoanOffers from "./components/project-details-mobile/HomeLoanOffers";
import { get } from "@/lib/api";
import { ProjectProvider } from "./context/ProjectContext";

async function fetchProject(id) {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/get-data-project-no-auth/${id}`);
    const data = response?.data;
    // console.log("=>", data)

    if (data) return data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching project:", err);
    return [];
  }
}

const Page = async ({ searchParams }) => {

  const { id } = searchParams
  const project = await fetchProject(id)

  return (
    <ProjectProvider value={project}>
      <div>
        <ProjectBanner />
        <div style={{ position: 'sticky', top: '0', zIndex: '20' }}>
          <ProjectTabs />
        </div>
        <div className="container">
          <div className="row tab-row">
            <div className={`col-9 ${styles.largeTabCol}`}>
              <section id="about-project">
                <ProjectAbout />
              </section>

              <section id="properties">
                <ProjectListingWithTab />
              </section>

              <section id="top-advertiser">
                <ProjectTopAdvertisers />
              </section>

              <section id="floor-plan-&-unit">
                <FloorPlanSection />
              </section>

              <section id="project-details">
                <ProjectPhotosAndReviews />
              </section>

              <section id="about-developer">
                <ProjectDeveloperInfo />
              </section>

              <section id="faq">
                <ProjectFAQ />
              </section>
            </div>

            <div className={`col-3 ${styles.smallTabCol}`}></div>

            <div className={`col-12 p-0 ${styles.mobileCol}`}>
              <section id="all-project">
                <AllProject />
              </section>

              <section id="developer-mobile">
                <DeveloperInfoMobile />
              </section>

              <section id="ongoing-projects">
                <ProjectTileData headingText="Ongoing Project by Mundeshwari II" />
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
    </ProjectProvider>
  );
};

export default Page;
