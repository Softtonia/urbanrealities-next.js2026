import { get } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const authHeader = req.headers.get('authorization');//get token from header
        console.log("token",authHeader)

        const response = await get(`/api/property-listing`, {
            headers: {
                'Authorization': authHeader,
            },
        });
        // console.log(response)

        return NextResponse.json(response.data);
    } catch (error) {
        // console.error(error?.response || error);
        return NextResponse.json(
            { error: 'Failed to fetch property listing' },
            { status: 500 }
        );
    }
}
