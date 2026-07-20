'use client';
import React from 'react';
import ProtectedRoute from '@/Components/protectedRoute';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const MyAccount = () => {
  return (
    <ProtectedRoute>
      <AnalyticsDashboard />
    </ProtectedRoute>
  );
};

export default MyAccount;
