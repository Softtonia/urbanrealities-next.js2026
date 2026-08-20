import SearchPropertySection from "@/Components/SearchPropertySection/SearchPropertySection";
import PropertyListing from "@/Components/PropertyListing/PropertyListing";
import FeaturesCopy from "@/Components/FeaturesCopy/FeaturesCopy";
import SponsoredProperty from "@/Components/SponsoredProperty/SponsoredProperty";
import ProjectCarousel from "@/Components/ProjectCarousel/ProjectCarousel";
import AdviceAndTools from "@/Components/AdviceAndTools/AdviceAndTools";
import PropertyServices from "@/Components/PropertyServices/PropertyServices";
import PopularCities from "@/Components/PopularCities/PopularCities";
import AgentCarousel from "@/Components/AgentCarousel/AgentCarousel";
import SubHero from "@/Components/SubHero/SubHero";

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

const fetchAgents = async (cityId) => {
  try {
    // Adding a timestamp ensures it always bypasses any aggressive caching in Next.js/Axios
    const timestamp = new Date().getTime();
    // Setting per_page=15 so the carousel has items to scroll through
    const url = `/api/frontend/city-explore/agents?city_id=${cityId || 1}&page=1&per_page=15&t=${timestamp}`;
    const response = await getssr(url);
    return response?.data?.data || [];
  } catch (err) {
    console.error("Error fetching Agents", err);
    return [];
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const cookieStore = cookies();
  const cityCookie = cookieStore.get("selectedCity");
  let cityId = "";
  let cityName = "your area";
  if (cityCookie) {
    try {
      const cityData = JSON.parse(decodeURIComponent(cityCookie.value));
      cityId = cityData.id;
      if (cityData.name) {
        cityName = cityData.name;
      }
    } catch (e) {}
  }

  const projects = await fetchProject(cityId)
  const propertyList = await fetchProperties(cityId)
  const developer = await fetchDeveloper(cityId)
  const agents = await fetchAgents(cityId);

  return (
    <>
      <SearchPropertySection />
      <FeaturesCopy projects={projects} />
      <PropertyListing propertyList={propertyList} />
      <SponsoredProperty developer={developer} />
      
      <div className="container" style={{ paddingBottom: '2rem' }}>
        <SubHero subHeroHeading={`Holiplaces Agents in ${cityName}`} subHeroText="Find the best real estate experts" />
        
        {agents && agents.length > 0 ? (
          <div style={{ marginTop: '1.5rem' }}>
            <AgentCarousel agents={agents} />
          </div>
        ) : (
          <p style={{ color: '#666', marginTop: '1.5rem' }}>No agents are currently available in {cityName}.</p>
        )}
      </div>

      <ProjectCarousel projects={projects} />
      <AdviceAndTools />
      <PropertyServices />

      <PopularCities />

    </>
  );
}
