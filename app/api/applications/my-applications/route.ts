import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelApplication from '@/models/HostelApplication';

// GET /api/applications/my-applications?studentId=...
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');

        if (!studentId) {
            return NextResponse.json(
                { error: 'Student ID is required' },
                { status: 400 }
            );
        }

        const applications = await HostelApplication.find({ studentId })
            .populate('hostelBlockId', 'blockName type location')
            .sort({ createdAt: -1 });

        return NextResponse.json(applications);

    } catch (error: any) {
        console.error('Error fetching student applications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch applications', details: error.message },
            { status: 500 }
        );
    }
}
