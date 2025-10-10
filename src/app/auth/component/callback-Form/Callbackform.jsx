'use client';

import React, { useState, useEffect } from "react";
import styles from "../loginform/Login.module.css"; // ✅ Using existing module styles
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackForm({ roles = [] }) {
    const router = useRouter();
    const { login } = useSiteSettings();
    const [roleId, setRoleId] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
      const searchParams = useSearchParams();
      const redirect = searchParams.get("redirect") || "/";
    // const [roles, setRoles] = useState([]);

    // ✅ Get `code` from URL on client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const codeParam = urlParams.get("code");
            if (codeParam) setCode(codeParam);
        }
    }, []);

    // ✅ Fetch available roles

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const url = `/api/auth/googlelogin/callback?code=${encodeURIComponent(code)}&role_id=${encodeURIComponent(roleId)}`;
            const res = await fetch(url, {
                method: "GET", // Laravel callback is typically GET
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || "Request failed");
            }
            if (result) {


                if (result.role === "company" || result.role === "consultancy" || result.role === "developer"||  result.role === "agent" ) {
                    // 🔑 store token in cookie (shared across subdomains)
                    // document.cookie = `authToken=${result.token}; path=/; domain=.urbanrealities.com; secure; SameSite=None`;

                    // Redirect to business domain
                    window.location.href = `${process.env.NEXT_BUSINESS_DOMAIN}?authtoken=${result.token}&id=${result.user_id}`;
                } else {
                    login(result.user_id, result.token);
                    router.push(redirect);
                }

            }
            // Redirect user or do something else

            // ✅ Success: redirect or store token
            router.push("/");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h5 className={styles.formHeading}>Set Role</h5>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    {/* <label className={`formLabel ${styles.formLabel}`}>
                        Roles
                    </label> */}
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
                    className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
                >
                    submit
                </button>

            </form>
        </div>
    );
}
