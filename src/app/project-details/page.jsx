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
import ProjectDetail from "./Project-detail";

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
// async function fetchOtherProject(id, country_id, state_id, city_id) {
//   try {
//     const response = await getssr(`/api/get-other-projects/${id}?country_id=${country_id}&state_id=${state_id}&city_id=${city_id}`);

//     // Handle non-200 responses
//     if (!response || response.status >= 400) {
//       console.error(`❌ API Error ${response?.status}: ${response?.statusText}`);
//       return { error: true, status: response?.status || 500 };
//     }

//     const data = response?.data;
//     return data || { error: true, status: 404 };
//   } catch (err) {
//     console.error("Error fetching project:", err);
//     return { error: true, status: err?.response?.status || 500 };
//   }
// }


const Page = async ({ searchParams }) => {
  const { id } = searchParams;
  // const {city} = useCity();

  // Fetch project data
  const project = await fetchProject(id);
  // console.log(city)
  console.log("Project Page SSR running...");

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
  const section = {
    Overview: true,
    Properties: true,
    "Top Advertiser": true,
    "Floor Plan & Unit": true,
    "Project Details": true,
    "About Developer": true,
    FAQ: true,
    "Near By Project": true,
    "Others Project": true,
  };




  return (
    <ProjectDetail section={section} project={project} />
  );
};

export default Page;
