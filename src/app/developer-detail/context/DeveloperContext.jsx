"use client";
import { createContext, useContext, useState } from "react";

const DeveloperContext = createContext();

export const useDeveloper = () => useContext(DeveloperContext);

export const DeveloperProvider = ({ value, children }) => {

    const { developer, ongoingProjects, completedProjects, section: initialSection } = value || {};

    const [section, setSection] = useState(initialSection || {});

    return (
        <DeveloperContext.Provider value={{ developer, section, setSection, completedProjects, ongoingProjects }}>
            {children}
        </DeveloperContext.Provider>
    );
};
