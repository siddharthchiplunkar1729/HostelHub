import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelBlock from '@/models/HostelBlock';

// PATCH /api/admin/hostels/[id] - Approve or reject a hostel
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const { status, remarks, adminId } = body;

        if (!['Approved', 'Rejected', 'Suspended'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid approval status' },
                { status: 400 }
            );
        }

        const updateData: any = {
            approvalStatus: status,
            approvedBy: adminId,
            approvedDate: new Date()
        };

        if (remarks) {
            updateData.rejectionReason = remarks; // Store remarks in rejectionReason field
        }

        const hostel = await HostelBlock.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!hostel) {
            return NextResponse.json(
                { error: 'Hostel not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Hostel ${status.toLowerCase()} successfully`,
            data: hostel
        });

    } catch (error) {
        console.error('Error updating hostel approval status:', error);
        return NextResponse.json(
            { error: 'Failed to update hostel status' },
            { status: 500 }
        );
    }
}
