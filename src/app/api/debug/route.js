// src/app/api/debug/route.js
export async function GET(req) {
    // 1️⃣ Try to get IP from x-forwarded-for (proxy/CDN)
    let clientIp = req.headers.get("x-forwarded-for")?.split(",")[0];

    // 2️⃣ Fallback to socket remoteAddress (LAN or localhost)
    if (!clientIp) {
        clientIp = req.socket?.remoteAddress || "0.0.0.0";
    }

    // 3️⃣ Remove IPv6 prefix if exists (::ffff:)
    if (clientIp?.startsWith("::ffff:")) {
        clientIp = clientIp.split("::ffff:")[1];
    }

    return new Response(JSON.stringify({ clientIp }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
