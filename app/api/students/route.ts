import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const course = searchParams.get('course');
        const year = searchParams.get('year');
        const blockId = searchParams.get('blockId');

        let query: any = {};

        if (course) query.course = course;
        if (year) query.year = parseInt(year);
        if (blockId) query.hostelBlockId = blockId;

        const students = await Student.find(query)
            .populate('hostelBlockId')
            .populate('roommateIds')
            .sort({ createdAt: -1 });

        return NextResponse.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json(
            { error: 'Failed to fetch students' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const student = await Student.create(body);

        return NextResponse.json(student, { status: 201 });
    } catch (error) {
        console.error('Error creating student:', error);
        return NextResponse.json(
            { error: 'Failed to create student' },
            { status: 500 }
        );
    }
}
