"use client";
import React, { useState, useEffect } from "react";
import ProjectListingWithTab from "../ProjectListingWithTab";
import { useCity } from "@/utils/CityContext";
import { useProject } from "../../context/ProjectContext";

const OtherProjects = ({ projectId }) => {
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

    // 🔹 Fetch projects by page
    const fetchProjects = async (page = 1) => {
        if (!projectId || !city) return;

        setIsLoading(true);
        try {
            const res = await fetch(
                `/api/project-list/get-other-projects?id=${projectId}&countryId=${city?.country_id}&stateId=${city?.state_id}&cityId=${city?.id}&page=${page}&per_page=4`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const result = await res.json();

            setProjects(result?.data?.projects || []);
            setPagination(result?.data?.pagination || pagination);
        } catch (err) {
            console.error("Failed to fetch other projects", err);
            setProjects([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 🔹 Initial fetch when city or projectId changes
    useEffect(() => {
        if (city && projectId) {
            fetchProjects(1);
        }
    }, [city, projectId]);

    // 🔹 Update section visibility
    useEffect(() => {
        const noProjects = (!projects || projects.length === 0) && !isLoading;
        setSection((prev) => {
            if (prev["Other Project"] === !noProjects) return prev;
            return { ...prev, "Other Project": !noProjects };
        });
    }, [projects, isLoading, setSection]);

    // 🔹 Handle pagination change
    const handlePageChange = (page) => {
        if (page !== pagination.current_page) {
            fetchProjects(page);
        }
    };

    return (
        <ProjectListingWithTab
            projects={projects}
            heading={"Other Projects"}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={handlePageChange}
        />
    );
};

export default OtherProjects;
