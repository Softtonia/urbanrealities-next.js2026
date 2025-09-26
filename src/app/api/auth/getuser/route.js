// import { get } from "@/lib/api";
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";


// export async function GET(req) {
//     try {

//         const token = await req.headers.get("Authorization")?.replace("Bearer ", "");
//         const userId = await req.nextUrl.searchParams.get("id");
//         console.log(token,userId);

//         if (!token || !userId) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         // Call Laravel server via Axios wrapper
//         const res = await get(
//             `${process.env.LARAVEL_API_BASE_URL}/api/get-details-byuserid?id=${userId}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 cache: "no-store",
//             }
//         );

//         console.log(res.data);

//         return NextResponse.json(res.data);
//     } catch (error) {
//         console.error("Proxy error:", error?.response);


//      const cookieStore = await cookies();

//         cookieStore.set({
//             name: "token",
//             value: "",
//             path: "/",
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 0, // expire immediately
//           });

//         // ✅ Forward Laravel error if available
//         if (error.response) {
//             return NextResponse.json(
//                 error.response.data || { error: "Token invalid or expired" },
//                 { status: error.response.status }
//             );
//         }

//         // ✅ Fallback for unexpected errors
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }


import { get } from "@/lib/api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        // ✅ No need for await here
        // const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        const userId = req.nextUrl.searchParams.get("id");

        console.log("Token:", token, "User ID:", userId);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Call Laravel server via Axios wrapper
        const res = await get(
            `${process.env.LARAVEL_API_BASE_URL}/api/get-details-byuserid?id=${userId}`,
            req
        );

        console.log("Response data:", res.data);

        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Proxy error:", error?.response || error.message);

        // ✅ Await cookies before using it
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

        if (error.response) {
            return NextResponse.json(
                error.response.data || { error: "Token invalid or expired" },
                { status: error.response.status || 401 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
