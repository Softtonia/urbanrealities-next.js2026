"use client";
import React, { useState } from "react";
import AuthLayout from '../../component/AuthLayout';
import RegisterLeft from '../../component/registerpage/RegisterLeft';
import Register from '../../component/registerpage/Register';
const Registerpage = () => {
  const [selectedRole, setSelectedRole] = useState("Owner");
  return (
    <AuthLayout leftContent={<RegisterLeft />} rightContent={<Register selected={selectedRole} onChange={setSelectedRole} />}>
    </AuthLayout>
  );
}

export default Registerpage;
