"use client";
import React, { useState, useEffect } from "react";
import ProjectListingWithTab from "../ProjectListingWithTab";
import { useCity } from "@/utils/CityContext";
import { useProject } from "../../context/ProjectContext";


const OtherProjects = ({ projectId }) => {
    const { city } = useCity();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setSection } = useProject()
    console.log("location", city)

    useEffect(() => {
        const getProject = async (id) => {
            if (!id) return;

            setIsLoading(true);
            try {
                const res = await fetch(
                    `/api/project-list/get-other-projects?id=${id}&countryId=${city?.country_id}&stateId=${city?.state_id}&cityId=${city?.id}`,
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
        if (city) {
            getProject(projectId);
        }
    }, [city, projectId]);

    // useEffect(() => {
    //     if (!isLoading && !properties) {
    //         setSection(prev => ({
    //             ...prev,
    //             "Other Project": false
    //         }));
    //     }
    // }, [properties, isLoading]);

     useEffect(() => {
                const noFAQs = (!properties || properties.length === 0) && !isLoading;
        
                setSection(prev => {
                    if (prev[ "Other Project"] === !noFAQs) return prev; // skip if already correct
                    return { ...prev,  "Other Project": !noFAQs };
                });
            }, [properties,isLoading, setSection]);

    return (
        <ProjectListingWithTab
            projects={properties}
            heading={"Other Projects"}
            isLoading={isLoading}
        />
    );
};

export default OtherProjects;
