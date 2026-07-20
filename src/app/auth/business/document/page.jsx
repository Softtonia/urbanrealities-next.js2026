'use client';
import ProtectedRoute from '@/Components/protectedRoute';
import React from 'react';

const documentpage = () => {
  return (
    <ProtectedRoute>
    <div>
      my document
    </div>
    </ProtectedRoute>
  );
}

export default documentpage;
