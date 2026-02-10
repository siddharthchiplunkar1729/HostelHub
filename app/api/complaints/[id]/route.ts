import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const body = await request.json();
        const complaint = await Complaint.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return NextResponse.json(
                { error: 'Complaint not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(complaint);
    } catch (error) {
        console.error('Error updating complaint:', error);
        return NextResponse.json(
            { error: 'Failed to update complaint' },
            { status: 500 }
        );
    }
}
