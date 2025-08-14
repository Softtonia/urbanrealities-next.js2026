import AgentCard from "@/app/find-agent/components/AgentCard/AgentCard";
import styles from "./components/AllAgents.module.css"
const agentData = {
  image: "/agent-img.png",
  name: "Lily Nguyen",
  company: "Dreams home pvt. ltd.",
  rent: 145,
  sale: 45,
  deals: 400,
  locations: "Amar Colony, Lajpat Nagar 4, Greater Kailash 1, Defence Colony"
};

export default function FindAgentPage() {
  return (
    <div className={` ${styles.findAgent} container `}>
      <AgentCard agent={agentData} />
      <AgentCard agent={agentData} />
      <AgentCard agent={agentData} />
     <AgentCard agent={agentData} />
      <AgentCard agent={agentData} />
      <AgentCard agent={agentData} />

    </div>
  );
}
