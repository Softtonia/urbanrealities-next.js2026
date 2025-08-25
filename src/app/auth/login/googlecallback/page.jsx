import React from 'react'
import AuthLayout from '../../AuthLayout'
import LoginLeft from '../../component/loginform/LoginLeft'
import CallbackForm from '../../component/callback-Form/Callbackform'
import { get } from '@/lib/api';

async function getRoles() {
    try {
        // ✅ Directly call backend API, not your Next.js API route
        const response = await get(`/api/get-default-roles`);
        const data = response?.data;
        console.log(data)

        if (Array.isArray(data)) return data;
        if (data?.data) return data.data;
        return [];
    } catch (err) {
        console.log(err.response)
        console.error("Error fetching roles:", err);
        return [];
    }
}

async function page() {
    const roles = await getRoles();
    return (
        <AuthLayout leftContent={<LoginLeft />} rightContent={<CallbackForm roles={roles} />}>
        </AuthLayout>
    )
}

export default page
