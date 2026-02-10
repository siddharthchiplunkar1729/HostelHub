import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MessMenu from '@/models/MessMenu';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const body = await request.json();
        const { mealType, rating } = body;

        const menu = await MessMenu.findById(id);
        if (!menu) {
            return NextResponse.json(
                { error: 'Menu not found' },
                { status: 404 }
            );
        }

        const meal = menu.meals.find((m: any) => m.mealType === mealType);
        if (!meal) {
            return NextResponse.json(
                { error: 'Meal not found' },
                { status: 404 }
            );
        }

        if (rating === 'up') {
            meal.thumbsUp += 1;
        } else {
            meal.thumbsDown += 1;
        }

        await menu.save();

        return NextResponse.json(menu);
    } catch (error) {
        console.error('Error rating meal:', error);
        return NextResponse.json(
            { error: 'Failed to rate meal' },
            { status: 500 }
        );
    }
}
