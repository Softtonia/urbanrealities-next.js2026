"use client";
import React from "react";
import AuthLayout from '../../component/AuthLayout';
import SetPasswordLeft from '../../component/set-passwordpage/SetPasswordLeft';
import VerifyOTP from '../../component/otp-Form/Verify-OTP';
const page = () => {
  return (
    <AuthLayout leftContent={<SetPasswordLeft />} >
      <VerifyOTP />
    </AuthLayout>
  );
}

export default page;
