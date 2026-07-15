import { laravelApi } from "@/lib/axios";

export async function getSiteSettingsData() {
  return await laravelApi("/api/site-setting", { method: "GET" });
}
