'use client'

// import { cookies } from 'next/headers'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const SiteSettingsProvider = ({ initialSettings, children }) => {
    const [settings, setSettings] = useState(initialSettings)
    const [token, setToken] = useState(null)
    const [isLoadingToken, setIsLoadingToken] = useState(true) // NEW
    const [isLogeIn, setIsLogeIn] = useState(false)

    // On load, read token from sessionStorage
    useEffect(() => {
        const savedToken = sessionStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
        }
        setIsLoadingToken(false) // done loading
    }, [])

    // Save to sessionStorage and state
    const login = (newToken,) => {
        // cookies().set('token', data.token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     path: '/',
        // });
        sessionStorage.setItem('token', newToken)
        setToken(newToken)
    }
    useEffect(() => {
        setIsLogeIn(token ? true : false)
    }, [token]);


    const logout = async () => {
        const token = sessionStorage.getItem('token');
        console.log("token", token)

        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token }),
            });

            if (res) {
                sessionStorage.removeItem('token');
                setToken(null);
            } else {
                console.error('Logout failed');
            }
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <AuthContext.Provider
            value={{ token, login, logout, settings, isLoadingToken, isLogeIn }} // pass isLoadingToken
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useSiteSettings = () => useContext(AuthContext)
