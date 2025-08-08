'use client';
import AuthLayout from '../../AuthLayout';
import ResetPassword from './../../component/reset-Form/Reset-Password';
import ResetPasswordLeft from './../../component/reset-Form/Reset-PasswordLeft';


const ResetPasswordpage = () => {
  return (
    <AuthLayout leftContent={<ResetPasswordLeft />} rightContent={<ResetPassword />}>
    </AuthLayout>
  );
}

export default ResetPasswordpage;
