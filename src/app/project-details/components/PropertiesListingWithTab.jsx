'use client';

import React, { useState, useEffect } from "react";
import styles from './ProjectListingWithTab.module.css';
import ProjectList from "./ProjectList";
import { useProject } from "../context/ProjectContext";

function getPagination(currentPage, totalPages, maxVisible = 6) {
    const pages = [];
    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (start <= 2) {
        start = 1;
        end = maxVisible;
    }

    if (end >= totalPages - 1) {
        start = totalPages - (maxVisible - 1);
        end = totalPages;
    }

    if (start > 1) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) pages.push("...");

    return pages;
}

const PropertiesListingWithTab = () => {
    const { project, setSection } = useProject();

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!project?.id) return;

        const fetchProperties = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `/api/project-list/property-list-by-project-id?id=${project?.id}&page=${currentPage}&per_page=4`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const result = await res.json();

                // Use actual API data
                setProperties(result?.data || []);
                setTotalPages(result?.meta?.last_page || 1);
            } catch (err) {
                console.error("Failed to fetch properties:", err);
                setProperties([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, [project?.id, currentPage]);

    // Update parent context visibility
    useEffect(() => {
        const noProperties = (!properties || properties.length === 0) && !isLoading;
        setSection(prev => {
            if (prev.Properties === !noProperties) return prev;
            return { ...prev, Properties: !noProperties };
        });
    }, [properties, isLoading, setSection]);

    const pageNumbers = getPagination(currentPage, totalPages, 6);

    // 🟡 Handle empty results
    if (!isLoading && properties.length === 0) {
        return (
            <div className={styles.listing}>
                <h2>Properties in {project?.name}</h2>
                <p className={styles.noPropertyText}>
                    This agent hasn’t listed any properties yet.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.listing}>
                <h2>Properties in {project?.name}</h2>

                <div className={styles.propertyListWrapper}>
                    {isLoading ? (
                        <div className={styles.loader}>Loading properties...</div>
                    ) : (
                        <ProjectList
                            currentPage={currentPage}
                            totalProperties={properties}
                        />
                    )}
                </div>
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        Prev
                    </button>

                    {pageNumbers.map((page, i) => (
                        <button
                            key={i}
                            disabled={page === "..."}
                            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => page !== "..." && setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={styles.pageButton}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PropertiesListingWithTab;
