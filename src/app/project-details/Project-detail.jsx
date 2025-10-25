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
import { useCity } from "@/utils/CityContext";
import NearByProjectList from "./components/NearByProjects/NearByProjectList";
import PropertiesListingWithTab from "./components/PropertiesListingWithTab";
import OtherProjects from "./components/NearByProjects/OtherProjects";


const ProjectDetail = ({ section, project }) => {
    console.log("section",section)
    return (
        <ProjectProvider value={{ project, section }}>
            <div>
                <ProjectBreadcrumb />
                <ProjectBanner />
                <div style={{ position: "sticky", top: "0", zIndex: "20" }}>
                    <ProjectTabs />
                </div>
                <div className="container">
                    <div className="row tab-row">

                        {/* Desktop: Left Column */}
                        <div className={`col-9 ${styles.largeTabCol}`}>
                            <section className={styles.section} id="overview"><ProjectAbout /></section>
                            <section className={styles.section} id="properties"><PropertiesListingWithTab /></section>
                            <section className={styles.section} id="top-advertiser"><ProjectTopAdvertisers /></section>
                            <section className={styles.section} id="floor-plan-&-unit"><FloorPlanSection /></section>
                            <section className={styles.section} id="project-details"><ProjectPhotosAndReviews /></section>
                            <section className={styles.section} id="about-developer"><ProjectDeveloperInfo /></section>
                            <section className={styles.section} id="faq"><ProjectFAQ /></section>
                            <section className={styles.section} id="near-by-project"><NearByProjectList projectId={project.id} /></section>
                            <section className={styles.section} id="other-project"><OtherProjects projectId={project.id} /></section>
                        </div>

                        {/* Desktop: Right Column (empty or sidebar) */}
                        <div className={`col-3 ${styles.smallTabCol}`}></div>

                        {/* Mobile: Full-width Column */}
                        <div className={`col-12 ${styles.mobileCol}`}>
                            <section className={styles.section} id="overview"><ProjectAbout /></section>
                            <section className={styles.section} id="properties"><PropertiesListingWithTab /></section>
                            <section className={styles.section} id="top-advertiser"><ProjectTopAdvertisers /></section>
                            <section className={styles.section} id="floor-plan-&-unit"><FloorPlanSection /></section>
                            <section className={styles.section} id="project-details"><ProjectPhotosAndReviews /></section>
                            <section className={styles.section} id="about-developer"><ProjectDeveloperInfo /></section>
                            <section className={styles.section} id="faq"><ProjectFAQ /></section>
                            <section className={styles.section} id="near-by-project"><NearByProjectList projectId={project.id} /></section>
                            <section className={styles.section} id="other-project"><OtherProjects projectId={project.id} /></section>
                        </div>

                    </div>
                </div>
            </div>
        </ProjectProvider>

    );
}
export default ProjectDetail;