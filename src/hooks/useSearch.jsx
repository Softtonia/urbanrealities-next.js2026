import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCity } from "@/utils/CityContext";

export const useSearch = ({
    autoPush = false,
    debounceDelay = 500,
} = {}) => {
    const [initialSearch, setInitialSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [dynamicFilter, setDynamicFilter] = useState([]);
    const { city } = useCity();

    const router = useRouter();
    const searchParams = useSearchParams();

    // --- Helpers ---
    const parseParams = () => {
        const params = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    };

    // --- Filters ---
    const [globalFilters, setGlobalFilters] = useState(() => {
        const urlFilters = parseParams();
        return Object.keys(urlFilters).length ? urlFilters : {};
    });

    const [debouncedFilters, setDebouncedFilters] = useState(globalFilters);

    // Debounce filter updates
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(globalFilters);
        }, debounceDelay);
        return () => clearTimeout(handler);
    }, [globalFilters, debounceDelay]);

    // --- Sync with URL ---
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

    // --- Search trigger ---
    const search = (filters = {}) => {
        setGlobalFilters(filters);
        setInitialSearch(true);
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

    // --- Build Payload ---
    const payload = useMemo(() => {
        if (!debouncedFilters) return null;

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
            purpose,
            property_id: propertyId || "",
            property_type_id: propertyType || "",
            property_status_id: "",
            rent_price_low: normalizePrice(minPrice),
            rent_price_high: normalizePrice(maxPrice),
            keyword: "",
            area_locality: topLocalities,
            country_id: city?.country_id || "",
            state_id: city?.state_id || "",
            city_id: city?.id || "",
        };
    }, [debouncedFilters, city]);

    // --- Prevent duplicate fetches ---
    // const prevPayloadRef = useRef(null);

    useEffect(() => {
        const fetchSearchResults = async (type = "later") => {
            if (!payload) return;

            try {
                const [res2, res] = await Promise.all([
                    fetch(
                        type === "initial"
                            ? `/api/global-search-filter/global-search`
                            : `/api/global-search-filter/global-filter`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        }
                    ),
                    fetch(`/api/global-search-filter/apply-filter`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    }),
                ]);

                const data = await res.json();
                const data2 = await res2.json();

                setDynamicFilter(data2?.data || data2 || []);
                setSearchResults(data);
                setInitialSearch(false);
            } catch (err) {
                console.error(err);
            }
        };

        // const serialized = JSON.stringify(payload);
        // if (serialized === prevPayloadRef.current) return; // skip if same
        // prevPayloadRef.current = serialized;

        if (initialSearch) {
            fetchSearchResults("initial");
        } else {
            fetchSearchResults();
        }
    }, [payload, initialSearch]);

    return {
        globalFilters,
        setGlobalFilters,
        debouncedFilters,
        search,
        searchResults,
        dynamicFilter,
    };
};
