'use client';
import ProtectedRoute from '@/Components/protectedRoute';
import React from 'react';

const page = () => {
  return (
    <ProtectedRoute>
    <div>
      take appointment
    </div>
    </ProtectedRoute>
  );
}

export default page;
