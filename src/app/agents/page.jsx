import { getssr } from "@/lib/api";
import AgentCard from "./components/AgentCard/AgentCard";
import styles from "./components/AllAgents.module.css";
import { cookies } from "next/headers";

async function getAgent(cityId) {
  try {
    const timestamp = new Date().getTime();
    const response = await getssr(
      `/api/frontend/city-explore/agents?city_id=${cityId || 1}&page=1&per_page=15&t=${timestamp}`,
    );
    const data = response?.data?.data;
    if (Array.isArray(data)) return data;
    return [];
  } catch (err) {
    console.error("Error fetching agents:", err);
    return [];
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FindAgentPage() {
  const cookieStore = cookies();
  const cityCookie = cookieStore.get("selectedCity");
  let cityId = "";
  if (cityCookie) {
    try {
      const cityData = JSON.parse(decodeURIComponent(cityCookie.value));
      cityId = cityData.id;
    } catch (e) {}
  }

  const agents = await getAgent(cityId);

  return (
    <div className={` ${styles.findAgent} container`}>
      {agents && agents.length > 0 ? (
        agents.map((field, index) => (
          <AgentCard key={index} agent={field} />
        ))
      ) : (
        <div style={{ textAlign: 'center', width: '100%', padding: '4rem 2rem', color: '#666' }}>
          <h3>No agents found</h3>
          <p>There are currently no agents listed for your selected city.</p>
        </div>
      )}
    </div>
  );
}
