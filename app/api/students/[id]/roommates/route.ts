import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const student = await Student.findById(id)
            .populate('roommateIds', 'name email photo course year preferences');

        if (!student) {
            return NextResponse.json(
                { error: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            roommates: student.roommateIds || []
        });
    } catch (error) {
        console.error('Error fetching roommates:', error);
        return NextResponse.json(
            { error: 'Failed to fetch roommates' },
            { status: 500 }
        );
    }
}
