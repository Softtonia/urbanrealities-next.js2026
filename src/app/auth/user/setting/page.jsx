'use client';
import ProtectedRoute from '@/Components/protectedRoute';
import React from 'react';
import ProfileDashboard from './components/ProfileDashboard/ProfileDashboard';
import Progressbar from './components/ProfileDashboard/demoprogressbar'


const settingpage = () => {
  return (
    <ProtectedRoute>    
      <div>
      <ProfileDashboard/>

      <Progressbar/>
    </div>
    </ProtectedRoute>

  );
}

export default settingpage;
