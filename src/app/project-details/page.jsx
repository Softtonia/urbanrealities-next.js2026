"use client";
import styles from "./components/Project-detailsPage.module.css";
import ProjectBanner from "./components/ProjectBanner";
// import { useSearchParams } from "next/navigation";
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
const Page = () => {
  // const params = useSearchParams();

  // const project = {
  //   location: params.get("location"),
  //   builder: params.get("builder"),
  //   reraNo: params.get("reraNo"),
  //   rating: params.get("rating"),
  //   propertyType: params.get("propertyType"),
  //   ongoingPrice: params.get("ongoingPrice"),
  //   areaSqft: params.get("areaSqft"),
  //   bhk: params.get("bhk"),
  //   builderFloor: params.get("builderFloor"),
  //   status: params.get("status"),
  // };

  return (
    <div>
      {/* <ProjectBanner project={project} /> */}
      <ProjectBanner />
      <ProjectTabs />

      <div className="container">
        <div className="row tab-row">
          <div className={`col-9 ${styles.largeTabCol}`}>
            <ProjectAbout />
            <ProjectListingWithTab />
            <ProjectTopAdvertisers />
            <FloorPlanSection />
            <ProjectPhotosAndReviews />
            <ProjectDeveloperInfo />
            <ProjectFAQ />
          </div>
          <div className={`col-3 ${styles.smallTabCol}`}></div>

          <div className={`col-12 p-0 ${styles.mobileCol}`}>
            <AllProject />
            <DeveloperInfoMobile />
            <ProjectTileData  headingText="Ongoing Project by Mundeshwari II"/>
            <CompletedProjectTiles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
