"use client";

import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [pageHeading, setPageHeading] = useState("");

  const value = {
    showSidebar,
    setShowSidebar,
    pageHeading,
    setPageHeading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
