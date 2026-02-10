import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelBlock from '@/models/HostelBlock';

// POST /api/hostels/[id]/reviews/[reviewId]/helpful - Mark a review as helpful
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string, reviewId: string }> }
) {
    try {
        await dbConnect();
        const { id, reviewId } = await params;

        const hostel = await HostelBlock.findById(id);
        if (!hostel) {
            return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
        }

        const review = hostel.reviews.id(reviewId);
        if (!review) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        review.helpful += 1;
        await hostel.save();

        return NextResponse.json({ success: true, helpfulCount: review.helpful });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
