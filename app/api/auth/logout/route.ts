import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // In a real app, you might want to:
        // 1. Invalidate the token on server-side (if using a token blacklist)
        // 2. Clear any server-side sessions
        // 3. Log the logout event

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error: any) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        );
    }
}
