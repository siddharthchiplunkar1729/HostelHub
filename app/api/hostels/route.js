import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hostel from '@/models/Hostel';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const type = searchParams.get('type');

        let query = {};

        if (location) {
            query.$or = [
                { name: { $regex: location, $options: 'i' } },
                { location: { $regex: location, $options: 'i' } }
            ];
        }

        if (type) {
            query.type = type;
        }

        const gender = searchParams.get('gender');
        if (gender) {
            query.gender = gender;
        }

        const mess = searchParams.get('mess');
        if (mess === 'true') {
            query.messAvailable = true;
        }

        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const minRating = searchParams.get('minRating');
        if (minRating) {
            query.rating = { $gte: Number(minRating) };
        }

        const hostels = await Hostel.find(query);
        return NextResponse.json(hostels);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const hostel = await Hostel.create(body);
        return NextResponse.json(hostel, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
