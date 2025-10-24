"use client";
import React, { useState, useEffect } from "react";
import ProjectListingWithTab from "../ProjectListingWithTab";
import { useCity } from "@/utils/CityContext";
import { useProject } from "../../context/ProjectContext";


const NearByProjectList = ({ projectId }) => {
    const { city } = useCity();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {setSection} = useProject()

    useEffect(() => {
        if (!projectId && !city) return; // only fetch if we have required data

        const getProject = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `/api/project-list/get-nearby-projects?id=${projectId}&countryId=${city?.country_id}&stateId=${city?.state_id}&cityId=${city?.id}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
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
        // if (projectId) {
        getProject();
        // }
    }, [city, projectId]); // run when projectId or city changes

    useEffect(() => {
        if (!isLoading && !properties) {
            setSection(prev => ({
                ...prev,
                "Near By Project": false
            }));
        }
    }, [properties, isLoading]);

    return (
        <>
            <ProjectListingWithTab projects={properties} heading={"Near By Projects"} isLoading={isLoading} />
        </>
    );
};

export default NearByProjectList;
