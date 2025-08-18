"use client"

import AgentCard from "./components/AgentCard/AgentCard";
import styles from "./components/AllAgents.module.css";
import { useEffect, useState } from "react";

export default function FindAgentPage() {
  const [agents, setAgents] = useState([]); // <-- initialize as array

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch('/api/agent/agent-listing');
        const data = await res.json();
        if (data) {
          setAgents(data?.users.data);
        } 
      } catch (err) {
        console.error('Error fetching agent:', err);
      }
    };
    fetchAgent();
  }, []);

  console.log(agents)

  return (
    <div className={` ${styles.findAgent} container`}>
      {agents.map((field, index) => (
        <AgentCard key={index} agent={field} /> // <-- return component and add key
      ))}
    </div>
  );
}
