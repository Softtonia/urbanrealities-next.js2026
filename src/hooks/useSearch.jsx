import { useEffect, useState, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCity } from "@/utils/CityContext";
import { LARAVEL_API_BASE_URL, LARAVEL_APPLICATION_PASSWORD, APP_TYPE } from "@/lib/config";

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
     const pathname = usePathname(); // ✅ gives the current route path (e.g. /projects, /properties)
  const startingPath = useMemo(() => pathname || "/", [pathname]); // ✅ fallback safe


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
        router.replace(`${startingPath}?${params.toString()}`, { shallow: true });
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
            bedrooms = "",
            city_id = "",
        } = debouncedFilters;

        const normalizePrice = (price) => {
            if (!price) return "";
            const num = String(price).replace(/[^\d]/g, "");
            return parseInt(num, 10) || "";
        };

        return {
            purpose: purpose || "",
            property_type: propertyType || "",
            city_id: city_id || city?.id || "",
            bedrooms: bedrooms || "",
            price_min: normalizePrice(minPrice),
            price_max: normalizePrice(maxPrice),
            page: 1,
            per_page: 20
        };
    }, [debouncedFilters, city]);

    // --- Prevent duplicate fetches ---
    // const prevPayloadRef = useRef(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!payload) return;

            try {
                const queryParams = new URLSearchParams();
                Object.entries(payload).forEach(([key, value]) => {
                    if (value !== "") queryParams.set(key, value);
                });

                const res = await fetch(`${LARAVEL_API_BASE_URL}/api/frontend/properties/search?${queryParams.toString()}`, {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
                        "X-App-Type": APP_TYPE,
                    },
                });

                const data = await res.json();
                
                // If this endpoint doesn't return dynamic filters separately, we can leave it empty
                setDynamicFilter([]);
                // The new search API returns properties directly in data.data
                setSearchResults({
                    properties: data?.data || [],
                    projects: [],
                    agents: [],
                    meta: data?.meta || null
                });
                setInitialSearch(false);
            } catch (err) {
                console.error("Error fetching properties via search api:", err);
            }
        };

        fetchSearchResults();
    }, [payload]);

    return {
        globalFilters,
        setGlobalFilters,
        debouncedFilters,
        search,
        searchResults,
        dynamicFilter,
    };
};
