"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext(null);

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};

export const ProjectProvider = ({ value = {}, children }) => {
    const { project, section: initialSection } = value;

    const [section, setSection] = useState(initialSection || {});

    // ✅ Sync when new section arrives (like after API)
    // useEffect(() => {
    //     if (initialSection) {
    //         setSection(initialSection);
    //     }
    // }, [initialSection]);

    return (
        <ProjectContext.Provider value={{ project, section, setSection }}>
            {children}
        </ProjectContext.Provider>
    );
};
