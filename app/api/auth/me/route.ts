import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { withAuth } from '@/lib/middleware';
import { AuthenticatedRequest } from '@/types/auth';

async function getMeHandler(request: AuthenticatedRequest) {
    try {
        // User data is already attached by withAuth middleware
        // The token payload has id (from jwt.js)
        const userId = request.user?._id || request.user?.id;

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID not found' },
                { status: 401 }
            );
        }

        const userRes = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        );
        const user = userRes.rows[0];

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        let studentData = null;
        if (user.role === 'Student') {
            const studentRes = await pool.query(
                'SELECT * FROM students WHERE user_id = $1',
                [user.id]
            );
            studentData = studentRes.rows[0] ? studentRes.rows[0].id : null;
            // The frontend expects populated studentId sometimes? 
            // In the Mongoose code it was .populate('studentId').
            // If the frontend needs the full student object, we should return it?
            // "student: user.studentId" in the original response implies it returns whatever populate returned.
            // Let's return the ID for now as that seems to be what login returns too.
            // Wait, login returned "student: studentData" where studentData was just the ID?
            // In login route: "studentData = studentRes.rows[0] ? studentRes.rows[0].id : null;"
            // So yes, it returns the ID.

            // However, looking at original me route: .populate('studentId').
            // If it returns the full object, I should probably query the full object.
            // Let's assume for now the ID is sufficient or the frontend handles it. 
            // Actually, populate('studentId') would return the object.
            // If I return just ID, it might break.
            // Let's return the full student object if possible, or at least the ID.
            // But wait, the key is "student" in the response.
            // Original: "student: user.studentId".
            // If user.studentId was populated, it's an object.

            // Let's query full student data just in case.
            if (studentRes.rows[0]) {
                studentData = studentRes.rows[0];
            }
        }

        // Remove password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            user: {
                ...userWithoutPassword,
                _id: user.id, // maintain compatibility
                canAccessDashboard: user.can_access_dashboard
            },
            student: studentData
        });

    } catch (error: any) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user', details: error.message },
            { status: 500 }
        );
    }
}

export const GET = withAuth(getMeHandler);

