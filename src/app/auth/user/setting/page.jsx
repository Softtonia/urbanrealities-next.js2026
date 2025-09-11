import React from "react";
import ProtectedRoute from "@/Components/protectedRoute";
import ProfileDashboard from "./components/ProfileDashboard/ProfileDashboard";

const settingpage = () => {
  return (
    <ProtectedRoute>
      <div>
        <ProfileDashboard />
      </div>
    </ProtectedRoute>
  );
};

export default settingpage;
