import { laravelApi } from "@/lib/axios";

export async function getTaxonomies(termIds = []) {
  let url = "/api/frontend/taxonomies";
  if (termIds && termIds.length > 0) {
    url += `?selected_term_ids=${termIds.join(',')}`;
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

export async function getDynamicPostStepForm(postTypeId = 1) {
  return await laravelApi(`/api/frontend/dynamic-post-step-form/${postTypeId}`, { method: "GET" });
}
