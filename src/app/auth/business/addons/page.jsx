"use client";
import React, { useEffect } from "react";
import AddonsPage from "../../components/AddonsPage/AddonsPage";
import { useDashboard } from "../DashboardContext/DashboardContext";

export default function BusinessAddonsPage() {
  const { setPageHeading } = useDashboard();

  useEffect(() => {
    setPageHeading(null);
  }, [setPageHeading]);

  return <AddonsPage />;
}
