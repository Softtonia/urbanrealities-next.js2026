// hooks/usePropertySearch.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useSearch = (initialFilters = {}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState(initialFilters);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Sync filters with URL
    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.set(key, String(value));
            }
        });
        router.push(`/search?${params.toString()}`);
    }, [filters]);

    // ✅ Fetch results when filters change
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/global-search-filter/global-search`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(filters),
                });
                const data = await res.json();
                setResults(data?.data || []);
            } catch (err) {
                console.error("Error fetching results:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    return { filters, setFilters, results, loading };
};
