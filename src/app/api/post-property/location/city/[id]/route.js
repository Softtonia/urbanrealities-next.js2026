import { get } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req,{params}) {
    try {
        const id = params.id;
       
        const authHeader = req.headers.get('authorization');//get token from header

        const response = await get(`/api/frontend/locations/cities?state_id=${id}`, {
            headers: {
                'Authorization': authHeader,
            },
        });
        // console.log(response)

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error?.response || error);
        return NextResponse.json(
            { error: 'Failed to fetch states' },
            { status: 500 }
        );
    }
}
