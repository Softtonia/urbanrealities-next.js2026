import React from "react";
import AuthLayout from "../../AuthLayout";
import RegisterLeft from "../../component/registerform/RegisterLeft";
import Register from "../../component/registerform/Register";
import { get, getssr } from "@/lib/api";

async function getRoles() {
  // SSR fetch is disabled to prevent "Invalid URL" errors in environments
  // missing the LARAVEL_API_BASE_URL. The client-side Register component
  // will handle fetching the roles.
  return [];
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
