import React from 'react';
import AuthLayout from '../component/AuthLayout';
import LoginLeft from '../component/loginpage/LoginLeft';
import Login from '../component/loginpage/Login';
const page = () => {
  return (
    <AuthLayout leftContent={<LoginLeft />}>
      <Login/>
    </AuthLayout>
  );
}

export default page;
