import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Basic validation
        if (!body.hostelId || !body.user || !body.checkIn || !body.checkOut) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const booking = await Booking.create({
            ...body,
            status: 'Confirmed' // Auto-confirm for MVP
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
