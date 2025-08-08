import React from 'react'
import AuthLayout from '../../AuthLayout'
import LoginLeft from '../../component/loginform/LoginLeft'
import CallbackForm from '../../component/callback-Form/Callbackform'


function page() {
    return (
        <AuthLayout leftContent={<LoginLeft />} rightContent={<CallbackForm/>}>
        </AuthLayout>
    )
}

export default page
