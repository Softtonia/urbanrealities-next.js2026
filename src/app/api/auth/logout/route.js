import { post } from "@/lib/api";

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

    // If your `post()` returns a fetch Response:
    const data = await apiResponse.json();

    return Response.json(data, { status: apiResponse.status });

  } catch (error) {
    console.error("Logout API error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
