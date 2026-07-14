import { laravelApi } from "@/lib/axios";

export async function getTaxonomies(termIds = []) {
  let url = "/api/frontend/taxonomies";
  if (termIds && termIds.length > 0) {
    url += `?property_term_id=${termIds.join(',')}`;
  }
  return await laravelApi(url, { method: "GET" });
}

export async function getUserDetails(userId, token) {
  return await laravelApi(`/api/get-details-byuserid?id=${userId}`, { 
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
