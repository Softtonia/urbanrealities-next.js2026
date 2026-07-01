import { laravelApi } from "@/lib/axios";

export async function getRoleListing() {
  return await laravelApi('/api/admin/role-listing', { method: 'GET' });
}

export async function checkUsername(userName) {
  return await laravelApi('/api/auth/usernamecheck', { method: 'POST', body: { user_name: userName } });
}

export async function checkEmail(email) {
  return await laravelApi('/api/auth/register/checkmail', { method: 'POST', body: { email } });
}

export async function checkPhone(phone) {
  return await laravelApi('/api/auth/register/checkphone', { method: 'POST', body: { phone } });
}
