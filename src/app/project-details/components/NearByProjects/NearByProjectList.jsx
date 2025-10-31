"use client";
import React, { useState, useEffect } from "react";
import ProjectListingWithTab from "../ProjectListingWithTab";
import { useCity } from "@/utils/CityContext";
import { useProject } from "../../context/ProjectContext";

const NearByProjectList = ({ projectId }) => {
    const { city } = useCity();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 4,
        current_page: 1,
        last_page: 1,
    });
    const { setSection } = useProject();

    // 🔹 Fetch projects from API with pagination
    const getProjects = async (page = 1) => {
        if (!projectId || !city) return;
        setIsLoading(true);
        try {
            const res = await fetch(
                `/api/project-list/get-nearby-projects?id=${projectId}&countryId=${city?.country_id}&stateId=${city?.state_id}&cityId=${city?.id}&page=${page}&per_page=4`,
                { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            const result = await res.json();

            setProjects(result?.data?.projects || []);
            setPagination(result?.data?.pagination || pagination);
        } catch (err) {
            console.error("Failed to fetch nearby projects:", err);
            setProjects([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        if (city && projectId) getProjects(1);
    }, [city, projectId]);

    // 🔹 Hide section if empty
    useEffect(() => {
        const noProjects = (!projects || projects.length === 0) && !isLoading;
        setSection((prev) => {
            if (prev["Near By Project"] === !noProjects) return prev;
            return { ...prev, "Near By Project": !noProjects };
        });
    }, [projects, isLoading, setSection]);

    // 🔹 Handle page change
    const handlePageChange = (page) => {
        if (page !== pagination.current_page) {
            getProjects(page);
        }
    };
console.log("projects",projects)
    return (
        <>
            <ProjectListingWithTab
                projects={projects}
                heading={"Near By Projects"}
                isLoading={isLoading}
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default NearByProjectList;
