import { proxyToLaravel } from "@/lib/laravelProxy";

export async function POST(req) {
    const formdata = await req.formData();

    // Forward request to Laravel via proxy
    return proxyToLaravel(req, "/api/update-current-user-by-token", "POST", formdata);
}

