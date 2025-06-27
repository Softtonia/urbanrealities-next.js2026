"use client";
import AuthLayout from '../../component/AuthLayout';
import ResetPassword from './../../component/reset-Form/Reset-Password';
import ResetPasswordLeft from './../../component/reset-Form/Reset-PasswordLeft';


const page = () => {
  return (
    <AuthLayout leftContent={<ResetPasswordLeft />}>
      <ResetPassword />
    </AuthLayout>
  );
}

export default page;
