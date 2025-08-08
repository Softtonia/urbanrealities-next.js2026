'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const SiteSettingsProvider = ({ initialSettings, children }) => {
    const [settings, setSettings] = useState(initialSettings)
    const [token, setToken] = useState(null)

    // On load, read token from sessionStorage
    useEffect(() => {
        const savedToken = sessionStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    // Save to sessionStorage and state
    const login = (newToken) => {
        sessionStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        sessionStorage.removeItem('token')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout ,settings}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useSiteSettings = () => useContext(AuthContext)
