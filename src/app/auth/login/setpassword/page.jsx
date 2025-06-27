"use client";
import React from "react";
import AuthLayout from '../../component/AuthLayout';
import SetPasswordLeft from '../../component/set-passwordpage/SetPasswordLeft';
import SetPassword from '../../component/set-passwordpage/SetPassword';
const page = () => {
  return (
    <AuthLayout leftContent={<SetPasswordLeft />} >
      <SetPassword />
    </AuthLayout>
  );
}

export default page;
