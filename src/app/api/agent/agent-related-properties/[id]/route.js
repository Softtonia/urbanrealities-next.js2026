

import { get } from '@/lib/api';
import { NextResponse } from 'next/server';


export async function GET(req,{params}) {
    const {id} = await params;
    // console.log(id)

    try {
        const response = await get(`/api/get-related-properties-id/${id}`)
        // console.log(response);
        return NextResponse.json(response.data);
    } catch (error) {
        // console.log(error.response)
        return NextResponse.json();
    }
}