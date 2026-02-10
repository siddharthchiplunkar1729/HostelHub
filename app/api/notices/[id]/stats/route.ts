import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notice from '@/models/Notice';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const notice = await Notice.findById(id);

        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        const totalAcknowledgements = notice.acknowledgements.length;

        // Get target count (this would need to be calculated based on targetAudience)
        // For now, we'll return the count

        return NextResponse.json({
            success: true,
            noticeId: id,
            totalAcknowledgements,
            acknowledgements: notice.acknowledgements,
            targetAudience: notice.targetAudience
        });

    } catch (error) {
        console.error('Error fetching notice stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notice stats' },
            { status: 500 }
        );
    }
}
