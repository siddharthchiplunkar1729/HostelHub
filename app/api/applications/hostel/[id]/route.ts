import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/applications/hostel/[id] - List applications for a specific hostel (Warden view)
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> } // Fix type: Next.js 15+ params is a Promise
) {
    try {
        const { id } = await context.params;

        const res = await pool.query(
            `SELECT 
                ha.*,
                s.roll_number, s.course, s.year, s.department,
                u.name, u.email, u.phone
             FROM hostel_applications ha
             JOIN students s ON ha.student_id = s.id
             JOIN users u ON s.user_id = u.id
             WHERE ha.hostel_block_id = $1
             ORDER BY ha.created_at DESC`,
            [id]
        );

        // Map to match frontend expectations (Student object populated)
        const applications = res.rows.map(row => ({
            _id: row.id,
            status: row.status,
            applicationData: row.application_data,
            createdAt: row.created_at,
            hostelBlockId: row.hostel_block_id,
            // Construct student object as expected by frontend populate
            studentId: {
                _id: row.student_id,
                name: row.name,
                email: row.email,
                phone: row.phone,
                rollNumber: row.roll_number,
                course: row.course,
                year: row.year,
                department: row.department,
                feeStatus: 'Paid' // Mocking for now as column is missing
            }
        }));

        return NextResponse.json(applications);

    } catch (error: any) {
        console.error('Error fetching applications for hostel:', error);
        return NextResponse.json(
            { error: 'Failed to fetch applications', details: error.message },
            { status: 500 }
        );
    }
}
