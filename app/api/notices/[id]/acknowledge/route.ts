import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notice from '@/models/Notice';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const body = await request.json();
        const { studentId } = body;

        const notice = await Notice.findById(id);
        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        // Check if already acknowledged
        const alreadyAcknowledged = notice.acknowledgements.some(
            (ack: any) => ack.studentId.toString() === studentId
        );

        if (!alreadyAcknowledged) {
            notice.acknowledgements.push({
                studentId,
                acknowledgedAt: new Date()
            });
            await notice.save();
        }

        return NextResponse.json(notice);
    } catch (error) {
        console.error('Error acknowledging notice:', error);
        return NextResponse.json(
            { error: 'Failed to acknowledge notice' },
            { status: 500 }
        );
    }
}
