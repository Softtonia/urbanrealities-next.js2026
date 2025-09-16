import React from "react";
import AuthLayout from "../../AuthLayout";
import RegisterLeft from "../../component/registerform/RegisterLeft";
import Register from "../../component/registerform/Register";
import { get, getssr } from "@/lib/api";

async function getRoles() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await getssr(`/api/get-default-roles`);
    const data = response?.data;


    if (Array.isArray(data)) return data;
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching roles:", err);
    return [];
  }
}

export default async function Registerpage() {
  const roles = await getRoles();

  return (
    <AuthLayout
      leftContent={<RegisterLeft />}
      rightContent={<Register roles={roles} />}
    />
  );
}
