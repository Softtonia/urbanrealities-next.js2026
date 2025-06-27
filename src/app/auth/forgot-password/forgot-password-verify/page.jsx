"use client";
import AuthLayout from '../../component/AuthLayout';
import ForgotPasswordVerify from '../../component/forgot-verify/Forgot-Password-Verify';
import ForgotPasswordVerifyLeft from '../../component/forgot-verify/Forgot-Password-VerifyLeft';


const page = () => {
  return (
    <AuthLayout leftContent={<ForgotPasswordVerifyLeft />}>
      <ForgotPasswordVerify />
    </AuthLayout>
  );
}

export default page;
