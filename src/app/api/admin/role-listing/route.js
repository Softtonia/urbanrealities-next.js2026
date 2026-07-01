

import { get } from '@/lib/api';
import { NextResponse } from 'next/server';


export async function GET(req) {
    try {
        const response = await get(`/api/get-default-roles`,req)
        // console.log(response);
        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error.response)
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}