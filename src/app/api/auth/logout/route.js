import { proxyToLaravel } from "@/lib/laravelProxy";
import { cookies } from "next/headers";

export async function POST(req) {
  const body = await req.json();

  // Forward request to Laravel via proxy
  const response = await proxyToLaravel(req, "/api/logout", "POST", body);

  // Clear token cookie after logout
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // expire immediately
  });

  return response;
}
