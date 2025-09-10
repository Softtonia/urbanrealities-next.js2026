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
    console.log(err.response);
    console.error("Error fetching project:", err);
    return [];
  }
}

const Page = async ({ searchParams }) => {
  const { id } = searchParams;
  const project = await fetchProject(id);
  

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

            <div className={`col-12  ${styles.mobileCol}`}>
              <ProjectAbout />
              <ProjectListingWithTab />
              <ProjectTopAdvertisers />
              <FloorPlanSection />
              <ProjectPhotosAndReviews />
              <ProjectDeveloperInfo />
              <ProjectFAQ />

            </div>
          </div>

        </div>
      </div>
    </ProjectProvider>
  );
};

export default Page;
