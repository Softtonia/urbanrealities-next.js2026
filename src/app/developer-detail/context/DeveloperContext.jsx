"use client";
import { createContext, useContext, useState } from "react";

const DeveloperContext = createContext();

export const useDeveloper = () => useContext(DeveloperContext);

export const DeveloperProvider = ({ value, children }) => {

    const { developer, section, setSection } = value || {};

    return (
        <DeveloperContext.Provider value={{ developer, section, setSection }}>
            {children}
        </DeveloperContext.Provider>
    );
};
