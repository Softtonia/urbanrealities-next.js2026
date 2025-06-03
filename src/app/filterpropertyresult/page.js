"use client";
import React from "react";
import { useRouter } from "next/navigation";
import FilterMobileLocalities from "@/Components/FilterMobile/FilterMobileLocalities";

const FilterLocalitiesPage = () => {
  const router = useRouter();

  const handleDone = (selectedCity) => {
    localStorage.setItem("selectedCity", selectedCity);
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <FilterMobileLocalities onDone={handleDone} onBack={handleBack} />
  );
};

export default FilterLocalitiesPage;
