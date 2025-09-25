import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCity } from "@/utils/CityContext";

export const useSearch = ({
    autoPush = false,
    debounceDelay = 500,
    initialFilters = {},
} = {}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults] = useState([])
    const { city } = useCity()
   

    const parseParams = () => {
        const params = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    };

    const [globalFilters, setGlobalFilters] = useState(() => {
        // 1. Use query params if present, else fallback to initialFilters
        const urlFilters = parseParams();
        return Object.keys(urlFilters).length && urlFilters;
    });

    const [debouncedFilters, setDebouncedFilters] = useState(globalFilters);

    // Debounce updates
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(globalFilters);
        }, debounceDelay);
        return () => clearTimeout(handler);
    }, [globalFilters, debounceDelay]);

    // Auto push URL
    useEffect(() => {
        if (!autoPush || !debouncedFilters) return;

        const params = new URLSearchParams();
        Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.set(key, String(value));
            }
        });

        router.replace(`/search/query?${params.toString()}`, { shallow: true });
    }, [debouncedFilters, autoPush, router]);

    // Manual search
    const search = (filters = {}) => {
        setGlobalFilters(filters);
        if (!autoPush) {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    params.set(key, String(value));
                }
            });
            router.replace(`/search/query?${params.toString()}`, { shallow: true });
        }
    };
   
    // Derived payload
    const payload = useMemo(() => {
        console.log("outside")

        if (!debouncedFilters) return null;
        console.log("inside", debouncedFilters)

        const {
            location = "",
            purpose = "",
            minPrice = "",
            maxPrice = "",
            propertyId = "",
            propertyType = "",
            topLocalities = "",
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
            keyword: "",
            area_locality: topLocalities,
            country_id: city?.country_id || "",
            state_id: city?.state_id || "",
            city_id: city?.id || "",
        };
    }, [debouncedFilters, city]);
    console.log('payload=>', payload)
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!payload) return;
            try {
                const res = await fetch(`/api/global-search-filter/global-search`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                setSearchResults(data?.data || data || []);
            } catch (err) {
                console.error(err);
            }
        };
        if (payload, city) {
            fetchSearchResults();
        }
    }, [payload,city]);

    return { globalFilters, setGlobalFilters, debouncedFilters, search, searchResults };
};
