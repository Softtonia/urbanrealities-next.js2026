
import { proxyToLaravel } from "@/lib/laravelProxy";

export async function POST(req) {
    const body = await req.json();

    // Forward request to Laravel via proxy
    return proxyToLaravel(req, "/api/resend-email-otp", "GET", body);
}
