'use client';
import React from 'react';
import AuthLayout from '../AuthLayout';
import LoginLeft from '../component/loginform/LoginLeft';
import Login from '../component/loginform/Login';
const LoginPage  = () => {
  return (
    <AuthLayout leftContent={<LoginLeft />} rightContent={<Login />}>
    </AuthLayout>
  );
}

export default LoginPage;
