'use client';
import React from 'react';
import AuthLayout from '../AuthLayout';
import ForgotPasswordLeft from '../component/forgot-Form/Forgot-PasswordLeft';
import ForgotPassword from './../component/forgot-Form/Forgot-Password';
const ForgotPasswordpage = () => {
  return (
    <AuthLayout leftContent={<ForgotPasswordLeft />} rightContent={<ForgotPassword />}>
    </AuthLayout>
  );
}

export default ForgotPasswordpage;
