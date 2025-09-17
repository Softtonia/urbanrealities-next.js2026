
import { getssr } from "@/lib/api";
import AgentCard from "./components/AgentCard/AgentCard";
import styles from "./components/AllAgents.module.css";


async function getAgent() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await getssr(`/api/get-all-users-by-role?role_id=3&per_page&page`);
    const data = response?.data?.users?.data;
    // console.log("==>",data)
    if (Array.isArray(data)) return data;
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching agents:", err);
    return [];
  }
}

export default async function FindAgentPage() {
  const agents =await getAgent() // <-- initialize as array
  console.log(agents)

  return (
    <div className={` ${styles.findAgent} container`}>
      {agents.map((field, index) => (
        <AgentCard key={index} agent={field} /> // <-- return component and add key
      ))}
    </div>
  );
}
