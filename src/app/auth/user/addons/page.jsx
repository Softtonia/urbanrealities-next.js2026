"use client";
import React, { useEffect } from "react";
import AddonsPage from "../../components/AddonsPage/AddonsPage";
import { useDashboard } from "../DashboardContext/DashboardContext";

export default function UserAddonsPage() {
  const { setPageHeading } = useDashboard();

  useEffect(() => {
    setPageHeading(null);
  }, [setPageHeading]);

  return <AddonsPage />;
}
