import React from "react";
import LeadsTable from "./components/LeadTable";
import ProtectedRoute from "@/Components/protectedRoute";
import { cookies } from "next/headers"; // ✅ use Next.js cookies
import { get } from "@/lib/api"; // I assume you already have this wrapper

// ✅ This runs on the server
async function fetchLeads() {
  try {
    const token = cookies().get("token")?.value; // ✅ read cookie securely on server
    if (!token) return [];

    const response = await get(`/api/get-assign-lead-to-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.data;
  } catch (err) {
    console.error("Error fetching leads:", err);
    return [];
  }
}

const Page = async () => {
  const leads = await fetchLeads(); // ✅ await here

  return (
    <ProtectedRoute>
      <div>
        {/* ✅ pass leads into your table */}
        <LeadsTable data={leads} />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
