import { get } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req,{params}) {
    try {
        const id = params.id;
        console.log("demo",id)
        const authHeader = req.headers.get('authorization');//get token from header
        console.log("token",authHeader)

        const response = await get(`/api/property-type-listing-by-propertyid?property_id=${id}`, {
            headers: {
                'Authorization': authHeader,
            },
        });
        // console.log(response)

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error?.response || error);
        return NextResponse.json(
            { error: 'Failed to fetch property listing' },
            { status: 500 }
        );
    }
}
