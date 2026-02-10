import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelBlock from '@/models/HostelBlock';

// GET /api/hostels/[id]/reviews - Get all reviews for a hostel
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        const hostel = await HostelBlock.findById(id).select('reviews averageRating totalReviews');

        if (!hostel) {
            return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
        }

        return NextResponse.json({
            reviews: hostel.reviews,
            averageRating: hostel.averageRating,
            totalReviews: hostel.totalReviews
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/hostels/[id]/reviews - Submit a new review
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const { studentId, rating, reviewText, photos } = body;

        // Validation... (should check if student is enrolled in this hostel)
        // For now, simpler implementation:

        const hostel = await HostelBlock.findById(id);
        if (!hostel) {
            return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
        }

        const newReview = {
            studentId,
            rating,
            reviewText,
            helpful: 0,
            photos: photos || [],
            createdAt: new Date()
        };

        hostel.reviews.push(newReview);

        // Update average rating
        const totalRating = hostel.reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0);
        hostel.totalReviews = hostel.reviews.length;
        hostel.averageRating = totalRating / hostel.totalReviews;
        hostel.rating = hostel.averageRating; // Main rating field

        await hostel.save();

        return NextResponse.json({ success: true, review: newReview });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
