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
        const { assignedTo, eta } = body;

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            {
                assignedTo,
                assignedDate: new Date(),
                eta: eta ? new Date(eta) : null,
                status: 'Assigned'
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
            message: 'Complaint assigned successfully'
        });
    } catch (error) {
        console.error('Error assigning complaint:', error);
        return NextResponse.json(
            { error: 'Failed to assign complaint' },
            { status: 500 }
        );
    }
}
