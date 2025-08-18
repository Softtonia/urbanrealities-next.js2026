import { NextResponse } from 'next/server';
import { post } from '@/lib/api'; // This should be your axios/fetch wrapper

export async function POST(request) {
    try {
        const formData = await request.formData();

        // Convert FormData into something axios/fetch can handle
        const formDataToSend = new FormData();
        for (const [key, value] of formData.entries()) {
            formDataToSend.append(key, value);
        }
        // console.log(formDataToSend)
        const token = formData.get("token");

        const response = await post(`/api/add-properties-listing`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // console.log(response)

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Registration Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: 500 }
        );
    }
}