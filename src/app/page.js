import SearchPropertySection from "@/Components/SearchPropertySection/SearchPropertySection";
import PropertyListing from "@/Components/PropertyListing/PropertyListing";
import FeaturesCopy from "@/Components/FeaturesCopy/FeaturesCopy";
import SponsoredProperty from "@/Components/SponsoredProperty/SponsoredProperty";
import ProjectCarousel from "@/Components/ProjectCarousel/ProjectCarousel";
import AdviceAndTools from "@/Components/AdviceAndTools/AdviceAndTools";
import PropertyServices from "@/Components/PropertyServices/PropertyServices";
import WhyChooseus from "@/Components/WhyChoose/WhyChooseus";
import PopularCities from "@/Components/PopularCities/PopularCities";
import Testimonials from "@/Components/Testimonials/Testimonials";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { get } from "@/lib/api";

const fetchProject = async ()=> {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/get-all-project-listing-no-auth?per_page=10`);
    const data = response?.data;

    if (data) return data.data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching Projects", err);
    return [];
  }
}
const fetchProperties = async ()=> {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/get-all-properties-listing-no-auth?per_page=10`);
    const data = response?.data;
    console.log("=>", data)

    if (data) return data.data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching properties", err);
    return [];
  }
}
const fetchDeveloper = async ()=> {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/fetch-all-developer-listing-no-auth?per_page=5`);
    const data = response?.data;
    console.log("=>", data)

    if (data) return data.data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching properties", err);
    return [];
  }
}


export default async function Home() {
  const projects =await fetchProject()
  const propertyList = await fetchProperties()
  const developer = await fetchDeveloper()
  return (
    <>
      <SearchPropertySection />
      <FeaturesCopy projects={projects}/>
      <PropertyListing propertyList={propertyList}/>
      <SponsoredProperty developer={developer}/>
      <ProjectCarousel projects={projects} />
      <AdviceAndTools />
      <PropertyServices />
      <WhyChooseus />
      <PopularCities />
      <Testimonials />
    </>
  );
}
