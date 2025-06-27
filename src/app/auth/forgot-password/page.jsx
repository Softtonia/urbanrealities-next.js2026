import React from 'react';
import AuthLayout from '../component/AuthLayout';
import ForgotPasswordLeft from '../component/forgot-Form/Forgot-PasswordLeft';
import ForgotPassword from './../component/forgot-Form/Forgot-Password';
const page = () => {
  return (
    <AuthLayout leftContent={<ForgotPasswordLeft />}>
      <ForgotPassword />
    </AuthLayout>
  );
}

export default page;
