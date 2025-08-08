'use client';
import ProtectedRoute from '@/Components/protectedRoute';
import React from 'react';

const settingpage = () => {
  return (
    <ProtectedRoute>    
      <div>
      account setting
    </div>
    </ProtectedRoute>

  );
}

export default settingpage;
