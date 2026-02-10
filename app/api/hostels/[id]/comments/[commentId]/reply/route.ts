import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelBlock from '@/models/HostelBlock';

// POST /api/hostels/[id]/comments/[commentId]/reply - Reply to a comment
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string, commentId: string }> }
) {
    try {
        await dbConnect();
        const { id, commentId } = await params;
        const body = await request.json();
        const { userId, text } = body;

        const hostel = await HostelBlock.findById(id);
        if (!hostel) {
            return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
        }

        const comment = hostel.comments.id(commentId);
        if (!comment) {
            return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
        }

        const newReply = {
            userId,
            text,
            createdAt: new Date()
        };

        comment.replies.push(newReply);
        await hostel.save();

        return NextResponse.json({ success: true, reply: newReply });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
