"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export const useSearch = ({
    autoPush = false,
    debounceDelay = 500,
    city,
    initialFilters = {},
} = {}) => {
    const router = useRouter();

    // Initialize with initialFilters or empty object
    const [globalFilters, setGlobalFilters] = useState(initialFilters);
    const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);

    // Debounce updates
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(globalFilters);
        }, debounceDelay);

        return () => clearTimeout(handler);
    }, [globalFilters, debounceDelay]);

    // Auto-push to URL
    useEffect(() => {
        if (!autoPush || !debouncedFilters) return;

        const params = new URLSearchParams();
        Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.set(key, String(value));
            }
        });

        router.replace(`/search/demo?${params.toString()}`, { shallow: true });
    }, [debouncedFilters, autoPush, router]);

    // Manual search function
    const search = (filters = {}) => {
        setGlobalFilters(filters);
        if (!autoPush) {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    params.set(key, String(value));
                }
            });
            router.replace(`/search/demo?${params.toString()}`, { shallow: true });
        }
    };

    // Debugging logs
    useEffect(() => {
        console.log("globalFilters:", globalFilters);
    }, [globalFilters]);

    useEffect(() => {
        console.log("debouncedFilters:", debouncedFilters);
    }, [debouncedFilters]);

    // Derived payload
    const payload = useMemo(() => {
        if (!debouncedFilters) return null;

        const {
            location = "",
            purpose = "",
            minPrice = "",
            maxPrice = "",
            propertyId = "",
            propertyType = "",
        } = debouncedFilters;

        const normalizePrice = (price) => {
            if (!price) return "";
            const num = String(price).replace(/[^\d]/g, "");
            return parseInt(num, 10) || "";
        };

        return {
            purpose: purpose || "",
            property_id: propertyId || "",
            property_type_id: propertyType || "",
            property_status_id: "",
            property_price_low: normalizePrice(minPrice),
            property_price_high: normalizePrice(maxPrice),
            keyword: location || "",
            country_id: city?.country_id || "",
            state_id: city?.state_id || "",
            city_id: city?.id || "",
        };
    }, [debouncedFilters, city]);

    return { globalFilters, setGlobalFilters, debouncedFilters, search, payload };
};
