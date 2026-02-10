import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const body = await request.json();
        const { resolutionNotes, resolutionPhotos } = body;

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            {
                status: 'Resolved',
                resolvedDate: new Date(),
                resolutionNotes,
                resolutionPhotos: resolutionPhotos || []
            },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return NextResponse.json(
                { error: 'Complaint not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            complaint,
            message: 'Complaint resolved successfully'
        });
    } catch (error) {
        console.error('Error resolving complaint:', error);
        return NextResponse.json(
            { error: 'Failed to resolve complaint' },
            { status: 500 }
        );
    }
}
