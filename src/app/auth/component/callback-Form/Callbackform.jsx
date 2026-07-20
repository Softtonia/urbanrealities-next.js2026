'use client';

import React, { useEffect, useState } from 'react';
import styles from '../loginform/Login.module.css';
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import { useRouter, useSearchParams } from 'next/navigation';

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://api.holiplaces.com/api';

const BUSINESS_DOMAIN =
    process.env.NEXT_PUBLIC_BUSINESS_DOMAIN ||
    'https://business.holiplaces.com';

export default function CallbackForm({
    roles: initialRoles = [],
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useSiteSettings();

    const [roleId, setRoleId] = useState('');
    const [registrationToken, setRegistrationToken] =
        useState('');

    const [roles, setRoles] = useState(
        Array.isArray(initialRoles)
            ? initialRoles
            : []
    );

    const [loading, setLoading] = useState(false);
    const [isChecking, setIsChecking] =
        useState(true);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const redirect =
        searchParams.get('redirect') || '/';

    const isRegisteredParam =
        searchParams.get('is_registered');

    const loginCode =
        searchParams.get('code');

    const registrationTokenParam =
        searchParams.get('registration_token');

    /**
     * Common API headers.
     *
     * Do not manually add Origin.
     * Browser automatically sends the correct Origin header.
     */
    const getHeaders = () => ({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Application-Password':
            process.env
                .NEXT_PUBLIC_APPLICATION_PASSWORD ||
            '',
        'X-App-Type':
            process.env.NEXT_PUBLIC_APP_TYPE ||
            'website',
    });

    const redirectAuthenticatedUser = (
        userData
    ) => {
        login(
            userData.user_id,
            userData.token
        );

        const roleName = String(
            userData?.role_name || ''
        ).toLowerCase();

        if (roleName && roleName !== 'owner') {
            router.replace('/auth/business/dashboard');
        } else {
            router.replace(redirect);
        }
    };

    /**
     * Fetch available roles.
     *
     * Admin role is removed because backend
     * does not allow role_id 1.
     */
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(
                    '/api/admin/role-listing',
                    {
                        headers: {
                            Accept:
                                'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        'Unable to load roles.'
                    );
                }

                const result =
                    await response.json();

                let roleList = [];

                if (Array.isArray(result)) {
                    roleList = result;
                } else if (
                    Array.isArray(result?.roles)
                ) {
                    roleList = result.roles;
                } else if (
                    Array.isArray(result?.data)
                ) {
                    roleList = result.data;
                }

                roleList = roleList.filter(
                    (role) =>
                        Number(role.id) !== 1
                );

                setRoles(roleList);
            } catch (err) {
                console.error(
                    'Error fetching roles:',
                    err
                );

                setError(
                    'Unable to load account roles.'
                );
            }
        };

        /**
         * Roles are only required for a new user.
         */
        if (
            isRegisteredParam === 'false' &&
            (!roles || roles.length === 0)
        ) {
            fetchRoles();
        }
    }, [
        isRegisteredParam,
        roles?.length,
    ]);

    /**
     * Handle Google callback URL.
     *
     * Existing account:
     * is_registered=true&code=...
     *
     * New account:
     * is_registered=false&registration_token=...
     */
    useEffect(() => {
        let cancelled = false;

        const processGoogleCallback =
            async () => {
                setError('');
                setSuccess('');

                /**
                 * EXISTING USER:
                 * Exchange temporary Redis login code.
                 */
                if (
                    isRegisteredParam === 'true'
                ) {
                    if (!loginCode) {
                        if (!cancelled) {
                            setError(
                                'Google login code is missing.'
                            );

                            setIsChecking(false);
                        }

                        return;
                    }

                    try {
                        const response =
                            await fetch(
                                `${API_URL}/auth/google/exchange`,
                                {
                                    method: 'POST',
                                    headers:
                                        getHeaders(),
                                    body: JSON.stringify(
                                        {
                                            code: loginCode,
                                        }
                                    ),
                                }
                            );

                        const result =
                            await response.json();

                        if (
                            !response.ok ||
                            !result?.status
                        ) {
                            throw new Error(
                                result?.message ||
                                    'Google login failed.'
                            );
                        }

                        if (
                            !result?.data?.token ||
                            !result?.data
                                ?.user_id
                        ) {
                            throw new Error(
                                'Invalid login response received.'
                            );
                        }

                        if (!cancelled) {
                            redirectAuthenticatedUser(
                                result.data
                            );
                        }
                    } catch (err) {
                        if (!cancelled) {
                            setError(
                                err instanceof Error
                                    ? err.message
                                    : 'Google login failed.'
                            );

                            setIsChecking(false);
                        }
                    }

                    return;
                }

                /**
                 * NEW USER:
                 * Show role-selection form.
                 */
                if (
                    isRegisteredParam === 'false'
                ) {
                    if (
                        !registrationTokenParam
                    ) {
                        if (!cancelled) {
                            setError(
                                'Google registration token is missing.'
                            );

                            setIsChecking(false);
                        }

                        return;
                    }

                    if (!cancelled) {
                        setRegistrationToken(
                            registrationTokenParam
                        );

                        setIsChecking(false);
                    }

                    return;
                }

                /**
                 * Invalid callback URL.
                 */
                if (!cancelled) {
                    setError(
                        'Invalid Google authentication request.'
                    );

                    setIsChecking(false);
                }
            };

        processGoogleCallback();

        return () => {
            cancelled = true;
        };
    }, [
        isRegisteredParam,
        loginCode,
        registrationTokenParam,
    ]);

    /**
     * Create a new account after role selection.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!registrationToken) {
            setError(
                'Registration token is missing or expired.'
            );

            return;
        }

        if (!roleId) {
            setError(
                'Please select your account role.'
            );

            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const response = await fetch(
                `${API_URL}/auth/google/complete-registration`,
                {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        registration_token:
                            registrationToken,

                        role_id: Number(roleId),
                    }),
                }
            );

            const result =
                await response.json();

            if (
                !response.ok ||
                !result?.status
            ) {
                throw new Error(
                    result?.message ||
                        'Google registration failed.'
                );
            }

            if (
                !result?.data?.token ||
                !result?.data?.user_id
            ) {
                throw new Error(
                    'Invalid registration response received.'
                );
            }

            setSuccess(
                'Account created successfully.'
            );

            redirectAuthenticatedUser(
                result.data
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Google registration failed.'
            );
        } finally {
            setLoading(false);
        }
    };

    /**
     * Existing user is being logged in automatically.
     */
    if (isChecking) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '250px',
                }}
            >
                <p>Verifying account...</p>
            </div>
        );
    }

    /**
     * Existing user login failure.
     * Never show role selection to this user.
     */
    if (
        isRegisteredParam === 'true' &&
        error
    ) {
        return (
            <div>
                <p className={styles.error}>
                    {error}
                </p>

                <button
                    type="button"
                    className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
                    onClick={() =>
                        router.replace(
                            '/auth/login'
                        )
                    }
                >
                    Back to Login
                </button>
            </div>
        );
    }

    /**
     * Do not display role selection unless
     * backend confirms this is a new user.
     */
    if (
        isRegisteredParam !== 'false' ||
        !registrationToken
    ) {
        return (
            <div>
                <p className={styles.error}>
                    {error ||
                        'Invalid registration session.'}
                </p>
            </div>
        );
    }

    /**
     * New-user role-selection form.
     */
    return (
        <div>
            <h5 className={styles.formHeading}>
                Set Role
            </h5>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div
                    className={
                        styles.formGroup
                    }
                >
                    <div
                        className={
                            styles.radioGroup
                        }
                    >
                        {roles
                            .filter(
                                (role) =>
                                    Number(
                                        role.id
                                    ) !== 1
                            )
                            .map((role) => {
                                const currentRoleId =
                                    String(
                                        role.id
                                    );

                                return (
                                    <label
                                        key={
                                            currentRoleId
                                        }
                                        className={
                                            styles.radioOption
                                        }
                                    >
                                        <input
                                            type="radio"
                                            name="userType"
                                            value={
                                                currentRoleId
                                            }
                                            checked={
                                                roleId ===
                                                currentRoleId
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setRoleId(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                        />

                                        <span
                                            className={`body-text-14 ${styles.spanOption}`}
                                        >
                                            {
                                                role.name
                                            }
                                        </span>
                                    </label>
                                );
                            })}
                    </div>
                </div>

                {error && (
                    <p
                        className={
                            styles.error
                        }
                    >
                        {error}
                    </p>
                )}

                {success && (
                    <p>{success}</p>
                )}

                <button
                    type="submit"
                    disabled={
                        loading || !roleId
                    }
                    className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
                >
                    {loading
                        ? 'Submitting...'
                        : 'Submit'}
                </button>
            </form>
        </div>
    );
}
