import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notice from '@/models/Notice';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const priority = searchParams.get('priority');
        const limit = parseInt(searchParams.get('limit') || '10');

        let query: any = { isActive: true };

        if (type) query.type = type;
        if (priority) query.priority = priority;

        const notices = await Notice.find(query)
            .sort({ priority: -1, createdAt: -1 })
            .limit(limit);

        return NextResponse.json(notices);
    } catch (error) {
        console.error('Error fetching notices:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notices' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const notice = await Notice.create(body);

        return NextResponse.json(notice, { status: 201 });
    } catch (error) {
        console.error('Error creating notice:', error);
        return NextResponse.json(
            { error: 'Failed to create notice' },
            { status: 500 }
        );
    }
}
