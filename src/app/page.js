import SearchPropertySection from "@/Components/SearchPropertySection/SearchPropertySection";
import PropertyListing from "@/Components/PropertyListing/PropertyListing";
import FeaturesCopy from "@/Components/FeaturesCopy/FeaturesCopy";
import SponsoredProperty from "@/Components/SponsoredProperty/SponsoredProperty";
import ProjectCarousel from "@/Components/ProjectCarousel/ProjectCarousel";
import AdviceAndTools from "@/Components/AdviceAndTools/AdviceAndTools";
import PropertyServices from "@/Components/PropertyServices/PropertyServices";

import PopularCities from "@/Components/PopularCities/PopularCities";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { get, getssr } from "@/lib/api";
import { LARAVEL_API_BASE_URL } from "@/lib/config";
import { cookies } from "next/headers";

const backendBase = process.env.LARAVEL_API_BASE_URL?.replace(/\/$/, "") || "";

const extractArray = (res) => {
  if (Array.isArray(res)) return res;
  if (res?.data) {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.data)) return res.data.data;
  }
  return [];
};

const fetchProject = async (cityId) => {
  try {
    const url = cityId ? `/api/get-all-project-listing-no-auth?per_page=10&city_id=${cityId}` : `/api/get-all-project-listing-no-auth?per_page=10`;
    const response = await getssr(url);
    return extractArray(response);
  } catch (err) {
    console.error("Error fetching Projects", err);
    return [];
  }
}

const fetchProperties = async (cityId) => {
  try {
    const postTypes = "property_listing,property-listing,propertylisting";
    const url = `/api/frontend/properties/search?post_type=${postTypes}&per_page=20&page=1${cityId ? `&city_id=${cityId}` : ""}`;
    const response = await getssr(url);
    return extractArray(response);
  } catch (err) {
    console.error("Error fetching properties", err);
    return [];
  }
}

const fetchDeveloper = async (cityId) => {
  try {
    const url = cityId ? `/api/fetch-all-developer-listing-no-auth?per_page=5&city_id=${cityId}` : `/api/fetch-all-developer-listing-no-auth?per_page=5`;
    const response = await getssr(url);
    return extractArray(response);
  } catch (err) {
    console.error("Error fetching Developer", err);
    return [];
  }
}



export default async function Home() {
  const cookieStore = cookies();
  const cityCookie = cookieStore.get("selectedCity");
  let cityId = "";
  if (cityCookie) {
    try {
      const cityData = JSON.parse(decodeURIComponent(cityCookie.value));
      cityId = cityData.id;
    } catch (e) {}
  }

  const projects = await fetchProject(cityId)
  const propertyList = await fetchProperties(cityId)
  const developer = await fetchDeveloper(cityId)

  return (
    <>
      <SearchPropertySection />
      <FeaturesCopy projects={projects} />
      <PropertyListing propertyList={propertyList} />
      <SponsoredProperty developer={developer} />
      <ProjectCarousel projects={projects} />
      <AdviceAndTools />
      <PropertyServices />

      <PopularCities />

    </>
  );
}
