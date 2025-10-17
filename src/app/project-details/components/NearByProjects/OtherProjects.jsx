"use client";
import React, { useState, useEffect } from "react";
import ProjectListingWithTab from "../ProjectListingWithTab";
import { useCity } from "@/utils/CityContext";

const OtherProjects = ({ projectId }) => {
    const { city } = useCity();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProject = async (id) => {
            if (!id ) return;

            setIsLoading(true);
            try {
                const res = await fetch(
                    `/api/project-list/get-other-projects?id=${id}&countryId=${city.country_id}&stateId=${city.state_id}&cityId=${city.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await res.json();
                setProperties(result?.data?.projects || []);
            } catch (err) {
                console.error("Failed to fetch projects", err);
                setProperties([]);
            } finally {
                setIsLoading(false);
            }
        };

        getProject(projectId);
    }, [city,projectId]);

    console.log("projects", properties);

    return (
        <ProjectListingWithTab
            projects={properties}
            heading={"Other Projects"}
            isLoading={isLoading}
        />
    );
};

export default OtherProjects;
