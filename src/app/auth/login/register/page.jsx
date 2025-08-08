"use client";
import React, { useState } from "react";
import AuthLayout from '../../AuthLayout';
import RegisterLeft from '../../component/registerform/RegisterLeft';
import Register from '../../component/registerform/Register';
const Registerpage = () => {
  const [selectedRole, setSelectedRole] = useState("Owner");
  return (
    <AuthLayout leftContent={<RegisterLeft />} rightContent={<Register selected={selectedRole} onChange={setSelectedRole} />}>
    </AuthLayout>
  );
}

export default Registerpage;
