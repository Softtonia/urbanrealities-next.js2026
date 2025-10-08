import { NextResponse } from "next/server";
import { get, post, put, del } from "./api";

/**
 * Fully generic proxy to Laravel API
 * 
 * @param {Request} req - Next.js request object
 * @param {string} endpoint - Laravel API endpoint (e.g., "/api/users")
 * @param {string} method - HTTP method ("GET", "POST", "PUT", "DELETE")
 * @param {Object|null} body - Request body (for POST/PUT)
 */
export async function proxyToLaravel(req, endpoint, method = "GET", body = null) {
    try {
        // Forward safe headers from client
        // const safeHeaders = {
        //     authorization: req.headers.get("authorization"),
        //     "x-forwarded-for": req.headers.get("x-forwarded-for"),
        //     "content-type": req.headers.get("content-type") || "application/json",
        // };
        const possibleHeaders = {
            authorization: req.headers.get("authorization"),
            "x-forwarded-for": req.headers.get("x-forwarded-for"),
            "content-type": req.headers.get("content-type"),
        };

        const safeHeaders = {};
        Object.entries(possibleHeaders).forEach(([key, value]) => {
            if (value) safeHeaders[key] = value;
        });

        let response;

        switch (method.toUpperCase()) {
            case "POST":
                response = await post(endpoint, body, req, { headers: safeHeaders });
                break;
            case "PUT":
                response = await put(endpoint, body, req, { headers: safeHeaders });
                break;
            case "GET":
                response = await get(endpoint, req, { headers: safeHeaders });
                break;
            case "DELETE":
                response = await del(endpoint, req, { headers: safeHeaders });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        // Return Laravel response exactly
        return new NextResponse(
            typeof response.data === "object"
                ? JSON.stringify(response.data)
                : response.data,
            {
                status: response.status,
                headers: response.headers,
            }
        );
    } catch (error) {
        console.error("Proxy error:", error);

        // Forward Laravel errors
        if (error.response) {
            return new NextResponse(
                JSON.stringify(error.response.data),
                {
                    status: error.response.status,
                    headers: error.response.headers,
                }
            );
        }

        // Fallback for network errors
        return NextResponse.json(
            { error: "Failed to connect to Laravel server" },
            { status: 500 }
        );
    }
}
