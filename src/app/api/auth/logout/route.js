import { post } from "@/lib/api";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return Response.json({ message: "Token is required" }, { status: 400 });
    }

    // Call Laravel API
    const apiResponse = await post(`/api/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data;

    // Case 1: If `post()` uses fetch → has `.json()`
    if (typeof apiResponse.json === "function") {
      data = await apiResponse.json();
    }
    // Case 2: If `post()` uses axios → has `.data`
    else if (apiResponse?.data) {
      data = apiResponse.data;
    }
    // Case 3: fallback → stringify safely
    else {
      data = { message: "Logout successful" };
    }

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

    return Response.json(data, { status: apiResponse.status || 200 });
  } catch (error) {
    console.error("Logout API error:", error);

    return Response.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
