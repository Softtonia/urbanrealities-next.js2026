import React from 'react';
// import AgentProfileDetails from '../components/agent-profile/AgentProfile';
// import AboutAgent from '../components/about-agent/AboutAgent';
// import styles from './components/about-agent/AboutAgent.module.css'
import AgentProfileLayout from '../AgentProfileLayout';
import { get } from '@/lib/api';



async function getAgentProfile(id) {
  try {

    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/get-userdata-by-id?id=${id}`);
    const data = response?.data;
    if (data.success === true) return data.user;

    return [];

  } catch (err) {

    console.error("Error fetching user:", err);
    return [];
  }
}

async function fetchRelatedProperties(id) {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/get-related-properties-id/${id}`);
    const data = response?.user;
    console.log("=>", data)

    if (Array.isArray(data)) return data;
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching related properties:", err);
    return [];
  }
}
async function fetchUserProperties(id, purpose_id) {
  try {
    // ✅ Build query string dynamically (only add purpose_id if present)
    let url = `/api/get-property-by-user-id-filter-by-purpose/${id}`;
    if (purpose_id) {
      url += `?purpose_id=${purpose_id}`;
    }

    const response = await get(url);
    const data = response?.data?.data?.properties;

    console.log("=>", data);

    if (Array.isArray(data)) return data;
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.log(err.response);
    console.error("Error fetching user properties:", err);
    return [];
  }
}


const agentdetailspage = async ({ params, searchParams }) => {
  const { id } = await params; // no need for await
  const purpose_id = searchParams?.purpose_id; // query string ?purpose_id=123

  const agentProfile = await getAgentProfile(id)
  
  const relatedProperties = await fetchRelatedProperties(id)
  const userProperties = await fetchUserProperties(id, purpose_id)
  return (
    //     <div className={` ${styles.container} container `}>
    // <AgentProfileDetails/>
    // <AboutAgent/>
    //     </div>
    <>
      <AgentProfileLayout agentProfile={agentProfile} relatedProperties={relatedProperties} userProperties={userProperties} />
    </>
  );
}

export default agentdetailspage;
