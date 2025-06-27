"use client";
import React, { useState } from "react";
import AuthLayout from '../../component/AuthLayout';
import RegisterLeft from '../../component/registerpage/RegisterLeft';
import Register from '../../component/registerpage/Register';
const page = () => {
  const [selectedRole, setSelectedRole] = useState("Owner");
  return (
    <AuthLayout leftContent={<RegisterLeft />}>
      <Register selected={selectedRole} onChange={setSelectedRole} />
    </AuthLayout>
  );
}

export default page;
