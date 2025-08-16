import React from 'react';
import AgentProfileDetails from './components/agent-profile/AgentProfile';
import AboutAgent from './components/about-agent/AboutAgent';
import styles from './components/about-agent/AboutAgent.module.css'
import AgentProfileLayout from './AgentProfileLayout';
const agentdetailspage = () => {
  return (
//     <div className={` ${styles.container} container `}>
// <AgentProfileDetails/>
// <AboutAgent/>
//     </div>
<>
<AgentProfileLayout/>
</>
  );
}

export default agentdetailspage;
