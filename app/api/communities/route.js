import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Community from '@/models/Community';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = {};
        if (category) {
            query.category = category;
        }

        const communities = await Community.find(query).sort({ memberCount: -1 });
        return NextResponse.json(communities);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const community = await Community.create(body);
        return NextResponse.json(community, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
