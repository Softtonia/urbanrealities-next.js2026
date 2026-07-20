'use client';
import ProtectedRoute from '@/Components/protectedRoute';
import React from 'react';

const InsightPage = () => {
  return (
    <ProtectedRoute>
      <div>
        insight page
      </div>
    </ProtectedRoute>
  );
};

export default InsightPage;
