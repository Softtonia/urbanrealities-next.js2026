import React from 'react';
import { cookies } from "next/headers"; // ✅ use Next.js cookies

import LeadsTable from './components/LeadTable';
import {  post, postssr } from '@/lib/api';

async function fetchTickets() {
  try {
    const token = cookies().get("token")?.value; // ✅ read cookie securely on server
    if (!token) return [];

    const response = await postssr(`/api/get-tickets-by-token`,{user_id:''}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return response.data?.data;
  } catch (err) {
    console.error("Error fetching leads:", err);
    return [];
  }
}

const page = async() => {
  const tickets = await fetchTickets()
  
  return (
      <div>
        <LeadsTable data={tickets} />
      </div>
  );
}

export default page;
