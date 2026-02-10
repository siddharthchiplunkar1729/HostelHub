import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelBlock from '@/models/HostelBlock';

// POST /api/hostels/[id]/comments - Submit a new comment/question
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const { userId, userType, text } = body;

        const hostel = await HostelBlock.findById(id);
        if (!hostel) {
            return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
        }

        const newComment = {
            userId,
            userType,
            text,
            replies: [],
            createdAt: new Date()
        };

        hostel.comments.push(newComment);
        await hostel.save();

        return NextResponse.json({ success: true, comment: newComment });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET /api/hostels/[id]/comments - Get all comments for a hostel
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        const hostel = await HostelBlock.findById(id).select('comments');
        if (!hostel) {
            return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
        }

        return NextResponse.json(hostel.comments);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
