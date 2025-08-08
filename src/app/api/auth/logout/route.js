import { post } from "@/lib/api";

// pages/api/auth/logout.js
export async function POST(req,res) {
    const {token} =await req.json()
    console.log(token)

    try {
        // Send logout request to Laravel API
        const res = await post(`/api/logout`,null, {
            headers: {
                'Authorization': `Bearer ${token}`, // Send token
            },
        });
        console.log(res)

        const data = await res.json();
        return res.status(res.status).json(data);

    } catch (error) {
        console.error('Logout API error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
