"use client";
import React from "react";
import AuthLayout from "../../component/AuthLayout";
import SetPasswordLeft from "../../component/set-passwordform/SetPasswordLeft";
import VerifyOTP from "../../component/otp-Form/Verify-OTP";
const VerifyOTPpage = () => {
  return (
    <AuthLayout leftContent={<SetPasswordLeft />} rightContent={<VerifyOTP />} >
    </AuthLayout>
  );
};

export default VerifyOTPpage;
