import React from 'react';
// import AgentProfileDetails from '../components/agent-profile/AgentProfile';
// import AboutAgent from '../components/about-agent/AboutAgent';
// import styles from './components/about-agent/AboutAgent.module.css'
import AgentProfileLayout from '../AgentProfileLayout';
import { get, getssr } from '@/lib/api';
import { getUserById } from '@/services/auth.service';
import { LARAVEL_API_BASE_URL } from '@/lib/config';
import { cookies } from 'next/headers';


async function getAgentProfile(id) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Using the standard client-side `get` function
    const response = await get(`/api/auth/getuser?user_id=${id}`, null, {
      headers: headers
    });
    const data = response?.data || response;

    console.log("dataagent" , response)
    
    // If it has success: true or status: true, extract the user
    if (data?.success === true || data?.status === true || response?.status === true) {
        // If it's returning the user in current_user
        if (response?.current_user) {
            return response.current_user;
        }
        if (data.current_user) {
            return data.current_user;
        }
        if (data.users?.data && Array.isArray(data.users.data)) {
            return data.users.data[0] || {};
        }
        if (data.user) {
            return data.user;
        }
        if (data.users && !Array.isArray(data.users)) {
            return data.users;
        }
        // Handle new data.raw format
        if (data.raw) {
            return {
                ...data.raw,
                dashboard_counts: data.dashboard_counts || {}
            };
        }
    }
    
    // If the response is directly the user object (has an id or first_name)
    if (data?.id || data?.first_name || data?.name || data?.bussiness_name) {
        return data;
    }
    
    // Fallback if data is wrapped differently or we couldn't find the user
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        return data; // just return it and hope for the best
    }

    return {};

  } catch (err) {
    console.error("Error fetching user:", err);
    return {};
  }
}

async function fetchRelatedProperties(id) {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/get-related-properties-id/${id}`);
    const data = response?.data?.data?.properties;

    console.log("=>", data);   
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
  const decontructtId = id.split("-").pop();
  console.log("==>", decontructtId); // Output: 3

  const purpose_id = searchParams?.purpose; // query string ?purpose_id=123

  const agentProfile = await getAgentProfile(decontructtId)
  console.log("agentProfile" , agentProfile)

  const relatedProperties = await fetchRelatedProperties(decontructtId)
  const userProperties = await fetchUserProperties(decontructtId, purpose_id)
  const agent = Array.isArray(agentProfile) ? agentProfile[0] : agentProfile
  console.log(relatedProperties)
  return (
 
    <>
      <AgentProfileLayout agentProfile={agent} relatedProperties={relatedProperties} userProperties={userProperties} />
    </>
  );
}

export default agentdetailspage;
