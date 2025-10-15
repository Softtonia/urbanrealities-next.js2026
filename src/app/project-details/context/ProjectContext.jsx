"use client";
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ value, children }) => {
    const { project, section: initialSection } = value || {};

    const [section, setSection] = useState(initialSection || {});

    return (
        <ProjectContext.Provider value={{ project, section, setSection }}>
            {children}
        </ProjectContext.Provider>
    );
};
