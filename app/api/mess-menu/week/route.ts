import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MessMenu from '@/models/MessMenu';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        // Get menu for next 7 days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const menus = await MessMenu.find({
            date: {
                $gte: today,
                $lt: nextWeek
            }
        }).sort({ date: 1 });

        return NextResponse.json({
            success: true,
            menus,
            count: menus.length
        });

    } catch (error) {
        console.error('Error fetching weekly menu:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weekly menu' },
            { status: 500 }
        );
    }
}

