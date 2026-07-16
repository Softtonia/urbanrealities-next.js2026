'use client';

import React, { useState, useEffect } from "react";
import styles from "../loginform/Login.module.css"; // ✅ Using existing module styles
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackForm({ roles: initialRoles = [] }) {
    const router = useRouter();
    const { login } = useSiteSettings();
    const [roleId, setRoleId] = useState("");
    const [code, setCode] = useState("");
    const [registrationToken, setRegistrationToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [roles, setRoles] = useState(initialRoles);
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    console.log(roles , "roles")

    // Fetch roles if they didn't load from SSR
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                // We fetch from the local Next.js proxy just in case
                const res = await fetch('/api/admin/role-listing');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setRoles(data);
                } else if (data?.roles && Array.isArray(data.roles)) {
                    setRoles(data.roles);
                } else if (data?.data && Array.isArray(data.data)) {
                    setRoles(data.data);
                }
            } catch (err) {
                console.error("Error fetching roles on client:", err);
            }
        };

        if (!roles || roles.length === 0) {
            fetchRoles();
        }
    }, [roles]);

    //  Get `code` from URL on client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const codeParam = urlParams.get("code");
            if (codeParam) {
                setCode(codeParam);
                checkUser(codeParam);
            } else {
                setIsChecking(false);
            }
        }
    }, []);

    const checkUser = async (codeParam) => {
        try {
            // Check if user is already registered without passing role_id
            const url = `https://api.holiplaces.com/api/auth/google/exchange`;
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: codeParam })
            });
            const result = await res.json();
            
            const isRegistered = result?.data?.is_registered ?? result?.is_registered;

            if (res.ok && isRegistered === true) {
                // User is already registered
                if (result.data.role_name === "company" || result.data.role_name === "consultancy" || result.data.role_name === "developer" || result.data.role_name === "agent") {
                    window.location.href = `${process.env.NEXT_PUBLIC_BUSINESS_DOMAIN || 'https://business.holiplaces.com'}?authtoken=${result.data.token}&id=${result.data.user_id}`;
                } else {
                    login(result.data.user_id, result.data.token);
                    router.push(redirect);
                }
            } else if (res.ok && isRegistered === false) {
                // New user - Show role selection form
                setRegistrationToken(result?.data?.registration_token || result?.registration_token || "");
                setIsChecking(false);
            } else {
                setError(result?.message || "Authentication failed");
                setIsChecking(false);
            }
        } catch (err) {
            setError(err.message || "An error occurred");
            setIsChecking(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const url = `https://api.holiplaces.com/api/auth/google/complete-registration`;
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ registration_token: registrationToken, role_id: roleId })
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || "Request failed");
            }
            if (result) {
                console.log("Callback Result:", result);

                if (result.data.role_name === "company" || result.data.role_name === "consultancy" || result.data.role_name === "developer" || result.data.role_name === "agent") {
                    window.location.href = `${process.env.NEXT_PUBLIC_BUSINESS_DOMAIN || 'https://business.holiplaces.com'}?authtoken=${result.data.token}&id=${result.data.user_id}`;
                } else {
                    login(result.data.user_id, result.data.token);
                    router.push(redirect);
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    if (isChecking) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <p>Verifying account...</p>
            </div>
        );
    }

    return (
        <div>
            <h5 className={styles.formHeading}>Set Role</h5>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <div className={styles.radioGroup}>
                        {roles.map((role) => (
                            <label key={role.id} className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="userType"
                                    value={role.id}
                                    checked={roleId === role.id}
                                    onChange={() => setRoleId(role.id)}
                                />
                                <span className={`body-text-14 ${styles.spanOption}`}>
                                    {role.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                {error && <p className={styles.error}>{error}</p>}

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !roleId}
                    className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>

            </form>
        </div>
    );
}
