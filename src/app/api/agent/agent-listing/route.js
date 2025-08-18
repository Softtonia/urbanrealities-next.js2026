

import { get } from '@/lib/api';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const response = await get(`/api/get-all-users-by-role?role_id=3&per_page&page`)
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