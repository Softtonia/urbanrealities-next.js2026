"use client";
import { createContext, useContext } from "react";

const DeveloperContext = createContext();

export const useDeveloper = () => useContext(DeveloperContext);

export const DeveloperProvider = ({ value, children }) => {
    return (
        <DeveloperContext.Provider value={value}>
            {children}
        </DeveloperContext.Provider>
    );
};
