// app/api/register/route.js

import { proxyToLaravel } from "@/lib/laravelProxy";

export async function POST(req) {
    const body = await req.json();
    return proxyToLaravel(req, "/api/register", "POST", body);
}
