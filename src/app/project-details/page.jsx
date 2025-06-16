"use client";
import ProjectBanner from './components/ProjectBanner'
// import { useSearchParams } from "next/navigation";
import ProjectTabs from './components/ProjectTabs';
import ProjectAbout from './components/ProjectAbout';
import PropertyListingWithTab from './components/PropertyListingWithTab';


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
      <ProjectBanner/>
      <ProjectTabs/>

      <div className="project-tab-background">
      <div className="container">
        <div className="row tab-row">
          <div className="col-9 large-tab-col">
      <ProjectAbout/>
      <PropertyListingWithTab/>
        </div>
          <div className="col-3 small-tab-col">
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
