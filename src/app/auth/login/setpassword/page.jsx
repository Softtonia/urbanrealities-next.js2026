"use client";
import React from "react";
import AuthLayout from "../../AuthLayout";
import SetPasswordLeft from "../../component/set-passwordform/SetPasswordLeft";
import SetPassword from "../../component/set-passwordform/page";
const SetPasswordPage = () => {
  return (
    <AuthLayout leftContent={<SetPasswordLeft />} rightContent={<SetPassword />}>
    </AuthLayout>
  );
};

export default SetPasswordPage;
