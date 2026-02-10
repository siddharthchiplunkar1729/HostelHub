import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const priority = searchParams.get('priority');
        const limit = parseInt(searchParams.get('limit') || '10');

        let query: any = {};

        if (studentId) query.studentId = studentId;
        if (category) query.category = category;
        if (status) query.status = status;
        if (priority) query.priority = priority;

        const complaints = await Complaint.find(query)
            .populate('studentId', 'name email roomNumber')
            .sort({ createdAt: -1 })
            .limit(limit);

        return NextResponse.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        return NextResponse.json(
            { error: 'Failed to fetch complaints' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        // Auto-determine priority based on category
        if (!body.priority) {
            body.priority = ['Electrical', 'Plumbing'].includes(body.category) ? 'High' : 'Medium';
        }

        const complaint = await Complaint.create(body);

        return NextResponse.json(complaint, { status: 201 });
    } catch (error) {
        console.error('Error creating complaint:', error);
        return NextResponse.json(
            { error: 'Failed to create complaint' },
            { status: 500 }
        );
    }
}
