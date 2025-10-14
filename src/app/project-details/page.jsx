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
import { getssr } from "@/lib/api";
import { ProjectProvider } from "./context/ProjectContext";
import ProjectBreadcrumb from "./components/ProjectBreadcrumb/ProjectBreadcrumb";

async function fetchProject(id) {
  try {
    const response = await getssr(`/api/get-data-project-no-auth/${id}`);

    // Handle non-200 responses
    if (!response || response.status >= 400) {
      console.error(`❌ API Error ${response?.status}: ${response?.statusText}`);
      return { error: true, status: response?.status || 500 };
    }

    const data = response?.data;
    return data || { error: true, status: 404 };
  } catch (err) {
    console.error("Error fetching project:", err);
    return { error: true, status: err?.response?.status || 500 };
  }
}

const Page = async ({ searchParams }) => {
  const { id } = searchParams;

  // Fetch project data
  const project = await fetchProject(id);

  // ✅ Error handling: show fallback UI
  if (project?.error) {
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h2>
          {project.status === 404
            ? "Project Not Found 😕"
            : "Something went wrong on our end 😔"}
        </h2>
        <p>
          {project.status === 500
            ? "Server error occurred. Please try again later."
            : "We couldn't find the project you’re looking for."}
        </p>
      </div>
    );
  }

  return (
    <ProjectProvider value={project}>
      <div>
        <ProjectBreadcrumb />
        <ProjectBanner />
        <div style={{ position: "sticky", top: "0", zIndex: "20" }}>
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

            <div className={`col-12 ${styles.mobileCol}`}>
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
