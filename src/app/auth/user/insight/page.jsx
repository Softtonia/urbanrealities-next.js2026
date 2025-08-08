'use client';
import ProtectedRoute from '@/Components/protectedRoute';
import React from 'react';

const insightPage = () => {
  return (
    <ProtectedRoute>
      <div>
        insight page
      </div>
    </ProtectedRoute>
  );
};

export default insightPage;
