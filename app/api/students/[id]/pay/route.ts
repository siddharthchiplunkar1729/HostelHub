import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

// POST /api/students/[id]/pay - Mark fee as paid
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        const student = await Student.findByIdAndUpdate(
            id,
            {
                'feeStatus.isPaid': true,
                'feeStatus.paidAmount': 2850, // Mock amount from booking page
            },
            { new: true }
        );

        if (!student) {
            return NextResponse.json(
                { error: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Payment verified successfully',
            data: student
        });

    } catch (error: any) {
        console.error('Error processing payment:', error);
        return NextResponse.json(
            { error: 'Failed to process payment', details: error.message },
            { status: 500 }
        );
    }
}
