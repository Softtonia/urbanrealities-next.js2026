'use client';
import React from 'react';
import ProtectedRoute from '@/Components/protectedRoute';
import CurrentMembershipStatus from './components/CurrentMembershipStatus';

const MyCurrentPlanPage = () => {
  return (
    <ProtectedRoute>
      <CurrentMembershipStatus />
    </ProtectedRoute>
  );
};

export default MyCurrentPlanPage;
