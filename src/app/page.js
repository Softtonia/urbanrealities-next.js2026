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
import { get, getssr } from "@/lib/api";

const backendBase = process.env.LARAVEL_API_BASE_URL?.replace(/\/$/, "") || "";

const extractArray = (res) => {
  if (Array.isArray(res)) return res;
  if (res?.data) {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.data)) return res.data.data;
  }
  return [];
};

const fetchProject = async () => {
  try {
    const response = await getssr(`${backendBase}/api/get-all-project-listing-no-auth?per_page=10`);
    return extractArray(response);
  } catch (err) {
    console.error("Error fetching Projects", err);
    return [];
  }
}

const fetchProperties = async () => {
  try {
    const response = await getssr(`${backendBase}/api/get-all-properties-listing-no-auth?per_page=8`);
    return extractArray(response);
  } catch (err) {
    console.error("Error fetching properties", err);
    return [];
  }
}

const fetchDeveloper = async () => {
  try {
    const response = await getssr(`${backendBase}/api/fetch-all-developer-listing-no-auth?per_page=5`);
    return extractArray(response);
  } catch (err) {
    console.error("Error fetching Developer", err);
    return [];
  }
}

const fetchReviews = async () => {
  try {
    const response = await getssr(`${backendBase}/api/get-client-review`);
    return extractArray(response);
  } catch (err) {
    console.error("Error fetching reviews", err);
    return [];
  }
};


export default async function Home() {
  const projects = await fetchProject()
  const propertyList = await fetchProperties()
  const developer = await fetchDeveloper()
  const reviews = await fetchReviews()
  return (
    <>
      <SearchPropertySection />
      <FeaturesCopy projects={projects} />
      <PropertyListing propertyList={propertyList} />
      <SponsoredProperty developer={developer} />
      <ProjectCarousel projects={projects} />
      <AdviceAndTools />
      <PropertyServices />
      <WhyChooseus />
      <PopularCities />
      <Testimonials reviews={reviews} />
    </>
  );
}
