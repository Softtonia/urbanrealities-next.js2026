'use client'

import { checkAuth } from '@/app/auth/checkAuth'
// import { cookies } from 'next/headers'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const SiteSettingsProvider = ({ initialSettings, children }) => {
    const [settings, setSettings] = useState(initialSettings)
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoadingToken, setIsLoadingToken] = useState(true) // NEW
    const [isLogeIn, setIsLogeIn] = useState(false)
    const [isOtpVerified, setIsOtpVerified] = useState(1);


    // On load, read token from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        const user_id = localStorage.getItem('userId')
        if (savedToken && savedToken !== "undefined" && savedToken !== "null") {
            setToken(savedToken)
            setUserId(user_id)
        }
        setIsLoadingToken(false) // done loading
    }, [])

    console.log(token , "----API-TOKEN----")
    const [fetchingUser, setFetchingUser] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            setFetchingUser(true)
            const { isAuthenticated, user, is_otp_verified } = await checkAuth();
            if (isAuthenticated) setUser(user);

            setIsOtpVerified(is_otp_verified);
            // setLoading(false);
            console.log("hello inside")
        };
        initAuth();
    }, [])

    // console.log(object)


    // Save to localStorage and state
    const login = (userId, token) => {

        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
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
                setToken(null);
                setUserId(null)
            } else {
                console.error('Logout failed');
            }
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <AuthContext.Provider
            value={{ token, login, logout, settings, isLoadingToken, isLogeIn, isOtpVerified, fetchingUser, userId }} // pass isLoadingToken
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useSiteSettings = () => useContext(AuthContext)
