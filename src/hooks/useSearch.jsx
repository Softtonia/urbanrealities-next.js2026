"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export const useSearch = (initialFilters={},{ autoPush = false, debounceDelay = 500, city } = {}) => {
    const router = useRouter();
    // const [initialFilters,setInitialFilters] =useState()
    const [globalFilters, setGlobalFilters] = useState(initialFilters);
    const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);

    // Debounce updates
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(globalFilters);
        }, debounceDelay);

        return () => clearTimeout(handler);
    }, [globalFilters, debounceDelay]);
    console.log('initial filter=>', initialFilters)
    console.log('global filter=>', globalFilters)

    // Auto-push to URL
    useEffect(() => {
        if (!autoPush) return;

        const params = new URLSearchParams();
        Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.set(key, String(value));
            }
        });

        router.push(`/search/demo?${params.toString()}`);
    }, [debouncedFilters, autoPush, router]);

    // Search function (manual trigger)
    const search = (filters) => {
        console.log('initial filter',filters)
        setGlobalFilters(filters);

        if (!autoPush) {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    params.set(key, String(value));
                }
            });
            router.push(`/search/demo?${params.toString()}`);
        }
    };

    // ✅ Payload derived from current debouncedFilters
    const payload = useMemo(() => {
        if (!debouncedFilters) return null;

        const { location = "", purpose = "", minPrice = "", maxPrice = "", propertyId = "", propertyType = "" } = debouncedFilters;

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

    return { globalFilters, setGlobalFilters, debouncedFilters, search, payload,  };
};
