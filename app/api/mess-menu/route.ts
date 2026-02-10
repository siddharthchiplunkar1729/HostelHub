import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MessMenu from '@/models/MessMenu';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date');

        let date = dateParam ? new Date(dateParam) : new Date();
        date.setHours(0, 0, 0, 0);

        const menu = await MessMenu.findOne({ date });

        if (!menu) {
            return NextResponse.json(
                { error: 'Menu not found for this date' },
                { status: 404 }
            );
        }

        return NextResponse.json(menu);
    } catch (error) {
        console.error('Error fetching mess menu:', error);
        return NextResponse.json(
            { error: 'Failed to fetch mess menu' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const menu = await MessMenu.create(body);

        return NextResponse.json(menu, { status: 201 });
    } catch (error) {
        console.error('Error creating mess menu:', error);
        return NextResponse.json(
            { error: 'Failed to create mess menu' },
            { status: 500 }
        );
    }
}
