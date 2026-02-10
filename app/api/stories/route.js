import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const hostelId = searchParams.get('hostelId');

        let query = {};
        if (hostelId) {
            query.hostelId = hostelId;
        }

        const stories = await Story.find(query).sort({ createdAt: -1 }).limit(20);
        return NextResponse.json(stories);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const story = await Story.create(body);
        return NextResponse.json(story, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
