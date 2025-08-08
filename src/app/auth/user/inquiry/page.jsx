'use client';
import React from 'react';
import LeadsTable from './components/LeadTable';
import ProtectedRoute from '@/Components/protectedRoute';
const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <LeadsTable />
      </div>
    </ProtectedRoute>
  );
}

export default page;
