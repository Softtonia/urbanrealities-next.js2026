'use client'

import { checkAuth } from '@/app/auth/checkAuth'
// import { cookies } from 'next/headers'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const SiteSettingsProvider = ({ initialSettings, children }) => {
    const [settings, setSettings] = useState(initialSettings)
    const [user, setUser] = useState('')
    const [role, setRole] = useState(null)
    const [userId, setUserId] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoadingToken, setIsLoadingToken] = useState(true) // NEW
    const [isLogeIn, setIsLogeIn] = useState(false)
    const [isOtpVerified, setIsOtpVerified] = useState(1);
    const [kycStatus, setKycStatus] = useState(null);


    // On load, read token from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        const user_id = localStorage.getItem('userId')
        const savedRole = localStorage.getItem('userRole')
        if (savedToken && savedToken !== "undefined" && savedToken !== "null") {
            setToken(savedToken)
            setUserId(user_id)
            if (savedRole) setRole(savedRole)
        }
        setIsLoadingToken(false) // done loading
    }, [])

    console.log(token , "----API-TOKEN----")
    const [fetchingUser, setFetchingUser] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            setFetchingUser(true)
            const { isAuthenticated, user, role, is_otp_verified, kyc_status } = await checkAuth();
            if (isAuthenticated) {
                setUser(user);
                setRole(role);
                setKycStatus(kyc_status);
            }

            setIsOtpVerified(is_otp_verified);
            // setLoading(false);
            console.log("hello inside")
        };
        initAuth();
    }, [])

    // console.log(object)


    // Save to localStorage and state
    const login = (userId, token, role) => {

        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        if (role) {
            localStorage.setItem('userRole', role)
            setRole(role)
        }
        setToken(token)
        setUserId(userId)

        console.log(userId)
    }

    console.log(userId)
    useEffect(() => {
        setIsLogeIn(token ? true : false)
    }, [token]);


    const logout = async () => {
        const token = localStorage.getItem('token');
        console.log("token", token)

        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ token }),
            });

            if (res) {
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                setToken(null);
                setUserId(null);
                setRole(null);
            } else {
                console.error('Logout failed');
            }
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <AuthContext.Provider
            value={{ token, login, logout, settings, isLoadingToken, isLogeIn, isOtpVerified, fetchingUser, userId, role, kycStatus }} // pass isLoadingToken
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useSiteSettings = () => useContext(AuthContext)
