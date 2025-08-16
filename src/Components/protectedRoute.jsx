// components/ProtectedRoute.js
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; ;
import { useSiteSettings } from "./mycontext/siteSettingContext";

export default function ProtectedRoute({ children }) {
    const { token, isLoadingToken } = useSiteSettings()
    const router = useRouter()

    useEffect(() => {
        if (isLoadingToken) return // wait until token check is done

        if (!token) {
            router.push("/auth/login")
        }
    }, [token, isLoadingToken, router])

    if (isLoadingToken || !token) {
        return null  // your spinner or loader
    }

    return children
}

