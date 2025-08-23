// /src/app/api/auth/login/route.js

import { NextResponse } from "next/server";
import { post } from "@/lib/api";

export async function POST(req) {
    try {
        const body = await req.json();

        const response = await post("/api/login", body);

        const token = response?.data?.token;

        if (!token) {
            return NextResponse.json(
                { message: "No token received" },
                { status: 400 }
            );
        }

        // Create response object
        const res = NextResponse.json(response?.data);

        // Set secure HttpOnly cookie for token
        res.cookies.set("token", token, {
            httpOnly: true, // JS can't access it
            secure: process.env.NODE_ENV === "production", // only https in production
            sameSite: "strict",
            path: "/", // available across site
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return res;
    } catch (error) {
        return NextResponse.json(
            { message: error?.response?.data?.message || "Login failed" },
            { status: error?.response?.status || 500 }
        );
    }
}
