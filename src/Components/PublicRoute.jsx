// components/PublicRoute.js
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "./mycontext/siteSettingContext";

export default function PublicRoute({ children, redirectTo = "/" }) {
    const { token, isLoadingToken } = useSiteSettings();
    const router = useRouter();

    useEffect(() => {
        if (isLoadingToken) return; // wait until token check is done

        if (token) {
            // If already logged in, redirect to given route
            router.push(redirectTo);
        }
    }, [token, isLoadingToken, router, redirectTo]);

    if (isLoadingToken) {
        return null; // or show a loader
    }

    // If no token, show the page (like login or register)
    return !token ? children : null;
}
